import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const courtId = pathSegments[pathSegments.length - 1];

    if (!courtId) {
      return NextResponse.json(
        { error: "Missing courtId parameter" },
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
    const range = "books!A:K";

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];
    if (rows.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    const [header, ...dataRows] = rows;

    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });

    // Filter semua booking berdasarkan court_id (google sheet column name)
    const filtered = data.filter((item) => item.court_id === courtId);

    return NextResponse.json({ data: filtered });
  } catch (err) {
    console.error("GET /api/sheets/books/[courtId] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
