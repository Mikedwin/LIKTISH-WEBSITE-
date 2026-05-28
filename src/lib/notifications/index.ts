import "server-only";

import { createHash } from "node:crypto";
import { after } from "next/server";
import { isProductionRuntime } from "@/lib/env";
import { SecurityControlUnavailableError } from "@/lib/errors";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert, supabaseRpc, supabaseUpdate } from "@/lib/supabase/rest";

type NotificationChannel = "email" | "sms" | "admin";
type NotificationMode = "sendgrid" | "hubtel" | "env-missing" | "mock" | "logged-only";
type NotificationStatus = "queued" | "sent" | "failed" | "skipped";
type NotificationJobStatus = "queued" | "processing" | "sent" | "failed";

interface NotificationPayload {
  subject: string;
  recipient: string;
  message: string;
  htmlMessage?: string;
  replyTo?: string;
}

interface NotificationLogRow {
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  message: string;
  mode: NotificationMode;
  status: NotificationStatus;
  provider_message_id?: string | null;
  error_message?: string | null;
}

interface QueuedNotificationJob {
  id: number;
}

declare global {
  var __liktishNotificationDedupeStore:
    | Map<
        string,
        {
          createdAt: number;
        }
      >
    | undefined;
}

const notificationDedupeStore =
  globalThis.__liktishNotificationDedupeStore ??
  (globalThis.__liktishNotificationDedupeStore = new Map());
const NOTIFICATION_DEDUPE_WINDOW_MS = 10 * 60 * 1000;
const MAX_LOG_MESSAGE_LENGTH = 180;
const MAX_ERROR_MESSAGE_LENGTH = 500;

function getNotificationConfig() {
  return {
    sendgridApiKey: process.env.SENDGRID_API_KEY ?? "",
    sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL ?? "",
    hubtelClientId: process.env.HUBTEL_CLIENT_ID ?? "",
    hubtelClientSecret: process.env.HUBTEL_CLIENT_SECRET ?? "",
    hubtelSenderId: process.env.HUBTEL_SENDER_ID ?? "LIKTISH",
    adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL ?? "",
    adminNotificationPhone: process.env.ADMIN_NOTIFICATION_PHONE ?? "",
  };
}

async function logNotification(entry: NotificationLogRow) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  try {
    await supabaseInsert("notification_logs", {
      channel: entry.channel,
      recipient: redactRecipient(entry.recipient),
      subject: entry.subject,
      message: redactMessage(entry.message),
      mode: entry.mode,
      status: entry.status,
      provider_message_id: entry.provider_message_id ?? null,
      error_message: entry.error_message ? redactError(entry.error_message) : null,
    });
  } catch (error) {
    console.error("Unable to log notification", error);
  }
}

function redactRecipient(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (part.includes("@")) {
        const [localPart, domain] = part.split("@");
        if (!localPart || !domain) return "[redacted-email]";
        const visible = localPart.length > 2
          ? `${localPart.at(0)}***${localPart.at(-1)}`
          : "***";
        return `${visible}@${domain}`;
      }

      const digits = part.replace(/\D/g, "");
      if (digits.length >= 7) {
        return `***${digits.slice(-4)}`;
      }

      return part;
    })
    .join(", ");
}

function redactMessage(value: string) {
  const compact = value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/\+?\d[\d\s().-]{6,}\d/g, "[redacted-phone]")
    .replace(/\s+/g, " ")
    .trim();

  if (compact.length <= MAX_LOG_MESSAGE_LENGTH) {
    return compact;
  }

  return `${compact.slice(0, MAX_LOG_MESSAGE_LENGTH - 1)}…`;
}

function redactError(value: string) {
  return redactMessage(value).slice(0, MAX_ERROR_MESSAGE_LENGTH);
}

function scheduleNotificationWork(work: () => Promise<unknown>) {
  after(async () => {
    try {
      await work();
    } catch (error) {
      console.error("Queued notification delivery failed", error);
    }
  });
}

async function updateNotificationJob(
  id: number,
  status: NotificationJobStatus,
  fields: Record<string, unknown> = {},
) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  await supabaseUpdate("notification_jobs", { id }, {
    status,
    updated_at: new Date().toISOString(),
    ...fields,
  });
}

function shouldSuppressNotificationInMemory(fingerprint: string) {
  const now = Date.now();

  for (const [key, value] of notificationDedupeStore.entries()) {
    if (now - value.createdAt > NOTIFICATION_DEDUPE_WINDOW_MS) {
      notificationDedupeStore.delete(key);
    }
  }

  const existing = notificationDedupeStore.get(fingerprint);
  if (existing && now - existing.createdAt <= NOTIFICATION_DEDUPE_WINDOW_MS) {
    return true;
  }

  notificationDedupeStore.set(fingerprint, { createdAt: now });
  return false;
}

async function shouldSuppressNotification(payload: NotificationPayload) {
  const fingerprint = createHash("sha256")
    .update(`${payload.recipient}::${payload.subject}::${payload.message}`)
    .digest("hex");

  if (!hasSupabaseAdminConfig()) {
    if (!isProductionRuntime()) {
      return shouldSuppressNotificationInMemory(fingerprint);
    }

    throw new SecurityControlUnavailableError(
      "Supabase admin configuration is required for production notification dedupe.",
    );
  }

  return supabaseRpc<boolean>("check_notification_dedupe", {
    p_fingerprint: fingerprint,
    p_window_seconds: Math.ceil(NOTIFICATION_DEDUPE_WINDOW_MS / 1000),
  });
}

async function postSendgridEmail(payload: NotificationPayload) {
  const { sendgridApiKey, sendgridFromEmail } = getNotificationConfig();

  if (!sendgridApiKey || !sendgridFromEmail) {
    await logNotification({
      channel: "email",
      recipient: payload.recipient,
      subject: payload.subject,
      message: payload.message,
      mode: sendgridApiKey ? "env-missing" : "mock",
      status: "skipped",
      error_message: "SendGrid credentials are not fully configured.",
    });

    return {
      channel: "email" as const,
      mode: sendgridApiKey ? "env-missing" : "mock",
      status: "skipped" as const,
      ...payload,
    };
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: payload.recipient }],
          subject: payload.subject,
        },
      ],
      from: {
        email: sendgridFromEmail,
      },
      ...(payload.replyTo
        ? {
            reply_to: {
              email: payload.replyTo,
            },
          }
        : {}),
      content: [
        {
          type: "text/plain",
          value: payload.message,
        },
        ...(payload.htmlMessage
          ? [
              {
                type: "text/html",
                value: payload.htmlMessage,
              },
            ]
          : []),
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    await logNotification({
      channel: "email",
      recipient: payload.recipient,
      subject: payload.subject,
      message: payload.message,
      mode: "sendgrid",
      status: "failed",
      error_message: body || `SendGrid returned ${response.status}.`,
    });
    throw new Error(body || `SendGrid returned ${response.status}.`);
  }

  await logNotification({
    channel: "email",
    recipient: payload.recipient,
    subject: payload.subject,
    message: payload.message,
    mode: "sendgrid",
    status: "sent",
  });

  return {
    channel: "email" as const,
    mode: "sendgrid" as const,
    status: "sent" as const,
    ...payload,
  };
}

async function sendHubtelSms(payload: NotificationPayload) {
  const { hubtelClientId, hubtelClientSecret, hubtelSenderId } = getNotificationConfig();

  if (!hubtelClientId || !hubtelClientSecret) {
    await logNotification({
      channel: "sms",
      recipient: payload.recipient,
      subject: payload.subject,
      message: payload.message,
      mode: hubtelClientId || hubtelClientSecret ? "env-missing" : "mock",
      status: "skipped",
      error_message: "Hubtel credentials are not fully configured.",
    });

    return {
      channel: "sms" as const,
      mode: hubtelClientId || hubtelClientSecret ? "env-missing" : "mock",
      status: "skipped" as const,
      ...payload,
    };
  }

  const url = new URL("https://sms.hubtel.com/v1/messages/send");
  url.searchParams.set("clientid", hubtelClientId);
  url.searchParams.set("clientsecret", hubtelClientSecret);
  url.searchParams.set("from", hubtelSenderId);
  url.searchParams.set("to", payload.recipient);
  url.searchParams.set("content", payload.message);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const rawBody = await response.text();

  if (!response.ok) {
    await logNotification({
      channel: "sms",
      recipient: payload.recipient,
      subject: payload.subject,
      message: payload.message,
      mode: "hubtel",
      status: "failed",
      error_message: rawBody || `Hubtel returned ${response.status}.`,
    });
    throw new Error(rawBody || `Hubtel returned ${response.status}.`);
  }

  let providerMessageId: string | null = null;

  try {
    const parsed = JSON.parse(rawBody) as { MessageId?: string; messageId?: string };
    providerMessageId = parsed.MessageId ?? parsed.messageId ?? null;
  } catch {
    providerMessageId = null;
  }

  await logNotification({
    channel: "sms",
    recipient: payload.recipient,
    subject: payload.subject,
    message: payload.message,
    mode: "hubtel",
    status: "sent",
    provider_message_id: providerMessageId,
  });

  return {
    channel: "sms" as const,
    mode: "hubtel" as const,
    status: "sent" as const,
    providerMessageId,
    ...payload,
  };
}

export async function sendEmailNotification(payload: NotificationPayload) {
  return postSendgridEmail(payload);
}

export async function sendSmsNotification(payload: NotificationPayload) {
  return sendHubtelSms(payload);
}

async function deliverAdminNotification(payload: NotificationPayload) {
  const { adminNotificationEmail, adminNotificationPhone } = getNotificationConfig();
  const results: unknown[] = [];

  if (await shouldSuppressNotification(payload)) {
    await logNotification({
      channel: "admin",
      recipient: [adminNotificationEmail, adminNotificationPhone].filter(Boolean).join(", "),
      subject: payload.subject,
      message: payload.message,
      mode: "logged-only",
      status: "skipped",
      error_message: "Suppressed duplicate admin notification.",
    });
    await logAbuseEvent({
      route: "notifications/admin",
      type: "notification_suppressed",
      details: payload.subject,
    });

    return {
      channel: "admin" as const,
      mode: "logged-only" as const,
      status: "skipped" as const,
      ...payload,
    };
  }

  if (adminNotificationEmail) {
    results.push(
      await postSendgridEmail({
        ...payload,
        recipient: adminNotificationEmail,
      }),
    );
  }

  if (adminNotificationPhone) {
    results.push(
      await sendHubtelSms({
        ...payload,
        recipient: adminNotificationPhone,
      }),
    );
  }

  if (results.length === 0) {
    await logNotification({
      channel: "admin",
      recipient: payload.recipient,
      subject: payload.subject,
      message: payload.message,
      mode: "logged-only",
      status: "queued",
      error_message: "No admin notification destination is configured.",
    });

    return {
      channel: "admin" as const,
      mode: "logged-only" as const,
      status: "queued" as const,
      ...payload,
    };
  }

  await logNotification({
    channel: "admin",
    recipient: [adminNotificationEmail, adminNotificationPhone].filter(Boolean).join(", "),
    subject: payload.subject,
    message: payload.message,
    mode: "logged-only",
    status: "sent",
  });

  return {
    channel: "admin" as const,
    mode: "logged-only" as const,
    status: "sent" as const,
    deliveries: results,
    ...payload,
  };
}

async function deliverQueuedAdminNotification(
  jobId: number | null,
  payload: NotificationPayload,
) {
  if (jobId) {
    await updateNotificationJob(jobId, "processing", {
      attempts: 1,
      last_error: null,
    });
  }

  try {
    const result = await deliverAdminNotification(payload);

    if (jobId) {
      await updateNotificationJob(jobId, "sent", {
        message: "[processed]",
        html_message: null,
        reply_to: null,
        processed_at: new Date().toISOString(),
      });
    }

    return result;
  } catch (error) {
    if (jobId) {
      await updateNotificationJob(jobId, "failed", {
        last_error: redactError(error instanceof Error ? error.message : "Unknown error"),
      });
    }

    throw error;
  }
}

export async function sendAdminNotification(payload: NotificationPayload) {
  if (!hasSupabaseAdminConfig()) {
    if (isProductionRuntime()) {
      throw new SecurityControlUnavailableError(
        "Supabase admin configuration is required for production notification queueing.",
      );
    }

    scheduleNotificationWork(() => deliverQueuedAdminNotification(null, payload));
    return {
      channel: "admin" as const,
      mode: "logged-only" as const,
      status: "queued" as const,
      ...payload,
    };
  }

  const [job] = await supabaseInsert<QueuedNotificationJob>("notification_jobs", {
    notification_type: "admin",
    subject: payload.subject,
    recipient_label: payload.recipient,
    message: payload.message,
    html_message: payload.htmlMessage ?? null,
    reply_to: payload.replyTo ?? null,
    status: "queued",
    attempts: 0,
  });

  if (job?.id) {
    scheduleNotificationWork(() => deliverQueuedAdminNotification(job.id, payload));
  }

  await logNotification({
    channel: "admin",
    recipient: payload.recipient,
    subject: payload.subject,
    message: payload.message,
    mode: "logged-only",
    status: "queued",
  });

  return {
    channel: "admin" as const,
    mode: "logged-only" as const,
    status: "queued" as const,
    jobId: job?.id ?? null,
    ...payload,
  };
}
