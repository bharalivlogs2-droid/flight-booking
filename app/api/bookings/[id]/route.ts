import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request, { params }: any) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("flight");

    await db.collection("bookings").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name: body.name,
          email: body.email,
          from: body.from,
          to: body.to,
          date: body.date,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
