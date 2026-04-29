import { NextResponse } from "next/server";
import { createSolarAssessment } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { normalizeSolarAssessmentInput } from "@/lib/security/form-normalization";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { hasTurnstileConfig, verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateSolarAssessmentInput } from "@/lib/validation/forms";
import type { SolarAssessmentInput } from "@/types/site";

function buildSolarAssessmentEmail(payload: SolarAssessmentInput) {
  return [
    "New solar assessment request",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Address: ${payload.address}`,
    `Nature of request: ${payload.requestNature}`,
    `Installed by: ${payload.installerType}`,
    `Preferred contact method: ${payload.preferredContactMethod}`,
    `Consent given: ${payload.consent ? "Yes" : "No"}`,
    "",
    "What can we help with today?",
    payload.helpNeeded,
  ].join("\n");
}

export async function POST(request: Request) {
  const payload = normalizeSolarAssessmentInput(
    (await request.json()) as Partial<SolarAssessmentInput>,
  );
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit(`solar-assessment:${ip}`, {
    limit: 4,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    await logAbuseEvent({
      route: "/api/solar-assessment",
      type: "rate_limited",
      ipAddress: ip,
      details: "Solar assessment rate limit exceeded.",
    });
    return NextResponse.json(
      {
        error:
          "Too many assessment requests in a short time. Please wait a little and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
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
      route: "/api/solar-assessment",
      type: "spam_rejected",
      ipAddress: ip,
      details: spamCheck.message,
    });
    return NextResponse.json(
      { message: spamCheck.message, error: spamCheck.message },
      { status: spamCheck.status },
    );
  }

  if (hasTurnstileConfig()) {
    const turnstileValid = await verifyTurnstileToken(payload.turnstileToken, ip);

    if (!turnstileValid) {
      await logAbuseEvent({
        route: "/api/solar-assessment",
        type: "turnstile_failed",
        ipAddress: ip,
        details: "Turnstile verification failed.",
      });
      return NextResponse.json(
        { error: "Verification failed. Please try again and complete the check." },
        { status: 400 },
      );
    }
  }

  const validation = validateSolarAssessmentInput(payload);

  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.errors.join(" ") },
      { status: 400 },
    );
  }

  const assessment = payload as SolarAssessmentInput;

  await createSolarAssessment(assessment);
  await sendAdminNotification({
    subject: "New solar assessment request",
    recipient: "LIKTISH admin",
    message: buildSolarAssessmentEmail(assessment),
  });

  return NextResponse.json({
    message:
      "Your solar assessment request has been sent. LIKTISH will review it and follow up soon.",
  });
}
