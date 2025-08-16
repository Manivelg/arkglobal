import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // First check if database is connected
    if (!db) {
      return res.status(500).json({ message: "Database not initialized" });
    }

    // Optional: Explicit connection check (depends on your DB library)
    // For mysql2/promise (common with MySQL):
    try {
      await db.getConnection(); // or db.ping() for some libraries
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return res.status(500).json({ message: "Database connection failed" });
    }

    const { name, password } = req.body;

    // Query the database
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [name, password]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return res.status(200).json({ success: true, user: rows[0] });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
