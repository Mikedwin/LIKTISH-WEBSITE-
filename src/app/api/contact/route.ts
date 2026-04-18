import { NextResponse } from "next/server";
import { createContactInquiry } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { validateContactInput } from "@/lib/validation/forms";
import type { ContactInput } from "@/types/site";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContactInput>;
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
