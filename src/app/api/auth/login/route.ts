import { LoginFormSchema } from "@/app/login/login-form/types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userLogin = LoginFormSchema.safeParse(body);
    if (!userLogin.success)
      return NextResponse.json(
        { error: "Invalid input data", details: userLogin.error.errors },
        { status: 400 },
      );

    const res = await axios.post(
      "http://localhost:5091/api/Auth/login",
      userLogin.data,
    );

    const { token } = res.data;
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  }
}
