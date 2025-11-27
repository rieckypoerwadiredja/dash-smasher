import { Book } from "../(fullscreen)/courts/[id]/page";
import { getSheetsClient } from "../utils/sheets";

const spreadsheetId = process.env.SPREADSHEET_ID!;

export async function getBooks(email?: string) {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:L",
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
      total_price: row[9],
      payment_type: row[10],
      check_in: row[11],
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

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:L",
    });

    const rows = response.data.values || [];
    if (!rows.length) return null;

    const row = rows.find((r) => r[0] === id); // kolom A = id
    if (!row) return null;

    const book: Book = {
      id: row[0],
      court_id: row[1],
      court_number: row[2],
      user: row[3],
      email: row[4],
      start_time: row[5],
      end_time: row[6],
      date: row[7],
      status: row[8],
      total_price: row[9],
      payment_type: row[10],
      check_in: row[11]?.toUpperCase() === "TRUE",
    };

    return book;
  } catch (err) {
    console.error("getBookById error:", err);
    return null;
  }
}

export async function updateBookById(id: string, newData: Partial<Book>) {
  try {
    const sheets = await getSheetsClient();

    // Get all Books
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:L",
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No data found",
        data: null,
      };
    }

    // Find book by id
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return {
        success: false,
        status: 404,
        message: "Booking not found",
        data: null,
      };
    }

    const oldRow = rows[rowIndex];

    // convert row to object
    const oldData: Book = {
      id: oldRow[0],
      court_id: oldRow[1],
      court_number: oldRow[2],
      user: oldRow[3],
      email: oldRow[4],
      start_time: oldRow[5],
      end_time: oldRow[6],
      date: oldRow[7],
      status: oldRow[8],
      total_price: oldRow[9],
      payment_type: oldRow[10],
      check_in: oldRow[11],
    };

    // merge with new data
    const updated: Book = {
      ...oldData,
      ...newData, //  overwrite field from user
    };

    // Update row to Google Sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `books!A${rowIndex + 1}:L${rowIndex + 1}`, // row number (1-based)
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            updated.id,
            updated.court_id,
            updated.court_number,
            updated.user,
            updated.email,
            updated.start_time,
            updated.end_time,
            updated.date,
            updated.status,
            updated.total_price,
            updated.payment_type,
            updated.check_in,
          ],
        ],
      },
    });

    return {
      success: true,
      status: 200,
      message: "Booking updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("updateBookById error:", error);

    return {
      success: false,
      status: 500,
      message: "Failed to update booking",
      data: null,
    };
  }
}

export async function addBook(data: Book) {
  try {
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "books!A:L",
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
            data.total_price,
            data.payment_type,
            data.check_in,
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
