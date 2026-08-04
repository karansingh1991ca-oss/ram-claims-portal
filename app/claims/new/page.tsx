"use client";

import { useEffect, useState } from "react";
import ClaimForm from "./ClaimForm";

export default function NewClaimPage() {
  const [claimId, setClaimId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/claims/next-id")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to generate claim ID");
        return res.json() as Promise<{ claimId: string }>;
      })
      .then((data) => setClaimId(data.claimId))
      .catch(() => setLoadError("Could not generate claim ID. Please refresh the page."));
  }, []);

  if (loadError) {
    return (
      <section>
        <h1>Submit claim</h1>
        <p style={{ color: "#dc2626" }}>{loadError}</p>
      </section>
    );
  }

  if (!claimId) {
    return (
      <section>
        <h1>Submit claim</h1>
        <p style={{ color: "#64748b" }}>Preparing form…</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Submit claim</h1>
      <p style={{ color: "#64748b" }}>Select the item and enter technician notes.</p>
      <ClaimForm claimId={claimId} />
    </section>
  );
}
