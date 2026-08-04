import { NextResponse } from "next/server";
import { createClaim, readClaims } from "@/lib/store";
import { CLAIM_ITEMS, type ClaimItem } from "@/lib/schema";

export async function GET() {
  const claims = await readClaims();
  return NextResponse.json(claims);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    claimId?: string;
    item?: string;
    technicianNotes?: string;
  };

  if (!body.claimId || !body.item || !body.technicianNotes) {
    return NextResponse.json(
      { error: "claimId, item, and technicianNotes are required" },
      { status: 400 },
    );
  }

  if (!CLAIM_ITEMS.includes(body.item as ClaimItem)) {
    return NextResponse.json({ error: "Invalid item selection" }, { status: 400 });
  }

  try {
    const claim = await createClaim({
      claimId: body.claimId,
      item: body.item as ClaimItem,
      technicianNotes: body.technicianNotes,
    });
    return NextResponse.json({ claim }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create claim";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
