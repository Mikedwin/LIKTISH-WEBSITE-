import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert } from "@/lib/supabase/rest";

type NotificationChannel = "email" | "sms" | "admin";
type NotificationMode = "sendgrid" | "hubtel" | "env-missing" | "mock" | "logged-only";
type NotificationStatus = "queued" | "sent" | "failed" | "skipped";

interface NotificationPayload {
  subject: string;
  recipient: string;
  message: string;
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
      recipient: entry.recipient,
      subject: entry.subject,
      message: entry.message,
      mode: entry.mode,
      status: entry.status,
      provider_message_id: entry.provider_message_id ?? null,
      error_message: entry.error_message ?? null,
    });
  } catch (error) {
    console.error("Unable to log notification", error);
  }
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
      content: [
        {
          type: "text/plain",
          value: payload.message,
        },
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

export async function sendAdminNotification(payload: NotificationPayload) {
  const { adminNotificationEmail, adminNotificationPhone } = getNotificationConfig();
  const results: unknown[] = [];

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
