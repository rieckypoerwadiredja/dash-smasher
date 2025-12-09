import { getCourts } from "@/app/services/court.service";
import { APIResponse } from "@/app/types/apiResponse";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const adminEmail = url.searchParams.get("admin") ?? undefined;
    const result:APIResponse = await getCourts(adminEmail);

    return NextResponse.json(result, { status: result.status });
  } catch (err:any) {
    console.error("GET /courts error:", err);

    const res:APIResponse = {
      success: false,
      status: 500,
      message: err.message || "Failed to fetch courts",
      data: null,
    };

    return NextResponse.json(res, { status: res.status });
  }
}
