import type { ClaimItem, RamClaim } from "@/lib/schema";
import { readJsonStore, writeJsonStore } from "@/lib/json-store";

const CLAIMS_KEY = "claims.json";

export async function readClaims(): Promise<RamClaim[]> {
  return readJsonStore<RamClaim[]>(CLAIMS_KEY, []);
}

async function writeClaims(claims: RamClaim[]): Promise<void> {
  await writeJsonStore(CLAIMS_KEY, claims);
}

export async function generateClaimId(): Promise<string> {
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `CLM-2026-${suffix}`;
}

export async function createClaim(input: {
  claimId: string;
  item: ClaimItem;
  technicianNotes: string;
}): Promise<RamClaim> {
  const claims = await readClaims();
  if (claims.some((c) => c.claimId === input.claimId)) {
    throw new Error(`Claim ${input.claimId} already exists`);
  }

  const claim: RamClaim = {
    claimId: input.claimId,
    item: input.item,
    technicianNotes: input.technicianNotes,
    submittedAt: new Date().toISOString(),
  };

  claims.unshift(claim);
  await writeClaims(claims);
  return claim;
}
