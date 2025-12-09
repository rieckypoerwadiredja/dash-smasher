import { Book } from "@/app/components/fragments/DetailCourtClientWrapper";
import {
  addBook,
  getBooks,
  updateBookById,
} from "@/app/services/books.service";
import {  APIResponse } from "@/app/types/apiResponse";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Book>;

    const result: APIResponse = await addBook(body as Book);

    return NextResponse.json(result, { status: result.status });
  } catch (err) {
    console.error("POST /books error:", err);

  const res:APIResponse = {
      success: false,
      message: "Failed to add booking",
      status: 500,
      data: null,
    };

    return NextResponse.json(
      res,
      { status: res.status }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, ...updateFields } = body;

    if (!id) {
      const res: APIResponse = {
        success: false,
        message: "ID is required",
        status: 400,
        data: null,     
      };
      return NextResponse.json(
        res,
        { status: res.status }
      );
    }

    // update service
    const result: APIResponse = await updateBookById(id, updateFields);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("PUT /books error:", error);

    const res: APIResponse = {
      success: false,
      message: "Failed to update booking",
      status: 500,
      data: null,
    };
    return NextResponse.json(
      res,
      { status: res.status }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email") ?? undefined;
    const courtIDsParam = url.searchParams.get("courtIDs") ?? "";
    const courtIDs = courtIDsParam.split(",");

    const result: APIResponse = await getBooks(email, courtIDs);

    return NextResponse.json(result, { status: result.status });
  } catch (err) {
    console.error("GET /books error:", err);

    const res: APIResponse = {
      success: false,
      message: "Failed to fetch bookings",
      status: 500,
      data: null,
    };
    return NextResponse.json(
      res,
      { status: res.status }
    );
  }
}
