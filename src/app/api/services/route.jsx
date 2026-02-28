import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const serviceCollection = dbConnect(collections.SERVICES);
    const data = await serviceCollection.find({}).toArray();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Data fetch failed", error }, { status: 500 });
  }
}