// /services/books.service.ts
import { Book } from "../(fullscreen)/courts/[id]/page";
import { getSheetsClient } from "../utils/sheets";

const spreadsheetId = process.env.SPREADSHEET_ID!;

// Fetch buku (filter email optional)
export async function getBooks(email?: string) {
  const sheets = await getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "books!A:I",
  });

  let rows = response.data.values || [];

  if (email) {
    rows = rows.filter((r) => r[4] === email);
  }

  return rows.map((row) => ({
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
}

// Insert data baru
export async function addBook(data: Book) {
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

  return true;
}
