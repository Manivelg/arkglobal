import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { sendEmail } from "@/app/utils/mail/forgotmail";
import type {
  PoolConnection,
  RowDataPacket,
  FieldPacket,
  ResultSetHeader,
} from "mysql2/promise";

interface LoginRow extends RowDataPacket {
  id: number;
  email: string;
  code: string | null;
  expired_at: Date | null;
  // Add other fields from your login table as needed
}

interface RequestBody {
  email: string;
}

export async function POST(req: Request) {
  let connection: PoolConnection | undefined;
  try {
    const { email } = (await req.json()) as RequestBody;
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiry_time = new Date(Date.now() + 10 * 60 * 1000);

    connection = await getConnection();

    // Typed query for SELECT
    const [rows]: [LoginRow[], FieldPacket[]] = await connection.execute(
      "SELECT * FROM login WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      // Typed query for UPDATE
      const [result]: [ResultSetHeader, FieldPacket[]] =
        await connection.execute(
          "UPDATE login SET code = ?, expired_at = ? WHERE email = ?",
          [otp, expiry_time, email]
        );

      if (result.affectedRows > 0) {
        await sendEmail(email, otp);
        return NextResponse.json({
          message: "OTP sent",
          status: true,
        });
      } else {
        return NextResponse.json(
          {
            message: "Failed to update OTP",
            status: false,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "User doesn't exist! Please register",
          status: false,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}
