import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    (await cookies()).set("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0), // This immediately invalidates the cookie
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" });
  }
}
