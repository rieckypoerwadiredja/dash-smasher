/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBookById, updateBookById } from "@/app/services/books.service";
import { formatDateTime } from "@/app/utils/date";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, clientTime, ...updateFields } = body;

    if (!id) throw new Error("ID is required");

    const getBook = await getBookById(id);
    if (!getBook) throw new Error("Booking not found");

    if (
      getBook.status === "-" ||
      getBook.status === "cancel" ||
      getBook.status === "deny" ||
      getBook.status === "expire" ||
      getBook.payment_type === "-"
    )
      throw new Error("QR code has not valid payment");

    // Already checked in
    if (getBook.check_in) throw new Error("QR code has already been used");

    if (!clientTime) throw new Error("Client time is required for check-in");

    // Waktu client → WIB
    const nowWIB = new Date(
      new Date(clientTime).getTime() + 7 * 60 * 60 * 1000
    );

    // Booking date (as WIB)
    const [day, month, year] = getBook.date.split("-").map(Number);
    const bookingDate = new Date(year, month - 1, day);

    const todayWIB = new Date(
      nowWIB.getFullYear(),
      nowWIB.getMonth(),
      nowWIB.getDate()
    );

    const bookDayWIB = new Date(
      bookingDate.getFullYear(),
      bookingDate.getMonth(),
      bookingDate.getDate()
    );

    // DATE CHECKS
    if (bookDayWIB > todayWIB)
      throw new Error(
        "This booking is not valid yet. The date has not arrived."
      );

    if (bookDayWIB < todayWIB)
      throw new Error("This booking is already expired.");

    // TIME PARSE (WIB)
    const [startHour, startMinute] = getBook.start_time.split(":").map(Number);
    const [endHour, endMinute] = getBook.end_time.split(":").map(Number);

    const startTimeWIB = new Date(bookDayWIB);
    startTimeWIB.setHours(startHour, startMinute, 0, 0);

    const endTimeWIB = new Date(bookDayWIB);
    endTimeWIB.setHours(endHour, endMinute, 0, 0);

    // Allowed check-in time windows
    const tenMinutesBefore = new Date(startTimeWIB.getTime() - 10 * 60 * 1000);
    const fifteenMinutesBeforeEnd = new Date(
      endTimeWIB.getTime() - 15 * 60 * 1000
    );

    if (nowWIB < tenMinutesBefore) {
      throw new Error(
        `You cannot check in yet. Please wait until ${tenMinutesBefore.toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}.`
      );
    }

    if (nowWIB > fifteenMinutesBeforeEnd) {
      throw new Error(
        "Check-in is not allowed because less than 15 minutes remain before the session ends."
      );
    }

    const check_in_at = formatDateTime(); // already WIB
    const updatedPayload = { ...updateFields, check_in_at };

    const result = await updateBookById(id, updatedPayload);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("PUT /books error:", error);

    return NextResponse.json(
      { success: false, message: error.message || "Failed to update booking" },
      { status: 400 }
    );
  }
}
