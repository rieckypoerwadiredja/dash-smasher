import { google } from "googleapis";
import { NextResponse } from "next/server";

// POST untuk menambahkan booking baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      court_id,
      court_number,
      user,
      email,
      start_time,
      end_time,
      date,
      status,
    } = body;

    // Validasi sederhana
    if (
      !id ||
      !court_id ||
      !court_number ||
      !user ||
      !email ||
      !start_time ||
      !end_time ||
      !date ||
      !status
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID!;

    // Format data sesuai urutan kolom di sheet "books"
    const values = [
      [
        id,
        court_id,
        court_number,
        user,
        email,
        start_time,
        end_time,
        date,
        status,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "books!A:I", // kolom sesuai urutan
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ message: "Booking added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add booking" },
      { status: 500 }
    );
  }
}
