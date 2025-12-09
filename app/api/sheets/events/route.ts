import { getEvents } from "@/app/services/event.service";
import { APIResponse } from "@/app/types/apiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result: APIResponse= await getEvents();

    return NextResponse.json(result, { status: result.status });
  } catch (err:any) {
    console.error("GET /events error:", err);

    const res:APIResponse = {
      success: false,
      status: 500,
      message: err.message || "Failed to fetch events",
      data: null,
    };

    return NextResponse.json(res, { status: res.status });
  }
}
