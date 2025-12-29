import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // CHANGE THESE CREDENTIALS
  if (username === "admin" && password === "admin123") {
    const res = NextResponse.json({ success: true });

    // simple auth cookie
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      path: "/",
    });

    return res;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
