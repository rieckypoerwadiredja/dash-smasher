import { Court } from "@/app/(main)/courts/page";
import { Book } from "@/app/components/fragments/DetailCourtClientWrapper";

import { FaCalendarAlt, FaClock, FaHourglassStart } from "react-icons/fa";
import { formatPrice } from "../currency";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { IoAlertCircle } from "react-icons/io5";

// -------------------
// OWNER
// -------------------
export function mapBookingsToMetricsOwner(books: Book[]) {
  const totalBookings = books.length;

  const revenueCollected = books
    .filter((b) => b.status === "settlement")
    .reduce((s, b) => s + Number(b.total_price || 0), 0);

  const pendingPayments = books.filter((b) => b.status === "pending").length;

  const expirePayments = books.filter((b) => b.status === "expire").length;

  const checkIns = books.filter((b) => b.check_in).length;

  const metrics = [
    {
      key: "totalBookings",
      title: "Total Bookings",
      value: String(totalBookings),
      icon: <FaCalendarAlt className="text-info text-2xl" />,
      badge: false,
    },
    {
      key: "revenueCollected",
      title: "Revenue Collected",
      value: `${formatPrice(Number(revenueCollected), {
        currency: "Rp. ",
        decimalPlaces: 0,
        shorthand: true,
      })}`,
      icon: <AiFillDollarCircle className="text-success text-2xl" />,
      badge: false,
    },
    {
      key: "pendingPayments",
      title: "Pending Payments",
      value: String(pendingPayments),
      icon: <FaClock className="text-warn text-2xl" />,
      badge: false,
    },
    {
      key: "checkIns",
      title: "Check-Ins",
      value: String(checkIns),
      icon: <FaCircleCheck className="text-success text-2xl" />,
      badge: false,
    },

    {
      key: "expirePayment",
      title: "Expire Payments",
      value: String(expirePayments),
      icon: <IoAlertCircle className="text-failed text-2xl" />,
      badge: false,
    },
  ];

  return metrics;
}

export const mapBooksToRecentOrders = (books: Book[]) => {
  return books
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 10)
    .map((b) => ({
      id: b.id,
      court: b.court_number,
      price: formatPrice(Number(b.total_price), {
        currency: "Rp. ",
        decimalPlaces: 0,
        shorthand: true,
      }),
      status: b.status,
      payment: b.payment_type,
    }));
};

export const mapBooksToRevenueChart = (books: Book[]) => {
  // Grup revenue berdasarkan tanggal
  const grouped: Record<string, number> = {};

  books.forEach((b) => {
    if (b.status === "settlement") {
      const total = Number(b.total_price) || 0;
      if (!grouped[b.date]) grouped[b.date] = 0;
      grouped[b.date] += total;
    }
  });

  // categories = tanggal
  const categories = Object.keys(grouped);
  // series = total revenue per tanggal
  const series = Object.values(grouped);

  return { categories, series };
};

export const mapBooksToPieChart = (books: Book[]) => {
  const grouped: Record<string, number> = {};

  books.forEach((b) => {
    if (!grouped[b.status]) grouped[b.status] = 0;
    grouped[b.status]++;
  });

  return {
    labels: Object.keys(grouped), // example: ["settlement","pending","cancel"]
    series: Object.values(grouped),
  };
};

export interface AlertItem {
  id: string;
  message: string;
  _ts: number;
}

export const mapBooksToAlerts = (books: Book[]) => {
  const alerts: AlertItem[] = [];

  books.forEach((b) => {
    // Pending
    if (b.status === "pending") {
      alerts.push({
        id: b.id,
        message: `Pending payment for Court ${b.court_number}`,
        _ts: new Date(b.updated_at || b.created_at).getTime(),
      });
    }

    // Settlement but not check-in
    if (!b.check_in && b.status === "settlement") {
      alerts.push({
        id: b.id,
        message: `Possible late check-in for Court ${b.court_number}`,
        _ts: new Date(b.check_in_at || b.updated_at || b.created_at).getTime(),
      });
    }
  });

  // Sort newest → oldest
  alerts.sort((a, b) => b._ts - a._ts);

  // Remove temp _ts before returning
  return alerts.slice(0, 10).map(({ ...rest }) => rest);
};

export function mapBooksToHeatmap(books: Book[], courts: Court[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 1. Cari jam buka paling kecil & tutup paling besar dari semua court
  const earliestOpen = Math.min(
    ...courts.map((c) => Number(c.open_time.split(":")[0]))
  );

  const latestClose = Math.max(
    ...courts.map((c) => Number(c.close_time.split(":")[0]))
  );

  // 2. Generate slot 3 jam
  function generateTimeSlots(open: number, close: number) {
    const slots: string[] = [];

    for (let h = open; h < close; h += 3) {
      const start = h;
      const end = Math.min(h + 3, close);
      slots.push(`${start}:00-${end}:00`);
    }

    return slots;
  }

  const slots = generateTimeSlots(earliestOpen, latestClose);

  // 3. Base heatmap rows sesuai jumlah slot
  const heatmap = days.map((day) => ({
    day,
    values: Array(slots.length).fill(0),
  }));

  // 4. Isi heatmap berdasarkan bookings
  books.forEach((b) => {
    if (!b.date || !b.start_time) return;

    const d = new Date(b.date);
    const dayIndex = d.getDay();
    const hour = Number(b.start_time.split(":")[0]);

    const slotIndex = slots.findIndex((s) => {
      const [sH, eH] = s.split("-");
      const sh = Number(sH.split(":")[0]);
      const eh = Number(eH.split(":")[0]);
      return hour >= sh && hour < eh;
    });

    if (slotIndex !== -1) {
      heatmap[dayIndex].values[slotIndex] += 1;
    }
  });

  return { heatmap, slots };
}

// ------------
// ADMIN
// ------------

export function mapBookingsToMetricsAdmin(todayBookings: Book[]) {
  const totalBookings = todayBookings.length;
  const checkIns = todayBookings.filter((b) => b.check_in).length;
  const pendingCheckIn = todayBookings.filter((b) => !b.check_in).length;
  const expireCheckIn = todayBookings.filter(
    (b) => b.status === "expire"
  ).length;

  const metrics = [
    {
      key: "totalBookings",
      title: "Total Booking Today",
      value: String(totalBookings),
      icon: <FaCalendarAlt className="text-info text-2xl" />,
      badge: false,
    },
    {
      key: "courtInUse",
      title: "Court in Use",
      value: String(checkIns),
      icon: <FaHourglassStart className="text-warn text-2xl" />,
      badge: false,
    },
    {
      key: "pendingCheckIn",
      title: "Pending Check-In",
      value: String(pendingCheckIn),
      icon: <FaCircleCheck className="text-success text-2xl" />,
      badge: false,
    },
    {
      key: "expireCheckIn",
      title: "Expire Check-In",
      value: String(expireCheckIn),
      icon: <IoAlertCircle className="text-failed text-2xl" />,
      badge: false,
    },
  ];

  return metrics;
}

export interface CourtStatus {
  courtNumber: number;
  status: string;
  user: string;
  startTime: string;
  endTime: string;
}

export function mapBookToCourtTimeline(
  courtNumber: number,
  bookings: Book[],
  now: Date,
  openTime: string,
  closeTime: string
): CourtStatus {
  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    return d;
  };

  const courtBookings = bookings
    .filter((b) => Number(b.court_number) === courtNumber)
    .sort(
      (a, b) =>
        parseTime(a.start_time).getTime() - parseTime(b.start_time).getTime()
    );

  const active = courtBookings.find((b) => {
    const start = parseTime(b.start_time);
    const end = parseTime(b.end_time);
    return now >= start && now <= end;
  });

  const upcoming = courtBookings
    .filter((b) => now < parseTime(b.start_time))
    .sort(
      (a, b) =>
        parseTime(a.start_time).getTime() - parseTime(b.start_time).getTime()
    )[0];

  let status = "Available";
  let user = "-";
  let startTime = openTime;
  let endTime = closeTime;

  if (active) {
    status = active.check_in ? "Ongoing" : "Waiting Check-In";
    user = active.user;
    startTime = active.start_time.slice(0, 5);
    endTime = active.end_time.slice(0, 5);
  } else if (upcoming) {
    status = "Upcoming";
    user = upcoming.user;
    startTime = upcoming.start_time.slice(0, 5);
    endTime = upcoming.end_time.slice(0, 5);
  }

  return { courtNumber, status, user, startTime, endTime };
}
