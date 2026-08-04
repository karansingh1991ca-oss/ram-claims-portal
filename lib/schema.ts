export const CLAIM_ITEMS = [
  "Clutch plate",
  "Wipers",
  "Tail Light",
  "Head light",
  "Tyres",
  "Windsheild",
] as const;

export type ClaimItem = (typeof CLAIM_ITEMS)[number];

export type RamClaim = {
  claimId: string;
  item: ClaimItem;
  technicianNotes: string;
  submittedAt: string;
};
