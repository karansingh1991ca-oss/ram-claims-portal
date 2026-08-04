"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  claimId: string;
};

export default function ClaimForm({ claimId }: Props) {
  const router = useRouter();
  const [itemName, setItemName] = useState("");
  const [warrantyNumber, setWarrantyNumber] = useState("");
  const [issueSummary, setIssueSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!itemName.trim()) {
      setError("Item name is required.");
      return;
    }
    if (!warrantyNumber.trim()) {
      setError("Warrenty number is required.");
      return;
    }
    if (!issueSummary.trim()) {
      setError("Issue summary is required.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claimId,
          itemName: itemName.trim(),
          warrantyNumber: warrantyNumber.trim(),
          issueSummary: issueSummary.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to submit claim.");
        setSaving(false);
        return;
      }

      window.location.assign("/?submitted=1");
    } catch {
      setError("Network error — could not submit. Is the server running?");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle} noValidate>
      <label htmlFor="claimId">Claim ID</label>
      <input id="claimId" value={claimId} readOnly style={readOnlyInputStyle} tabIndex={-1} />

      <label htmlFor="itemName">Item name</label>
      <input
        id="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />

      <label htmlFor="warrantyNumber">Warrenty number</label>
      <input
        id="warrantyNumber"
        value={warrantyNumber}
        onChange={(e) => setWarrantyNumber(e.target.value)}
        required
      />

      <label htmlFor="issueSummary">Issue summary</label>
      <textarea
        id="issueSummary"
        value={issueSummary}
        onChange={(e) => setIssueSummary(e.target.value)}
        required
        rows={5}
      />

      <div style={actionsStyle}>
        <button type="button" onClick={() => router.push("/")} disabled={saving} style={cancelBtnStyle}>
          Cancel
        </button>
        <button type="submit" id="submitClaim" disabled={saving} style={submitBtnStyle}>
          {saving ? "Submitting…" : "Submit claim"}
        </button>
      </div>
      {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
    </form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 640,
  marginTop: 16,
};

const readOnlyInputStyle: React.CSSProperties = {
  backgroundColor: "#f1f5f9",
  color: "#64748b",
  cursor: "not-allowed",
  border: "1px solid #cbd5e1",
  padding: "8px 10px",
  borderRadius: 6,
};

const actionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  marginTop: 12,
};

const submitBtnStyle: React.CSSProperties = {
  background: "#000000",
  color: "#ffffff",
  border: "1px solid #000000",
  borderRadius: 8,
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: 16,
};

const cancelBtnStyle: React.CSSProperties = {
  background: "#000000",
  color: "#ffffff",
  border: "1px solid #000000",
  borderRadius: 8,
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: 16,
};
