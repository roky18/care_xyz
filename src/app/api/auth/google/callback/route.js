import { collections, dbConnect } from "@/lib/dbConnect";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

const GOOGLE_STATE_COOKIE = "care_google_state";
const GOOGLE_REDIRECT_COOKIE = "care_google_redirect";

function safeRedirect(path) {
  if (!path || typeof path !== "string") return "/";
  if (!path.startsWith("/")) return "/";
  if (path.startsWith("//")) return "/";
  return path;
}

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const cookieState = request.cookies.get(GOOGLE_STATE_COOKIE)?.value;
  const cookieRedirect = safeRedirect(
    request.cookies.get(GOOGLE_REDIRECT_COOKIE)?.value || "/"
  );

  const failUrl = new URL(`/login?error=google_auth`, request.url);

  if (!code || !state || !cookieState || state !== cookieState) {
    const failResponse = NextResponse.redirect(failUrl);
    failResponse.cookies.set(GOOGLE_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    failResponse.cookies.set(GOOGLE_REDIRECT_COOKIE, "", { path: "/", maxAge: 0 });
    return failResponse;
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      `${request.nextUrl.origin}/api/auth/google/callback`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      throw new Error("Google token exchange failed");
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      throw new Error("Access token missing");
    }

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!profileRes.ok) {
      throw new Error("Google profile fetch failed");
    }

    const profile = await profileRes.json();
    if (!profile?.email) {
      throw new Error("Google email missing");
    }

    const userCollection = dbConnect(collections.USERS);
    let user = await userCollection.findOne({ email: profile.email });

    if (!user) {
      const insertResult = await userCollection.insertOne({
        name: profile.name || "Google User",
        email: profile.email,
        image: profile.picture || null,
        authProvider: "google",
        createdAt: new Date(),
      });

      user = {
        _id: insertResult.insertedId,
        name: profile.name || "Google User",
        email: profile.email,
        image: profile.picture || null,
      };
    } else {
      await userCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            name: profile.name || user.name || "Google User",
            image: profile.picture || user.image || null,
            authProvider: "google",
            lastLoginAt: new Date(),
          },
        }
      );

      user = {
        ...user,
        name: profile.name || user.name || "Google User",
        image: profile.picture || user.image || null,
      };
    }

    const sessionToken = createSessionToken(user);
    const successResponse = NextResponse.redirect(new URL(cookieRedirect, request.url));
    setSessionCookie(successResponse, sessionToken);
    successResponse.cookies.set(GOOGLE_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    successResponse.cookies.set(GOOGLE_REDIRECT_COOKIE, "", { path: "/", maxAge: 0 });
    return successResponse;
  } catch {
    const failResponse = NextResponse.redirect(failUrl);
    failResponse.cookies.set(GOOGLE_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    failResponse.cookies.set(GOOGLE_REDIRECT_COOKIE, "", { path: "/", maxAge: 0 });
    return failResponse;
  }
}
