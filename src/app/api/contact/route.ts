import { NextResponse } from "next/server";
import { createContactInquiry } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { validateContactInput } from "@/lib/validation/forms";
import type { ContactInput } from "@/types/site";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContactInput>;
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });

  if (!rateLimit.allowed) {
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
    return NextResponse.json(
      { message: spamCheck.message, error: spamCheck.message },
      { status: spamCheck.status },
    );
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
