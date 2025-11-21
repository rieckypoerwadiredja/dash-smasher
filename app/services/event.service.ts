// app/services/event.service.ts

import { getSheetsClient } from "../utils/sheets";
const spreadsheetId = process.env.SPREADSHEET_ID;

export async function getEvents(id?: string) {
  try {
    const sheets = await getSheetsClient();

    const range = "events!A:I";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];

    if (rows.length === 0) {
      return {
        success: true,
        status: 200,
        data: [],
      };
    }

    const [header, ...dataRows] = rows;

    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });

    // ===== Optional filter by ID =====
    if (id) {
      const found = data.find((item) => item.id === id);

      if (!found) {
        return {
          success: false,
          status: 404,
          message: "Event not found",
          data: null,
        };
      }

      return {
        success: true,
        status: 200,
        data: found,
      };
    }

    return {
      success: true,
      status: 200,
      data,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error while fetching events",
      data: null,
    };
  }
}
