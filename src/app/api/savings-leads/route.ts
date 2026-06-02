import { NextResponse } from "next/server";
import {
  buildPayloadIdempotencyKey,
  claimIdempotencyKey,
  completeIdempotencyKey,
} from "@/lib/api/idempotency";
import { getLeadMetadata, getRequestId, readJsonObjectRequest } from "@/lib/api/requests";
import { handleApiError, jsonError, jsonSuccess, runAfterLeadSaved } from "@/lib/api/responses";
import { createSavingsLead } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { normalizeSavingsLeadInput } from "@/lib/security/form-normalization";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { shouldEnforceTurnstile, verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateSavingsLeadInput } from "@/lib/validation/forms";
import type { SavingsLeadInput } from "@/types/site";

const ROUTE = "/api/savings-leads";
const IDEMPOTENCY_TTL_SECONDS = 10 * 60;
const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const rawPayload = await readJsonObjectRequest(request, { maxBytes: MAX_BODY_BYTES });
    const payload = normalizeSavingsLeadInput(
      rawPayload as Partial<SavingsLeadInput>,
    );
    const ip = getRequestIp(request);
    const rateLimit = await checkRateLimit(`savings-leads:${ip}`, {
      limit: 4,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      await logAbuseEvent({
        route: ROUTE,
        type: "rate_limited",
        ipAddress: ip,
        details: "Savings lead rate limit exceeded.",
      });
      return jsonError({
        code: "rate_limited",
        message: "Too many quote requests in a short time. Please try again shortly.",
        requestId,
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      });
    }

    const spamCheck = checkSpamProtection(payload, [
      payload.name ?? "",
      payload.phone ?? "",
      payload.email ?? "",
      payload.estimateSummary ?? "",
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

    const validation = validateSavingsLeadInput(payload);

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

    await createSavingsLead(
      payload as SavingsLeadInput,
      getLeadMetadata(request, requestId, ROUTE),
    );
    const responseBody = {
      ok: true,
      code: "ok",
      message:
        "Your estimate has been saved. LIKTISH will follow up with an accurate report.",
    };
    await completeIdempotencyKey({
      route: ROUTE,
      key: idempotencyKey,
      status: 200,
      body: responseBody,
    });
    await runAfterLeadSaved(ROUTE, () =>
      sendAdminNotification({
        subject: "New calculator lead",
        recipient: "LIKTISH admin",
        message: `${payload.name} requested a more accurate solar savings report.`,
      }),
    );

    return jsonSuccess({ message: responseBody.message }, { requestId });
  } catch (error) {
    return handleApiError(error, ROUTE, requestId);
  }
}
