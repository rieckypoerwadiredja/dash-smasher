import { getBookByCourtId } from "@/app/services/books.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const booking = await getBookByCourtId(id);
    console.log(booking);
    return NextResponse.json({
      data: booking,
    });
  } catch (err) {
    console.error("GET /api/sheets/books/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
