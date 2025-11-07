import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
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

  const range = "courts!A:L";
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });

  const rows = res.data.values || [];
  const [header, ...dataRows] = rows;

  const data = dataRows.map((row) => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key] = row[i] || "";
    });
    return obj;
  });

  const found = data.find((row) => row.id === id);

  if (!found) {
    return NextResponse.json({ error: "Data not found" }, { status: 404 });
  }

  return NextResponse.json({ data: found });
}
