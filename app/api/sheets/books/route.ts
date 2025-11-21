import { Book } from "@/app/(fullscreen)/courts/[id]/page";
import { addBook, getBooks } from "@/app/services/books.service";
import { NextResponse } from "next/server";

// POST
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Book>;

    const {
      id,
      court_id,
      court_number,
      user,
      email,
      start_time,
      end_time,
      date,
      status,
    } = body;

    // Validation
    if (
      !id ||
      !court_id ||
      !court_number ||
      !user ||
      !email ||
      !start_time ||
      !end_time ||
      !date ||
      !status
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await addBook(body as Book);

    return NextResponse.json({ message: "Booking added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add booking" },
      { status: 500 }
    );
  }
}

// GET
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const emailFilter = url.searchParams.get("email") ?? undefined;

    const books = await getBooks(emailFilter);

    return NextResponse.json({ data: books });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
