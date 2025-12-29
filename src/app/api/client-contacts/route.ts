// Dependencies
import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/(DashboardLayout)/api/apiConfigServer";

// Components
import { sendEmail } from "@/app/utils/contactMail/contactmail";

interface Contact {
  name: string;
  company: string;
  email: string;
  mobile: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  data?: Contact & { id?: number };
  message?: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const contactData: Contact = await request.json();

    // Basic validation
    if (!contactData.name || !contactData.email || !contactData.message) {
      return NextResponse.json<ContactResponse>(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Insert into Supabase database
    const { data, error } = await supabaseServer
      .from("contacts")
      .insert({
        name: contactData.name,
        company: contactData.company || null,
        email: contactData.email,
        mobile: contactData.mobile || null,
        message: contactData.message,
      })
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json<ContactResponse>(
        {
          success: false,
          error: "Failed to save contact information",
        },
        { status: 500 }
      );
    }

    await sendEmail(contactData.email, contactData.name);

    return NextResponse.json<ContactResponse>(
      {
        success: true,
        data: { ...contactData, id: data.id },
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json<ContactResponse>(
      {
        success: false,
        error: "An error occurred while submitting the form",
      },
      { status: 500 }
    );
  }
}
