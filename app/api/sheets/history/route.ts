import { NextResponse } from "next/server";
import { getHistory } from "@/app/services/history.service";
import { APIResponse } from "@/app/types/apiResponse";
import { Book } from "@/app/components/fragments/DetailCourtClientWrapper";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") || undefined;
    const limit = url.searchParams.get("limit") || undefined;

    const history: APIResponse = await getHistory(email, limit);
    // !status "-" && payment_type = "-" NOT VALID
    if (history.success) {
      if (history.data?.books) {
        history.data.books = history.data.books.filter(
          (book: Book) => book.status !== "-" || book.payment_type !== "-"
        );
      }
    }
    // TODO KSH KALSIFIKASI STATUS ACTIVE, BOOK HISTORY BOOK, HISTORY EVENT, PENDING BOOK, CHECKIN STATUS,
    // BERDASARKAN START TIME, END TIME, TGL, PAYMENT STATUS

    return NextResponse.json(history, {
      status: history.status,
    });
  } catch (error:any) {
    console.error(error);
    const errorResponse: APIResponse = {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
    return NextResponse.json(errorResponse, { status: errorResponse.status });
  }
}
