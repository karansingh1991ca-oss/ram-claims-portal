export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={headerStyle}>
          <div style={innerStyle}>
            <strong>RAM Claims Portal</strong>
            <nav style={navStyle}>
              <a href="/">Home</a>
              <a href="/claims/new">Submit claim</a>
              <a href="/claims">View claims</a>
            </nav>
          </div>
        </header>
        <main style={mainStyle}>{children}</main>
      </body>
    </html>
  );
}

const headerStyle: React.CSSProperties = {
  background: "#1e3a5f",
  color: "#f8fafc",
  padding: "12px 24px",
  borderBottom: "1px solid #334155",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
};

const mainStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px",
  fontFamily: "system-ui, sans-serif",
};
