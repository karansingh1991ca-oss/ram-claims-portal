import Link from "next/link";
import { readClaims } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ClaimsPage() {
  const claims = await readClaims();

  return (
    <section>
      <h1>Submitted claims</h1>
      {claims.length === 0 ? (
        <p id="claims-empty">No claims submitted yet.</p>
      ) : (
        <table style={tableStyle} id="claims-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Item name</th>
              <th>Warrenty number</th>
              <th>Issue summary</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.claimId}>
                <td>{claim.claimId}</td>
                <td>{claim.itemName}</td>
                <td>{claim.warrantyNumber}</td>
                <td style={{ maxWidth: 320 }}>{claim.issueSummary}</td>
                <td>{new Date(claim.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to home</Link>
      </p>
    </section>
  );
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 16,
};
