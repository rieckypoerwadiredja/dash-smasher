import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // VALIDATION: Pastikan server key ada
    if (!process.env.MIDTRANS_SERVER_KEY) {
      return NextResponse.json(
        { error: "Missing Midtrans SERVER_KEY" },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    }
    // console.log(body);
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: body.id,
        gross_amount: body.total_price,
      },
      customer_details: {
        name: body.user,
        email: body.email,
        court_id: body.court_id,
        court_number: body.court_number,
        start_time: body.start_time,
        end_time: body.end_time,
        date: body.date,
        total_price: body.total_price,
      },
      page_expiry: {
        duration: 1,
        unit: "hours",
      },
      expiry: {
        unit: "hours",
        duration: 1,
      },
    };

    // === CREATE TRANSACTION ===
    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json(
      {
        message: "Snap token created successfully",
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Midtrans error:", err);

    // Midtrans wrong server key → unauthorized
    if (err.message?.includes("Access denied")) {
      return NextResponse.json(
        { error: "Access denied, please check server key" },
        { status: 401 }
      );
    }

    // Midtrans wrong parameters (4xx)
    if (err.ApiResponse) {
      return NextResponse.json(
        {
          error:
            err.ApiResponse.error_messages?.[0] || "Midtrans parameter error",
        },
        { status: 400 }
      );
    }

    // Fallback 500
    return NextResponse.json(
      { error: "Midtrans internal error. Please try again later." },
      { status: 500 }
    );
  }
}
