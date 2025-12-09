import { NextResponse } from "next/server";
import { APIResponse, } from "@/app/types/apiResponse";
import { getEventMember, addEventMember } from "@/app/services/eventMember.service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") ?? "";

    const result: APIResponse = await getEventMember(email);

    return NextResponse.json(result, { status: result.status });
  } catch (err: any) {
    console.error("GET /api/event-member error:", err);

    const res:APIResponse = {
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
      data: null,
    };

    return NextResponse.json(res, { status: res.status });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result: APIResponse = await addEventMember(body);

    return NextResponse.json(result, { status: result.status });
  } catch (err: any) {
    console.error("POST /api/event-member error:", err);

    const res: APIResponse = {
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
      data: null,
    };

    return NextResponse.json(res, { status: res.status });
  }
}
