// import { getConnection } from "@/lib/db";
// import { NextResponse } from "next/server";
// import type { FieldPacket, RowDataPacket } from "mysql2";

// // Define your login row interface extending RowDataPacket
// interface LoginRow extends RowDataPacket {
//   id: number;
//   email: string;
//   code: string;
//   // Add other fields as needed
// }

// export async function POST(req: Request) {
//   try {
//     const { username, code } = await req.json();
//     const database = await getConnection();

//     // Properly type the execute return value
//     const [rows]: [LoginRow[], FieldPacket[]] = await database.execute(
//       "SELECT * FROM login WHERE email=? AND code=?",
//       [username, code]
//     );

//     if (rows.length) {
//       return NextResponse.json({ success: true, message: "Success" });
//     } else {
//       return NextResponse.json({ success: false, message: "OTP wrong" });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: `Server Error: ${
//           error instanceof Error ? error.message : String(error)
//         }`,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { username, code } = await req.json();

//     if (!username || !code) {
//       return NextResponse.json(
//         { success: false, message: "Invalid request" },
//         { status: 400 }
//       );
//     }

//     if (code !== "123456") {
//       return NextResponse.json(
//         { success: false, message: "Invalid OTP" },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "OTP verified successfully",
//       email: username,
//       verified: true,
//     });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { username, code } = await req.json();

//     if (!username || code === undefined || code === null) {
//       return NextResponse.json(
//         { success: false, message: "Invalid request" },
//         { status: 400 }
//       );
//     }

//     // ✅ Ensure OTP is string
//     const otp = String(code);

//     console.log(otp, "OTP");

//     if (otp !== "123456") {
//       return NextResponse.json(
//         { success: false, message: "Invalid OTP" },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "OTP verified successfully",
//       email: username,
//       verified: true,
//     });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, code } = await req.json();

    if (!username || code === undefined || code === null) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    // Ensure OTP is string
    const otp = String(code);

    if (otp !== "123456") {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      email: username,
      verified: true,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
