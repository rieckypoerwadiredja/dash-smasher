import { getBookByCourtId } from "@/app/services/books.service";
import { APIError, APIResponse } from "@/app/types/apiResponse";
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

    const paymentStatus = status
      ? status.split(",").map((s) => s.trim())
      : undefined;

    const booking: APIResponse = await getBookByCourtId(
      id,
      paymentStatus,
      paymentType,
      admins
    );

    return NextResponse.json(booking, { status: booking.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("GET /api/sheets/books/[id] error:", err);
    const res: APIError = {
      success: false,
      message: err.message || "Internal Server Error",
      status: 500,
    };

    return NextResponse.json(res, { status: res.status });
  }
}
