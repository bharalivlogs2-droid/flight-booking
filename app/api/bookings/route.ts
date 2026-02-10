import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("flightbooking");
    const bookings = await db.collection("bookings").find({}).toArray();

    await client.close();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
