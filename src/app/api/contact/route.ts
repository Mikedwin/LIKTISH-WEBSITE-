import { NextResponse } from "next/server";
import {
  buildPayloadIdempotencyKey,
  claimIdempotencyKey,
  completeIdempotencyKey,
} from "@/lib/api/idempotency";
import { getLeadMetadata, getRequestId, readJsonObjectRequest } from "@/lib/api/requests";
import { handleApiError, jsonError, jsonSuccess, runAfterLeadSaved } from "@/lib/api/responses";
import { createContactInquiry } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { normalizeContactInput } from "@/lib/security/form-normalization";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { shouldEnforceTurnstile, verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateContactInput } from "@/lib/validation/forms";
import type { ContactInput } from "@/types/site";

const ROUTE = "/api/contact";
const IDEMPOTENCY_TTL_SECONDS = 10 * 60;
const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const rawPayload = await readJsonObjectRequest(request, { maxBytes: MAX_BODY_BYTES });
    const payload = normalizeContactInput(rawPayload as Partial<ContactInput>);
    const ip = getRequestIp(request);
    const rateLimit = await checkRateLimit(`contact:${ip}`, {
      limit: 5,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      await logAbuseEvent({
        route: ROUTE,
        type: "rate_limited",
        ipAddress: ip,
        details: "Contact rate limit exceeded.",
      });
      return jsonError({
        code: "rate_limited",
        message: "Too many enquiries in a short time. Please try again shortly.",
        requestId,
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      });
    }

    const spamCheck = checkSpamProtection(payload, [
      payload.name ?? "",
      payload.email ?? "",
      payload.phone ?? "",
      payload.message ?? "",
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

    const validation = validateContactInput(payload);

    if (!validation.valid) {
      return jsonError({
        code: "validation_failed",
        message: validation.errors.join(" "),
        requestId,
        status: 400,
      });
    }

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

    await createContactInquiry(
      payload as ContactInput,
      getLeadMetadata(request, requestId, ROUTE),
    );
    const responseBody = {
      ok: true,
      code: "ok",
      message: "Your enquiry has been sent. LIKTISH will respond soon.",
    };
    await completeIdempotencyKey({
      route: ROUTE,
      key: idempotencyKey,
      status: 200,
      body: responseBody,
    });
    await runAfterLeadSaved(ROUTE, () =>
      sendAdminNotification({
        subject: "New website enquiry",
        recipient: "LIKTISH admin",
        message: `${payload.name} submitted a ${payload.enquiryType} enquiry.`,
      }),
    );

    return jsonSuccess({ message: responseBody.message }, { requestId });
  } catch (error) {
    return handleApiError(error, ROUTE, requestId);
  }
}
