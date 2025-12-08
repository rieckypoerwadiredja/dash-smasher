import { getBookByCourtId } from "@/app/services/books.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    const status = url.searchParams.get("paymentStatus");
    const paymentType = url.searchParams.get("paymentType");
    const adminParams = url.searchParams.get("admins");
    const admins = adminParams ? adminParams.split(",") : undefined;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const paymentStatus = status
      ? status.split(",").map((s) => s.trim())
      : undefined;

    const booking = await getBookByCourtId(
      id,
      paymentStatus,
      paymentType,
      admins
    );

    return NextResponse.json(booking);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("GET /api/sheets/books/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message, status: 500 },
      { status: 500 }
    );
  }
}
