import { getAllCourts } from "@/app/services/court.service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getAllCourts();

  if (!result.success) {
    return NextResponse.json(
      { error: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { data: result.data, message: result.message },
    { status: 200 }
  );
}
