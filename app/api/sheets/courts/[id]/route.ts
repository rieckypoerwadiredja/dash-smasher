import { NextResponse } from "next/server";
import { getCourt } from "@/app/services/court.service";
import { APIResponse } from "@/app/types/apiResponse";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    const result:APIResponse = await getCourt(id);

    return NextResponse.json(result, { status: result.status });
  } catch (err:any) {
    console.error("API /courts/[id] error:", err);

    const res:APIResponse = {
      success: false,
      status: 500,
      message: err.message || "Failed to fetch court data",
      data: null,
    };
    return NextResponse.json(res, { status: res.status });
  }
}
