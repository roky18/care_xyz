import { dbConnect, collections } from "@/lib/dbConnect";
import { createSessionToken, setSessionCookie, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const userCollection = dbConnect(collections.USERS);

    const user = await userCollection.findOne({ email });

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...userData } = user;
    const response = NextResponse.json(
      { message: "Login success", user: userData },
      { status: 200 }
    );
    const token = createSessionToken(userData);
    setSessionCookie(response, token);
    return response;

  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
