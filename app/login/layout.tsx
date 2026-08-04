export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>{children}</div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  fontFamily: "system-ui, sans-serif",
  padding: 24,
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "32px 28px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};
