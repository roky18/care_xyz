import crypto from "crypto";
import { NextResponse } from "next/server";

const GOOGLE_STATE_COOKIE = "care_google_state";
const GOOGLE_REDIRECT_COOKIE = "care_google_redirect";

function normalizeRedirectPath(path) {
  if (!path || typeof path !== "string") return "/";
  if (!path.startsWith("/")) return "/";
  if (path.startsWith("//")) return "/";
  return path;
}

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google_config", request.url));
  }

  const state = crypto.randomBytes(24).toString("hex");
  const redirectPath = normalizeRedirectPath(
    request.nextUrl.searchParams.get("redirect") || "/"
  );
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    `${request.nextUrl.origin}/api/auth/google/callback`;
  console.log("[Google OAuth Start] origin:", request.nextUrl.origin);
  console.log("[Google OAuth Start] redirect_uri:", redirectUri);

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("state", state);
  googleUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(googleUrl);
  response.cookies.set(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  response.cookies.set(GOOGLE_REDIRECT_COOKIE, redirectPath, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
