import { NextResponse } from "next/server";
import { createSavingsLead } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { checkSpamProtection } from "@/lib/security/spam-protection";
import { validateSavingsLeadInput } from "@/lib/validation/forms";
import type { SavingsLeadInput } from "@/types/site";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<SavingsLeadInput>;
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit(`savings-leads:${ip}`, {
    limit: 4,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
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
    return NextResponse.json(
      { message: spamCheck.message, error: spamCheck.message },
      { status: spamCheck.status },
    );
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
