import type { RamClaim } from "@/lib/schema";
import { readJsonStore, writeJsonStore } from "@/lib/json-store";

const CLAIMS_KEY = "claims.json";

export async function readClaims(): Promise<RamClaim[]> {
  const claims = await readJsonStore<RamClaim[]>(CLAIMS_KEY, []);
  return claims.map(normalizeClaim);
}

async function writeClaims(claims: RamClaim[]): Promise<void> {
  await writeJsonStore(CLAIMS_KEY, claims);
}

function normalizeClaim(
  raw: RamClaim & { item?: string; technicianNotes?: string; warrantyNumber?: string },
): RamClaim {
  return {
    claimId: raw.claimId,
    itemName: raw.itemName ?? raw.item ?? "",
    serialNumber: raw.serialNumber ?? raw.warrantyNumber ?? "",
    issueSummary: raw.issueSummary ?? raw.technicianNotes ?? "",
    submittedAt: raw.submittedAt,
  };
}

export async function generateClaimId(): Promise<string> {
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `CLM-2026-${suffix}`;
}

export async function createClaim(input: {
  claimId: string;
  itemName: string;
  serialNumber: string;
  issueSummary: string;
}): Promise<RamClaim> {
  const claims = await readClaims();
  if (claims.some((c) => c.claimId === input.claimId)) {
    throw new Error(`Claim ${input.claimId} already exists`);
  }

  const claim: RamClaim = {
    claimId: input.claimId,
    itemName: input.itemName,
    serialNumber: input.serialNumber,
    issueSummary: input.issueSummary,
    submittedAt: new Date().toISOString(),
  };

  claims.unshift(claim);
  await writeClaims(claims);
  return claim;
}
