import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <div style={brandBarStyle}>RAM Claims Portal</div>
      <h1 style={{ margin: "0 0 8px", fontSize: 22 }}>Sign in</h1>
      <p style={{ margin: "0 0 24px", color: "#64748b" }}>
        Enter your login ID and password to access the portal.
      </p>
      <LoginForm redirectTo={params.from && params.from !== "/login" ? params.from : "/"} />
    </>
  );
}

const brandBarStyle: React.CSSProperties = {
  background: "#000000",
  color: "#ffffff",
  margin: "-32px -28px 24px",
  padding: "16px 28px",
  borderRadius: "12px 12px 0 0",
  fontWeight: 700,
};
