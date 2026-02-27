import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const newUser = await request.json();
    const userCollection = dbConnect(collections.USERS);

    const isExist = await userCollection.findOne({ email: newUser.email });
    if (isExist) {
      return NextResponse.json({ message: "User already exists!" }, { status: 400 });
    }

    const result = await userCollection.insertOne(newUser);
    return NextResponse.json({ message: "User registered", result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
