import { NextResponse } from "next/server";
import { createSavingsLead } from "@/lib/lead-store";
import { sendAdminNotification } from "@/lib/notifications";
import { validateSavingsLeadInput } from "@/lib/validation/forms";
import type { SavingsLeadInput } from "@/types/site";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<SavingsLeadInput>;
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
