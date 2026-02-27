import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json(
    {
      user: {
        _id: session.sub,
        email: session.email,
        name: session.name,
      },
    },
    { status: 200 }
  );
}
