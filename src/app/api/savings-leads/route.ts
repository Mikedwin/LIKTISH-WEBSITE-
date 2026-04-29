import { NextResponse } from "next/server";
import { createSavingsLead } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { normalizeSavingsLeadInput } from "@/lib/security/form-normalization";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { hasTurnstileConfig, verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateSavingsLeadInput } from "@/lib/validation/forms";
import type { SavingsLeadInput } from "@/types/site";

export async function POST(request: Request) {
  const payload = normalizeSavingsLeadInput((await request.json()) as Partial<SavingsLeadInput>);
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit(`savings-leads:${ip}`, {
    limit: 4,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    await logAbuseEvent({
      route: "/api/savings-leads",
      type: "rate_limited",
      ipAddress: ip,
      details: "Savings lead rate limit exceeded.",
    });
    return NextResponse.json(
      { error: "Too many quote requests in a short time. Please try again shortly." },
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
    payload.phone ?? "",
    payload.email ?? "",
    payload.estimateSummary ?? "",
  ]);

  if (!spamCheck.valid) {
    await logAbuseEvent({
      route: "/api/savings-leads",
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
        route: "/api/savings-leads",
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

  const validation = validateSavingsLeadInput(payload);

  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.errors.join(" ") },
      { status: 400 },
    );
  }

  await createSavingsLead(payload as SavingsLeadInput);
  await sendAdminNotification({
    subject: "New calculator lead",
    recipient: "LIKTISH admin",
    message: `${payload.name} requested a more accurate solar savings report.`,
  });

  return NextResponse.json({
    message: "Your estimate has been saved. LIKTISH will follow up with an accurate report.",
  });
}
