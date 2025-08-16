import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const database = await getConnection();
    const { password, username } = await req.json();
    const res = await database.execute(
      "UPDATE login SET password=? WHERE email=?",
      [password, username]
    );
    return NextResponse.json({ response: res });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}
