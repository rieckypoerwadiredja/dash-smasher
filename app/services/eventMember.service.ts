import { getSheetsClient } from "@/app/utils/sheets";
import { EventMember } from "../(main)/events/page";
import { formatDateTime } from "../utils/date";

const spreadsheetId = process.env.SPREADSHEET_ID!;

// GET — find by email
export async function getEventMember(email: string) {
  try {
    if (!email) {
      return {
        success: false,
        status: 400,
        message: "Email query parameter is required",
        data: null,
      };
    }

    const sheets = await getSheetsClient();

    const range = "event_member!A:E";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];
    const [header, ...dataRows] = rows;

    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => (obj[key] = row[i] || ""));
      return obj;
    });

    const filtered = data.filter((d) => d.email === email);

    return {
      success: true,
      status: 200,
      message: "Success",
      data: filtered,
    };
  } catch (error) {
    console.error("getEventMembersByEmail error:", error);

    return {
      success: false,
      status: 500,
      message: "Failed to fetch event_member data",
      data: null,
    };
  }
}

// POST — insert new row
export async function addEventMember(body: EventMember) {
  try {
    const { id, name, email, event_id } = body;
    const created_at = formatDateTime();

    if (!id || !name || !email || !event_id) {
      return {
        success: false,
        status: 400,
        message: "Missing required fields",
        data: null,
      };
    }

    const sheets = await getSheetsClient();

    const range = "event_member!A:E";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];
    const [header, ...dataRows] = rows;

    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => (obj[key] = row[i] || ""));
      return obj;
    });

    // Duplicate check
    const exists = data.find(
      (d) => d.email === email && d.event_id === event_id
    );

    if (exists) {
      return {
        success: false,
        status: 409,
        message: "User already registered for this event",
        data: exists,
      };
    }

    // Insert row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[id, name, email, event_id, created_at]],
      },
    });

    return {
      success: true,
      status: 201,
      message: "Registered successfully",
      data: { id, name, email, event_id, created_at },
    };
  } catch (error) {
    console.error("addEventMember error:", error);

    return {
      success: false,
      status: 500,
      message: "Failed to insert event_member",
      data: null,
    };
  }
}
