import { NextResponse } from "next/server";
import { createSolarAssessment } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
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
  const payload = (await request.json()) as Partial<SolarAssessmentInput>;
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit(`solar-assessment:${ip}`, {
    limit: 4,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
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
    return NextResponse.json(
      { message: spamCheck.message, error: spamCheck.message },
      { status: spamCheck.status },
    );
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
