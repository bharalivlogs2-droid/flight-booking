import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const bookings = await db.collection("bookings").find({}).toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
