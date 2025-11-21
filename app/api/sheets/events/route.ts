import { getEvents } from "@/app/services/event.service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getEvents();

  if (!result.success) {
    return NextResponse.json(
      { error: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json({ data: result.data }, { status: result.status });
}
