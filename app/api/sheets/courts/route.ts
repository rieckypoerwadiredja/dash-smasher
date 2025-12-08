import { getCourts } from "@/app/services/court.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const adminEmail = url.searchParams.get("admin") ?? undefined;
    const result = await getCourts(adminEmail);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { success: true, data: result.data, message: result.message },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /courts error:", err);

    return NextResponse.json(
      { success: false, message: "Failed to fetch courts" },
      { status: 500 }
    );
  }
}
