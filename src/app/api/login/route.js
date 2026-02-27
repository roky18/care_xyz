import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const userCollection = dbConnect(collections.USERS);

    const user = await userCollection.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...userData } = user;
    return NextResponse.json({ message: "Login success", user: userData }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
