import { getSheetsClient } from "../utils/sheets";

const spreadsheetId = process.env.SPREADSHEET_ID!;

export async function getCourt(id: string) {
  try {
    if (!id) {
      return {
        status: 400,
        message: "Missing id parameter",
        data: null,
      };
    }

    const sheets = await getSheetsClient();

    const range = "courts!A:L";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];
    const [header, ...dataRows] = rows;

    // mapping hasil sheet ke object
    const data = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });

    // cari sesuai id
    const found = data.find((row) => row.id === id);

    if (!found) {
      return {
        status: 404,
        message: "No court data found, check your court id",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Success",
      data: found,
    };
  } catch (error) {
    console.error("getCourtById error:", error);

    return {
      success: false,
      status: 500,
      message: "Failed to fetch court data",
      data: null,
    };
  }
}

export async function getCourts(adminEmail: string | undefined) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID!;

    const range = "courts!A:M";

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];
    const [header, ...dataRows] = rows;

    let filteredRows = dataRows;

    if (adminEmail) {
      filteredRows = dataRows.filter((r) => {
        const admins = r[12] ? r[12].split(",") : [];
        return admins.includes(adminEmail);
      });
    }

    if (filteredRows.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No court data found",
        data: null,
      };
    }

    const data = filteredRows.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });

    return {
      success: true,
      status: 200,
      message: "Courts fetched successfully",
      data,
    };
  } catch (err) {
    console.error("Error getAllCourts:", err);

    return {
      success: false,
      status: 500,
      message: "Failed to fetch courts",
      data: null,
    };
  }
}
