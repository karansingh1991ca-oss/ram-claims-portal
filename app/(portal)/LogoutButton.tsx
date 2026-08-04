"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/login");
  }

  return (
    <button type="button" onClick={handleLogout} style={btnStyle}>
      Log out
    </button>
  );
}

const btnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#ffffff",
  border: "1px solid #ffffff",
  borderRadius: 6,
  padding: "6px 12px",
  cursor: "pointer",
  fontSize: 14,
};
