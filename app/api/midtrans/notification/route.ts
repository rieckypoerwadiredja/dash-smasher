import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";

export async function POST(req: Request) {
  try {
    const notificationJson = await req.json();

    console.log("📩 MIDTRANS CALLBACK:", notificationJson);

    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    });

    let statusResponse;

    try {
      statusResponse = await core.transaction.notification(notificationJson);
      const orderId = statusResponse.order_id;
      const transactionStatus = statusResponse.transaction_status;
      const fraudStatus = statusResponse.fraud_status;

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      // Sample transactionStatus handling logic
      const statusUpdate = await fetch(`${API_BASE_URL}/api/sheets/books`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: notificationJson.order_id,
          status: notificationJson.transaction_status,
          payment_type: notificationJson.payment_type,
        }),
      });
      console.log(statusUpdate);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Midtrans Notification Error:", err);
      return NextResponse.json(
        { success: false, message: "Invalid transaction" },
        { status: 200 } // selalu 200 biar Midtrans tidak retry
      );
    }

    const { order_id, transaction_status, fraud_status } = statusResponse;

    console.log("🔍 Parsed Status:", {
      order_id,
      transaction_status,
      fraud_status,
    });

    //  UPDATE BOOK
    await updateBookingStatus(order_id, transaction_status);

    return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
  } catch (error) {
    console.error("Webhook ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Webhook processing failed" },
      { status: 200 } // tetap return 200 supaya Midtrans tidak spam retry
    );
  }
}

async function updateBookingStatus(orderId: string, status: string) {
  console.log("UPDATE BOOKING:", orderId, "->", status);
}
