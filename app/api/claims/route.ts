import { NextResponse } from "next/server";
import { createClaim, readClaims } from "@/lib/store";

export async function GET() {
  const claims = await readClaims();
  return NextResponse.json(claims);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    claimId?: string;
    itemName?: string;
    warrantyNumber?: string;
    issueSummary?: string;
  };

  if (!body.claimId || !body.itemName || !body.warrantyNumber || !body.issueSummary) {
    return NextResponse.json(
      { error: "claimId, itemName, warrantyNumber, and issueSummary are required" },
      { status: 400 },
    );
  }

  try {
    const claim = await createClaim({
      claimId: body.claimId,
      itemName: body.itemName.trim(),
      warrantyNumber: body.warrantyNumber.trim(),
      issueSummary: body.issueSummary.trim(),
    });
    return NextResponse.json({ claim }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create claim";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
