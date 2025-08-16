import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import type { FieldPacket, RowDataPacket } from "mysql2";

// Define your login row interface extending RowDataPacket
interface LoginRow extends RowDataPacket {
  id: number;
  email: string;
  code: string;
  // Add other fields as needed
}

export async function POST(req: Request) {
  try {
    const { username, code } = await req.json();
    const database = await getConnection();

    // Properly type the execute return value
    const [rows]: [LoginRow[], FieldPacket[]] = await database.execute(
      "SELECT * FROM login WHERE email=? AND code=?",
      [username, code]
    );

    if (rows.length) {
      return NextResponse.json({ success: true, message: "Success" });
    } else {
      return NextResponse.json({ success: false, message: "OTP wrong" });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Server Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      {
        status: 500,
      }
    );
  }
}
