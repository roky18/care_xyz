import { NextResponse } from "next/server";

export async function GET(request) {
  const origin = request.nextUrl.origin;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

  return NextResponse.json(
    {
      origin,
      redirectUri,
      note: "Use this exact redirectUri in Google OAuth client settings.",
    },
    { status: 200 }
  );
}
