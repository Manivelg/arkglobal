import { supabase } from "@/app/(DashboardLayout)/api/apiConfig";
import { NextResponse } from "next/server";

export async function GET() {
  const errorLog: any = {
    timestamp: new Date().toISOString(),
    environment: {},
    connection: {},
    errors: [],
  };

  try {
    // 1. Check Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

    errorLog.environment = {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseKey?.length || 0,
      urlPrefix: supabaseUrl?.substring(0, 30) || "NOT SET",
      urlSuffix:
        supabaseUrl?.substring(Math.max(0, (supabaseUrl?.length || 0) - 20)) ||
        "NOT SET",
    };

    if (!supabaseUrl || !supabaseKey) {
      errorLog.errors.push({
        type: "ENVIRONMENT_VARIABLES_MISSING",
        message: "Missing Supabase environment variables",
        details: {
          missingUrl: !supabaseUrl,
          missingKey: !supabaseKey,
        },
      });

      return NextResponse.json(
        {
          success: false,
          errorLog,
        },
        { status: 500 }
      );
    }

    // 2. Test Supabase Client Initialization
    if (!supabase) {
      errorLog.errors.push({
        type: "CLIENT_INITIALIZATION_FAILED",
        message: "Supabase client is not initialized",
      });

      return NextResponse.json(
        {
          success: false,
          errorLog,
        },
        { status: 500 }
      );
    }

    // 3. Test Database Connection - Try to query login table
    console.log("🔄 Testing Supabase connection...");
    const { data, error, status, statusText } = await supabase
      .from("login")
      .select("id")
      .limit(1);

    errorLog.connection = {
      statusCode: status,
      statusText: statusText,
      hasData: !!data,
      dataLength: data?.length || 0,
    };

    if (error) {
      console.error("❌ Supabase Connection Error:", error);
      errorLog.errors.push({
        type: "DATABASE_QUERY_ERROR",
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        fullError: JSON.stringify(error, null, 2),
      });

      return NextResponse.json(
        {
          success: false,
          errorLog,
        },
        { status: 500 }
      );
    }

    // 4. Test Table Count
    const { count, error: countError } = await supabase
      .from("login")
      .select("*", { count: "exact", head: true });

    if (countError) {
      errorLog.errors.push({
        type: "COUNT_QUERY_ERROR",
        message: countError.message,
        code: countError.code,
      });
    } else {
      errorLog.connection.totalRecords = count;
    }

    // 5. Success Response
    console.log("✅ Supabase connection successful!");
    return NextResponse.json({
      success: true,
      message: "✅ Database connection is working!",
      errorLog: {
        ...errorLog,
        connection: {
          ...errorLog.connection,
          status: "CONNECTED",
        },
      },
    });
  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    errorLog.errors.push({
      type: "UNEXPECTED_ERROR",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    });

    return NextResponse.json(
      {
        success: false,
        errorLog,
      },
      { status: 500 }
    );
  }
}