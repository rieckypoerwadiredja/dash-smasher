import { Book } from "../(fullscreen)/courts/[id]/page";
import { getSheetsClient } from "../utils/sheets";

const spreadsheetId = process.env.SPREADSHEET_ID!;

export async function getBooks(email?: string) {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:I",
    });

    let rows = response.data.values || [];

    if (rows.length === 0) {
      return {
        success: true,
        status: 200,
        message: "No books found",
        data: [],
      };
    }

    // filter by email
    if (email) {
      rows = rows.filter((r) => r[4] === email);
    }

    const data: Book[] = rows.map((row) => ({
      id: row[0],
      court_id: row[1],
      court_number: row[2],
      user: row[3],
      email: row[4],
      start_time: row[5],
      end_time: row[6],
      date: row[7],
      status: row[8],
    }));

    return {
      success: true,
      status: 200,
      message: "Books fetched successfully",
      data,
    };
  } catch (error) {
    console.error("getBooks error:", error);

    return {
      success: false,
      status: 500,
      message: "Failed to fetch books",
      data: null,
    };
  }
}

export async function addBook(data: Book) {
  try {
    const sheets = await getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "books!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.id,
            data.court_id,
            data.court_number,
            data.user,
            data.email,
            data.start_time,
            data.end_time,
            data.date,
            data.status,
          ],
        ],
      },
    });

    return {
      success: true,
      status: 201,
      message: "Book added successfully",
      data,
    };
  } catch (error) {
    console.error("addBook error:", error);

    return {
      success: false,
      status: 500,
      message: "Failed to add book",
      data: null,
    };
  }
}
