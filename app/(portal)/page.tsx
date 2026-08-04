import Link from "next/link";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const params = await searchParams;

  return (
    <section>
      <h1>Warrenty Claim Portal</h1>
      {params.submitted ? (
        <div style={successBannerStyle} role="status">
          Claim submitted successfully. View it under &quot;View submitted claims&quot;.
        </div>
      ) : null}
      <p style={{ color: "#64748b" }}>
        Submit warrenty claims and review previously submitted claims.
      </p>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Link href="/claims/new" style={primaryBtn}>
          Submit claims
        </Link>
        <Link href="/claims" style={secondaryBtn}>
          View submitted claims
        </Link>
      </div>
    </section>
  );
}

const successBannerStyle: React.CSSProperties = {
  backgroundColor: "#dcfce7",
  color: "#166534",
  border: "1px solid #86efac",
  borderRadius: 8,
  padding: "12px 16px",
  marginBottom: 16,
};

const primaryBtn: React.CSSProperties = {
  background: "#000000",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: 8,
  textDecoration: "none",
  border: "1px solid #000000",
};

const secondaryBtn: React.CSSProperties = {
  background: "#000000",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: 8,
  textDecoration: "none",
  border: "1px solid #000000",
};
