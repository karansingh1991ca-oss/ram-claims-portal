import { NextResponse } from "next/server";
import { generateClaimId } from "@/lib/store";

export async function GET() {
  const claimId = await generateClaimId();
  return NextResponse.json({ claimId });
}
