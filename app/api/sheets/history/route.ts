import { NextResponse } from "next/server";
import { getHistory } from "@/app/services/history.service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") || undefined;
    const limit = url.searchParams.get("limit") || undefined;

    const history = await getHistory(email, limit);
    // !status "-" && payment_type = "-" NOT VALID
    if (history.data?.books) {
      history.data.books = history.data.books.filter(
        (book) => book.status !== "-" && book.payment_type !== "-"
      );
    }

    return NextResponse.json(history, {
      status: history.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, status: 500, message: "Internal error", data: null },
      { status: 500 }
    );
  }
}
