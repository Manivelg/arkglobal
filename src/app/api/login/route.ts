"use server";

import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import type {
  PoolConnection,
  RowDataPacket,
  FieldPacket,
} from "mysql2/promise";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface TokenPayload {
  id: number;
  username: string;
  mail: string;
}

export async function POST(req: Request) {
  let connection: PoolConnection | undefined;
  try {
    const body = await req.json();
    const { username, password } = body;

    connection = await getConnection();

    // Properly typed query execution
    const [rows]: [UserRow[], FieldPacket[]] = await connection.query(
      "SELECT * FROM login WHERE name=? AND password=?",
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const tokenPayload: TokenPayload = {
        id: user.id,
        username: user.name,
        mail: user.email,
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
      return NextResponse.json({
        success: true,
        token,
        user: tokenPayload,
        message: "Login Successful",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
