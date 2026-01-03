import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/(DashboardLayout)/api/apiConfigServer";
import { sendEmail } from "@/app/utils/mail/forgotmail";

export async function POST(req: Request) {
  try {
    /* ============================
       1️⃣ Read & validate input
    ============================ */
    const body = await req.json();
    const email = body?.email?.trim();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    /* ============================
       2️⃣ Generate OTP & expiry
    ============================ */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 10 minutes expiry
    const otpUpdatedAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    /* ============================
       3️⃣ Check user exists
    ============================ */
    const { data: user, error: findError } = await supabaseServer
      .from("login")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (findError) {
      console.error("Find user error:", findError.message);
      return NextResponse.json(
        { success: false, message: "Database error" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    /* ============================
       4️⃣ Update OTP in DB
    ============================ */
    const { error: updateError } = await supabaseServer
      .from("login")
      .update({
        code: otp,
        otp_updated_at: new Date(otpUpdatedAt),
      })
      .eq("email", normalizedEmail)
      .select("id");

    if (updateError) {
      console.error("OTP update error:", updateError.message);
      return NextResponse.json(
        { success: false, message: updateError.message },
        { status: 500 }
      );
    }

    /* ============================
       5️⃣ Send OTP email
    ============================ */
    try {
      await sendEmail(normalizedEmail, otp);
    } catch (mailError) {
      console.error("Email send error:", mailError);
      return NextResponse.json(
        { success: false, message: "OTP generated but email failed" },
        { status: 500 }
      );
    }

    /* ============================
       6️⃣ Success response
    ============================ */
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
