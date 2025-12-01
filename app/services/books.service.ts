import { Book } from "../components/fragments/DetailCourtClientWrapper";
import { formatDateTime } from "../utils/date";
import { getSheetsClient } from "../utils/sheets";

const spreadsheetId = process.env.SPREADSHEET_ID!;

export async function getBooks(email?: string) {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:O",
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
      check_in: row[11] === "TRUE" ? true : false,
      created_at: row[12],
      updated_at: row[13],
      check_in_at: row[14],
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

export async function getBookByCourtId(id: string): Promise<Book[]> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:O",
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    // FILTER RAW BY COURT ID
    const filtered = rows.filter((r) => r[1] === id);
    if (filtered.length === 0) return [];

    // FILTER VALID BOOKING
    const valid = filtered.filter((row) => {
      const status = (row[8] || "").toLowerCase();
      const payment = row[10] || "";

      // status invalid
      if (
        status === "-" ||
        status === "cancel" ||
        status === "deny" ||
        status === "expire"
      ) {
        return false;
      }

      // payment invalid
      if (payment === "-") {
        return false;
      }

      return true;
    });

    if (valid.length === 0) return [];

    // MAP → convert row ke Book
    const books: Book[] = valid.map((row) => ({
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
      created_at: row[12],
      updated_at: row[13],
      check_in_at: row[14],
    }));

    return books;
  } catch (err) {
    console.error("getBookByCourtId error:", err);
    return [];
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "books!A:O",
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
      created_at: row[12],
      updated_at: row[13],
      check_in_at: row[14],
    };
    console.log(book);
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
      range: "books!A:O",
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
      created_at: oldRow[12],
      updated_at: oldRow[13],
      check_in_at: oldRow[14],
    };
    const updated_at = formatDateTime();

    // merge with new data
    const updated: Book = {
      ...oldData,
      ...newData, //  overwrite field from user
      updated_at: updated_at,
    };

    // Update row to Google Sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `books!A${rowIndex + 1}:O${rowIndex + 1}`, // row number (1-based)
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
            updated.created_at,
            updated.updated_at,
            updated.check_in_at,
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

    const [day, month, year] = data.date.split("-").map(Number);
    const formattedDate = `${String(day).padStart(2, "0")}-${String(
      month
    ).padStart(2, "0")}-${year}`;
    const created_at = formatDateTime();
    const updated_at = "-";
    const check_in_at = "-";

    const payload = {
      ...data,
      date: formattedDate,
      created_at,
      updated_at,
      check_in_at,
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "books!A:O",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            payload.id,
            payload.court_id,
            payload.court_number,
            payload.user,
            payload.email,
            payload.start_time,
            payload.end_time,
            payload.date,
            payload.status,
            payload.total_price,
            payload.payment_type,
            payload.check_in,
            payload.created_at,
            payload.updated_at,
            payload.check_in_at,
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
