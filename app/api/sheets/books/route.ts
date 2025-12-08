import { Book } from "@/app/components/fragments/DetailCourtClientWrapper";
import {
  addBook,
  getBooks,
  updateBookById,
} from "@/app/services/books.service";
import { NextResponse } from "next/server";

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
      total_price,
      payment_type,
      check_in,
    } = body;
    // validation
    if (
      !id ||
      !court_id ||
      !court_number ||
      !user ||
      !email ||
      !start_time ||
      !end_time ||
      !date ||
      !status ||
      !total_price ||
      !payment_type ||
      check_in === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const result = await addBook(body as Book);

    return NextResponse.json(result, { status: result.status });
  } catch (err) {
    console.error("POST /books error:", err);

    return NextResponse.json(
      { success: false, message: "Failed to add booking" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // update service
    const result = await updateBookById(id, updateFields);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("PUT /books error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email") ?? undefined;
    const courtIDsParam = url.searchParams.get("courtIDs") ?? "";
    const courtIDs = courtIDsParam.split(",");

    const result = await getBooks(email, courtIDs);

    return NextResponse.json(result, { status: result.status });
  } catch (err) {
    console.error("GET /books error:", err);

    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
