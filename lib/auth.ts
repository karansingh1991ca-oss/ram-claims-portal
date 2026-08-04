export const AUTH_COOKIE = "ram-claims-auth";

export const VALID_LOGIN_ID = "TestID";
export const VALID_PASSWORD = "TestPassword";

export function credentialsValid(loginId: string, password: string): boolean {
  return loginId === VALID_LOGIN_ID && password === VALID_PASSWORD;
}
