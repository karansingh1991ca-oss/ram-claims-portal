"use client";

import { useMemo } from "react";
import ClaimForm from "./ClaimForm";

function createClaimId(): string {
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `CLM-2026-${suffix}`;
}

export default function NewClaimPage() {
  const claimId = useMemo(() => createClaimId(), []);

  return (
    <section>
      <h1>Submit claim</h1>
      <p style={{ color: "#64748b" }}>Enter the item name, serial number, and issue summary.</p>
      <ClaimForm claimId={claimId} />
    </section>
  );
}
