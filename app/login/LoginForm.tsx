"use client";

import { useState } from "react";

type Props = {
  redirectTo: string;
};

export default function LoginForm({ redirectTo }: Props) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }

      window.location.assign(redirectTo);
    } catch {
      setError("Network error — could not sign in.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle} noValidate>
      <label htmlFor="loginId">Login ID</label>
      <input
        id="loginId"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        autoComplete="username"
        required
        placeholder="TestID"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
        placeholder="TestPassword"
      />

      <button type="submit" disabled={loading} style={submitBtnStyle}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      {error ? <p style={{ color: "#dc2626", margin: 0 }}>{error}</p> : null}
    </form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const submitBtnStyle: React.CSSProperties = {
  marginTop: 8,
  background: "#000000",
  color: "#ffffff",
  border: "1px solid #000000",
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: 16,
};
