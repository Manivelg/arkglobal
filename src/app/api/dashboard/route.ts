import { supabaseServer } from "@/app/(DashboardLayout)/api/apiConfigServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("contacts")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch contacts" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
