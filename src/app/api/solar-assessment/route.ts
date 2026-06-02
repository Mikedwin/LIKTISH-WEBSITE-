import { NextResponse } from "next/server";
import {
  buildPayloadIdempotencyKey,
  claimIdempotencyKey,
  completeIdempotencyKey,
} from "@/lib/api/idempotency";
import { getLeadMetadata, getRequestId, readJsonObjectRequest } from "@/lib/api/requests";
import { handleApiError, jsonError, jsonSuccess, runAfterLeadSaved } from "@/lib/api/responses";
import { createSolarAssessment } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { normalizeSolarAssessmentInput } from "@/lib/security/form-normalization";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { shouldEnforceTurnstile, verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateSolarAssessmentInput } from "@/lib/validation/forms";
import type { SolarAssessmentInput } from "@/types/site";

const ROUTE = "/api/solar-assessment";
const IDEMPOTENCY_TTL_SECONDS = 10 * 60;
const MAX_BODY_BYTES = 12 * 1024;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Accra",
  }).format(new Date());
}

function buildSolarAssessmentTextEmail(payload: SolarAssessmentInput, submittedAt: string) {
  return [
    "New solar assessment request from the LIKTISH website",
    "",
    "Lead summary",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Address: ${payload.address}`,
    `Preferred contact method: ${payload.preferredContactMethod}`,
    `Submitted: ${submittedAt} Ghana time`,
    "",
    "Assessment details",
    `Nature of request: ${payload.requestNature}`,
    `Installed by: ${payload.installerType}`,
    `Consent given: ${payload.consent ? "Yes" : "No"}`,
    "",
    "What can we help with today?",
    payload.helpNeeded,
    "",
    "Suggested next action",
    `Reply to this email or contact ${payload.name} by ${payload.preferredContactMethod}.`,
  ].join("\n");
}

function buildSolarAssessmentHtmlEmail(payload: SolarAssessmentInput, submittedAt: string) {
  const rows = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email],
    ["Address", payload.address],
    ["Preferred contact", payload.preferredContactMethod],
    ["Submitted", `${submittedAt} Ghana time`],
    ["Nature of request", payload.requestNature],
    ["Installed by", payload.installerType],
    ["Consent given", payload.consent ? "Yes" : "No"],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#eef5ef;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#14372b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9eee6;border-radius:18px;overflow:hidden;">
      <tr>
        <td style="background:#0f6e57;padding:24px 28px;color:#ffffff;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#bff2dd;">LIKTISH Engineering</p>
          <h1 style="margin:0;font-size:24px;line-height:1.25;">New solar assessment request</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px 8px;">
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#547468;">
            A visitor submitted the Get a Free Solar Assessment form on the website.
          </p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            ${rows
              .map(
                ([label, value]) => `<tr>
                  <td style="width:38%;padding:12px 0;border-top:1px solid #e4f1ea;font-size:13px;font-weight:700;color:#0f6e57;">${escapeHtml(label)}</td>
                  <td style="padding:12px 0;border-top:1px solid #e4f1ea;font-size:14px;line-height:1.5;color:#14372b;">${escapeHtml(value)}</td>
                </tr>`,
              )
              .join("")}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 28px 24px;">
          <div style="background:#f4fbf7;border:1px solid #d9eee6;border-radius:14px;padding:18px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f6e57;">What can we help with today?</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#14372b;white-space:pre-line;">${escapeHtml(payload.helpNeeded)}</p>
          </div>
          <div style="margin-top:18px;background:#fff7df;border:1px solid #efdca1;border-radius:14px;padding:16px;">
            <p style="margin:0;font-size:14px;line-height:1.6;color:#6d5520;">
              Suggested next action: reply to this email or contact ${escapeHtml(payload.name)} by ${escapeHtml(payload.preferredContactMethod)}.
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const rawPayload = await readJsonObjectRequest(request, { maxBytes: MAX_BODY_BYTES });
    const payload = normalizeSolarAssessmentInput(
      rawPayload as Partial<SolarAssessmentInput>,
    );
    const ip = getRequestIp(request);
    const rateLimit = await checkRateLimit(`solar-assessment:${ip}`, {
      limit: 4,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      await logAbuseEvent({
        route: ROUTE,
        type: "rate_limited",
        ipAddress: ip,
        details: "Solar assessment rate limit exceeded.",
      });
      return jsonError({
        code: "rate_limited",
        message:
          "Too many assessment requests in a short time. Please wait a little and try again.",
        requestId,
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      });
    }

    const spamCheck = checkSpamProtection(payload, [
      payload.name ?? "",
      payload.address ?? "",
      payload.email ?? "",
      payload.phone ?? "",
      payload.helpNeeded ?? "",
    ]);

    if (!spamCheck.valid) {
      await logAbuseEvent({
        route: ROUTE,
        type: "spam_rejected",
        ipAddress: ip,
        details: spamCheck.message,
      });
      if (spamCheck.status === 200) {
        return jsonSuccess({ message: spamCheck.message }, { requestId });
      }

      return jsonError({
        code: "spam_rejected",
        message: spamCheck.message,
        requestId,
        status: spamCheck.status,
      });
    }

    if (shouldEnforceTurnstile()) {
      const turnstileValid = await verifyTurnstileToken(payload.turnstileToken, ip);

      if (!turnstileValid) {
        await logAbuseEvent({
          route: ROUTE,
          type: "turnstile_failed",
          ipAddress: ip,
          details: "Turnstile verification failed.",
        });
        return jsonError({
          code: "turnstile_failed",
          message: "Verification failed. Please try again and complete the check.",
          requestId,
          status: 400,
        });
      }
    }

    const validation = validateSolarAssessmentInput(payload);

    if (!validation.valid) {
      return jsonError({
        code: "validation_failed",
        message: validation.errors.join(" "),
        requestId,
        status: 400,
      });
    }

    const assessment = payload as SolarAssessmentInput;
    const submittedAt = formatSubmittedAt();
    const idempotencyKey =
      request.headers.get("idempotency-key")?.trim() ||
      buildPayloadIdempotencyKey(ROUTE, payload as Record<string, unknown>);
    const idempotencyClaim = await claimIdempotencyKey({
      route: ROUTE,
      key: idempotencyKey,
      ttlSeconds: IDEMPOTENCY_TTL_SECONDS,
    });

    if (idempotencyClaim.state === "duplicate") {
      return NextResponse.json(
        {
          ...idempotencyClaim.responseBody,
          requestId,
        },
        {
          status: idempotencyClaim.responseStatus,
          headers: {
            "X-Request-Id": requestId,
            "X-Idempotent-Replay": "true",
          },
        },
      );
    }

    await createSolarAssessment(
      assessment,
      getLeadMetadata(request, requestId, ROUTE),
    );
    const responseBody = {
      ok: true,
      code: "ok",
      message:
        "Your solar assessment request has been sent. LIKTISH will review it and follow up soon.",
    };
    await completeIdempotencyKey({
      route: ROUTE,
      key: idempotencyKey,
      status: 200,
      body: responseBody,
    });
    await runAfterLeadSaved(ROUTE, () =>
      sendAdminNotification({
        subject: `Solar assessment request: ${assessment.name}`,
        recipient: "LIKTISH admin",
        message: buildSolarAssessmentTextEmail(assessment, submittedAt),
        htmlMessage: buildSolarAssessmentHtmlEmail(assessment, submittedAt),
        replyTo: assessment.email,
      }),
    );

    return jsonSuccess({ message: responseBody.message }, { requestId });
  } catch (error) {
    return handleApiError(error, ROUTE, requestId);
  }
}
