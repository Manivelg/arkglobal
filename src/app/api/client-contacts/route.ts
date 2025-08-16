import { sendEmail } from "@/app/utils/contactMail/contactmail";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

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

    // Insert into database
    const [result] = await pool.query(
      "INSERT INTO contacts (name, company, email, mobile, message) VALUES (?, ?, ?, ?, ?)",
      [
        contactData.name,
        contactData.company,
        contactData.email,
        contactData.mobile || null, // Handle optional phone
        contactData.message,
      ]
    );

    // Type assertion for the result (adjust based on your MySQL library)
    const insertResult = result as { insertId?: number };

    await sendEmail(contactData.email, contactData.name);

    return NextResponse.json<ContactResponse>(
      {
        success: true,
        data: { ...contactData, id: insertResult.insertId },
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
