import { APIError, APIResponse } from "../types/apiResponse";
import { getSheetsClient } from "../utils/sheets";
const spreadsheetId = process.env.SPREADSHEET_ID;

export async function getEvents(): Promise<APIResponse> {
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
        message: "No events found",
        data: null,
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

    return {
      success: true,
      status: 200,
      message: "Events fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export async function getEvent(id: string): Promise<APIResponse> {
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
        success: false,
        status: 404,
        message: "Event not found",
        data: null,
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
    const found = data.find((e) => e.id === id);

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
      message: "Event fetched successfully",
      data: found,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}
