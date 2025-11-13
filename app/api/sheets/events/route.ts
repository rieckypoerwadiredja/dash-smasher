import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.error("❌ Missing SPREADSHEET_ID in environment variables");
      return NextResponse.json(
        {
          message:
            "Something went wrong on the server. Please try again later.",
        },
        { status: 500 }
      );
    }

    const range = "events!A:I";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];

    // First row = header
    const [header, ...dataRows] = rows;
    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err : new Error("Unknown server error");

    console.error("❌ Google Sheets fetch error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
