import { NextResponse } from "next/server";
import { AUTH_COOKIE, credentialsValid } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { loginId?: string; password?: string };

  if (!body.loginId || !body.password) {
    return NextResponse.json({ error: "Login ID and password are required" }, { status: 400 });
  }

  if (!credentialsValid(body.loginId, body.password)) {
    return NextResponse.json({ error: "Invalid login ID or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
