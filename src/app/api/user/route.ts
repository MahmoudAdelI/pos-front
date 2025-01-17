import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    const res = await fetch("http://localhost:5091/api/Users/current", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const user = await res.json();
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 401 });
  }
}
