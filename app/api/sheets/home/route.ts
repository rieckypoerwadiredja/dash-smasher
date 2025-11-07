import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREADSHEET_ID!;

  // Jalankan dua fetch paralel
  const [courtsRes, eventsRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "courts!A:K",
    }),
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "events!A:F",
    }),
  ]);

  // Helper function ubah array ke object
  function toObjects<T extends Record<string, string>>(rows: string[][]): T[] {
    if (!rows.length) return [];
    const [header, ...dataRows] = rows;
    return dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => (obj[key] = row[i] || ""));
      return obj as T;
    });
  }

  const courts = toObjects(courtsRes.data.values || []);
  const events = toObjects(eventsRes.data.values || []);

  return NextResponse.json({ courts, events });
}
