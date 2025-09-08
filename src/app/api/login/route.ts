// "use server";

// import { getConnection } from "@/lib/db";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import type {
//   PoolConnection,
//   RowDataPacket,
//   FieldPacket,
// } from "mysql2/promise";

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// interface UserRow extends RowDataPacket {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// }

// interface TokenPayload {
//   id: number;
//   username: string;
//   mail: string;
// }

// export async function POST(req: Request) {
//   let connection: PoolConnection | undefined;
//   try {
//     const body = await req.json();
//     const { username, password } = body;

//     connection = await getConnection();

//     // Properly typed query execution
//     const [rows]: [UserRow[], FieldPacket[]] = await connection.query(
//       "SELECT * FROM login WHERE name=? AND password=?",
//       [username, password]
//     );

//     if (rows.length > 0) {
//       const user = rows[0];
//       const tokenPayload: TokenPayload = {
//         id: user.id,
//         username: user.name,
//         mail: user.email,
//       };

//       const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
//       return NextResponse.json({
//         success: true,
//         token,
//         user: tokenPayload,
//         message: "Login Successful",
//       });
//     } else {
//       return NextResponse.json(
//         { success: false, message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: `Error: ${
//           error instanceof Error ? error.message : "Unknown error"
//         }`,
//       },
//       { status: 500 }
//     );
//   } finally {
//     if (connection) connection.release();
//   }
// }

// app/api/login/route.ts
import { supabase } from "@/app/(DashboardLayout)/api/apiConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface TokenPayload {
  id: string;
  username: string;
  email: string;
}

// Test Supabase connection by querying your login table
async function testDatabaseConnection() {
  try {
    const { error } = await supabase.from("login").select("id").limit(1);
    if (error) {
      console.error("Connection test error:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Unexpected connection error:", error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // Check database connection
    const isConnected = await testDatabaseConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Query Supabase login table
    const { data, error } = await supabase
      .from("login")
      .select("id, name, email, password")
      .eq("name", username)
      .eq("password", password) // ⚠️ plaintext check (works but not safe)
      .maybeSingle();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { success: false, message: "Database query error" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Create JWT
    const tokenPayload: TokenPayload = {
      id: data.id.toString(),
      username: data.name,
      email: data.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({
      success: true,
      token,
      user: tokenPayload,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
