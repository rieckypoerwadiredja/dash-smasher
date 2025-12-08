/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBookById, updateBookById } from "@/app/services/books.service";
import { formatDateTime, formatToWIB } from "@/app/utils/date";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, clientTime, timezone, ...updateFields } = body;

    if (!id) throw new Error("ID is required");

    const booking = await getBookById(id);
    if (!booking) throw new Error("Booking not found");

    // INVALID PAYMENT OR STATUS
    const invalidStatus = ["-", "cancel", "deny", "expire", "pending"];
    if (
      invalidStatus.includes(booking.status) ||
      booking.payment_type === "-"
    ) {
      throw new Error("QR code has not valid payment");
    }

    // Already used
    if (booking.check_in) throw new Error("QR code has already been used");

    if (!clientTime) throw new Error("Client time is required");

    // GET USER TIMEZONE (fallback: UTC)
    const userTZ = timezone || "UTC"; // kamu dapat timezone dari FE (Intl.DateTimeFormat().resolvedOptions().timeZone)

    // Convert client time → WIB
    const userDate = new Date(clientTime);
    const nowWIB = formatToWIB(userDate, userTZ); // fungsi helper

    // Parse booking date (D-M-Y)
    const [day, month, year] = booking.date.split("-").map(Number);
    const bookingDate = new Date(year, month - 1, day);

    // Normalize to WIB (compare date only)
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

    // DATE VALIDATION
    if (bookDayWIB > todayWIB)
      throw new Error(
        "This booking is not valid yet. The date has not arrived."
      );

    if (bookDayWIB < todayWIB)
      throw new Error("This booking is already expired.");

    // TIME WINDOW VALIDATION
    const [startHour, startMinute] = booking.start_time.split(":").map(Number);
    const [endHour, endMinute] = booking.end_time.split(":").map(Number);

    const startTime = new Date(bookDayWIB);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(bookDayWIB);
    endTime.setHours(endHour, endMinute, 0, 0);

    const tenMinutesBefore = new Date(startTime.getTime() - 10 * 60000);
    const fifteenMinutesBeforeEnd = new Date(endTime.getTime() - 15 * 60000);

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

    // FINAL UPDATE
    const check_in_at = formatDateTime(); // already WIB
    const payload = { ...updateFields, check_in_at };

    const result = await updateBookById(id, payload);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("PUT /books error:", error);

    return NextResponse.json(
      { success: false, message: error.message || "Failed to update booking" },
      { status: 400 }
    );
  }
}
