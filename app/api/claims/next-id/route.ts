import { NextResponse } from "next/server";
import { generateClaimId } from "@/lib/store";

export async function GET() {
  try {
    const claimId = await generateClaimId();
    return NextResponse.json({ claimId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate claim ID";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
