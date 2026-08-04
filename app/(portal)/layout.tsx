import LogoutButton from "./LogoutButton";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header style={headerStyle}>
        <div style={innerStyle}>
          <strong>RAM Claims Portal</strong>
          <nav style={navStyle}>
            <a href="/" style={navLinkStyle}>
              Home
            </a>
            <a href="/claims/new" style={navLinkStyle}>
              Submit claim
            </a>
            <a href="/claims" style={navLinkStyle}>
              View claims
            </a>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main style={mainStyle}>{children}</main>
    </>
  );
}

const headerStyle: React.CSSProperties = {
  background: "#000000",
  color: "#ffffff",
  padding: "12px 24px",
  borderBottom: "1px solid #333333",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
  color: "#ffffff",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  alignItems: "center",
};

const navLinkStyle: React.CSSProperties = {
  color: "#ffffff",
  textDecoration: "none",
};

const mainStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px",
  fontFamily: "system-ui, sans-serif",
};
