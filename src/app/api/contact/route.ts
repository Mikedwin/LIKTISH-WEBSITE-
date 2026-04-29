import { NextResponse } from "next/server";
import { createContactInquiry } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { logAbuseEvent } from "@/lib/security/abuse-log";
import { normalizeContactInput } from "@/lib/security/form-normalization";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { hasTurnstileConfig, verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateContactInput } from "@/lib/validation/forms";
import type { ContactInput } from "@/types/site";

export async function POST(request: Request) {
  const payload = normalizeContactInput((await request.json()) as Partial<ContactInput>);
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });

  if (!rateLimit.allowed) {
    await logAbuseEvent({
      route: "/api/contact",
      type: "rate_limited",
      ipAddress: ip,
      details: "Contact rate limit exceeded.",
    });
    return NextResponse.json(
      { error: "Too many enquiries in a short time. Please try again shortly." },
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
    payload.email ?? "",
    payload.phone ?? "",
    payload.message ?? "",
  ]);

  if (!spamCheck.valid) {
    await logAbuseEvent({
      route: "/api/contact",
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
        route: "/api/contact",
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

  const validation = validateContactInput(payload);

  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.errors.join(" ") },
      { status: 400 },
    );
  }

  await createContactInquiry(payload as ContactInput);
  await sendAdminNotification({
    subject: "New website enquiry",
    recipient: "LIKTISH admin",
    message: `${payload.name} submitted a ${payload.enquiryType} enquiry.`,
  });

  return NextResponse.json({
    message: "Your enquiry has been sent. LIKTISH will respond soon.",
  });
}
