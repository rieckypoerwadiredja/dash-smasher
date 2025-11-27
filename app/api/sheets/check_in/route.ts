/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookById, updateBookById } from "@/app/services/books.service";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;

    if (!id) throw new Error("ID is required");

    const getBook = await getBookById(id);
    if (!getBook) throw new Error("Booking not found");

    if (getBook.check_in) throw new Error("QR code has already been used");

    const result = await updateBookById(id, updateFields);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("PUT /books error:", error);

    return NextResponse.json(
      { success: false, message: error.message || "Failed to update booking" },
      { status: 400 }
    );
  }
}
