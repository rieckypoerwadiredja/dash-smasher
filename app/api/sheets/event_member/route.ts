import { google } from "googleapis";
import { NextResponse } from "next/server";

async function getSheetClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  return sheets;
}

// GET — find by email
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email query param is required" },
        { status: 400 }
      );
    }

    const sheets = await getSheetClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;

    const range = "event_member!A:D";
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

    const filtered = data.filter((d) => d.email === email);

    return NextResponse.json({ data: filtered || [] });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    console.error("GET event_member error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST — insert new row
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, event_id } = body;

    if (!id || !name || !email || !event_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const sheets = await getSheetClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;

    //  GET existing rows
    const range = "event_member!A:D";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];
    const [header, ...dataRows] = rows;

    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });

    // CHECK DUPLICATE
    const alreadyExists = data.find(
      (d) => d.email === email && d.event_id === event_id
    );

    if (alreadyExists) {
      return NextResponse.json(
        {
          message: "User already registered for this event",
          data: alreadyExists,
        },
        { status: 409 }
      );
    }
    if (!id || !name || !email || !event_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // INSERT NEW ROW
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "event_member!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [[id, name, email, event_id]],
      },
    });

    return NextResponse.json({
      message: "Registered successfully",
      data: { id, name, email, event_id },
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    console.error("POST event_member error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
