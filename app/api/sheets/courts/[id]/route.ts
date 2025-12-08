import { NextResponse } from "next/server";
import { getCourt } from "@/app/services/court.service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    const result = await getCourt(id);

    //  error
    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    // Success
    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (err) {
    console.error("API /courts/[id] error:", err);

    return NextResponse.json(
      { message: "Failed to fetch court data" },
      { status: 500 }
    );
  }
}
