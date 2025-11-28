/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBookById, updateBookById } from "@/app/services/books.service";
import { formatDateTime, parseDMY } from "@/app/utils/date";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;

    if (!id) throw new Error("ID is required");

    const getBook = await getBookById(id);
    if (!getBook) throw new Error("Booking not found");

    if (getBook.status === "-" || getBook.payment_type === "-")
      throw new Error("QR code has not valid payment");

    // Already checked in
    if (getBook.check_in) throw new Error("QR code has already been used");

    const now = new Date();
    const bookingDate = parseDMY(getBook.date);

    // Compare only date
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bookDay = new Date(
      bookingDate.getFullYear(),
      bookingDate.getMonth(),
      bookingDate.getDate()
    );

    // DATE CHECKS
    if (bookDay > today) {
      throw new Error(
        "This booking is not valid yet. The date has not arrived."
      );
    }

    if (bookDay < today) {
      throw new Error("This booking is already expired.");
    }

    // TIME PARSE
    const [startHour, startMinute] = getBook.start_time.split(":").map(Number);
    const [endHour, endMinute] = getBook.end_time.split(":").map(Number);

    const startTime = new Date(bookingDate);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(bookingDate);
    endTime.setHours(endHour, endMinute, 0, 0);

    // 10 minutes before check-in allowed
    const tenMinutesBefore = new Date(startTime.getTime() - 10 * 60 * 1000);

    if (now < tenMinutesBefore) {
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

    // Still early (between 10 mins before & start)
    if (now < startTime) {
      throw new Error(
        `You can check in starting at ${tenMinutesBefore.toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}.`
      );
    }

    // Cannot check-in when less than 15 mins left before end
    const fifteenMinutesBeforeEnd = new Date(
      endTime.getTime() - 15 * 60 * 1000
    );

    if (now > fifteenMinutesBeforeEnd) {
      throw new Error(
        "Check-in is not allowed because less than 15 minutes remain before the session ends."
      );
    }

    const check_in_at = formatDateTime();
    const updatedPayload = {
      ...updateFields,
      check_in_at,
    };

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
