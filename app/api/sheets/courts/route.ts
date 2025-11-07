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

  // Ambil semua data dari sheet "courts"
  const range = "courts!A:L";
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = res.data.values || [];

  // Baris pertama = header (nama kolom)
  const [header, ...dataRows] = rows;

  // Ubah array jadi object per baris
  const data = dataRows.map((row) => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key] = row[i] || "";
    });
    return obj;
  });

  return NextResponse.json({ data });
}
