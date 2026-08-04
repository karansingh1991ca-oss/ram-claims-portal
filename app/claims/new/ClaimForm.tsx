"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CLAIM_ITEMS, type ClaimItem } from "@/lib/schema";

type Props = {
  claimId: string;
};

export default function ClaimForm({ claimId }: Props) {
  const router = useRouter();
  const [item, setItem] = useState<ClaimItem | "">("");
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!item) {
      setError("Please select an item.");
      return;
    }
    if (!technicianNotes.trim()) {
      setError("Technician notes are required.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claimId,
          item,
          technicianNotes: technicianNotes.trim(),
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

      <label htmlFor="item">Item</label>
      <select
        id="item"
        value={item}
        onChange={(e) => setItem(e.target.value as ClaimItem)}
        required
        style={selectStyle}
      >
        <option value="">Select an item…</option>
        {CLAIM_ITEMS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor="technicianNotes">Technician notes</label>
      <textarea
        id="technicianNotes"
        value={technicianNotes}
        onChange={(e) => setTechnicianNotes(e.target.value)}
        required
        rows={5}
        placeholder="Describe the issue, repair performed, parts used, labor hours…"
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

const selectStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #cbd5e1",
  fontSize: 16,
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
