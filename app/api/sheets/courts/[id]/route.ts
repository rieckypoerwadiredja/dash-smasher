import { NextResponse } from "next/server";
import { getCourtById } from "@/app/services/court.service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    const result = await getCourtById(id);

    //  error
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: result.status }
      );
    }

    // Success
    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (err) {
    console.error("API /courts/[id] error:", err);

    return NextResponse.json(
      { error: "Failed to fetch court data" },
      { status: 500 }
    );
  }
}
