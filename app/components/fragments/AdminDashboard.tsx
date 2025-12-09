"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AlertList from "../elements/metrics/AlertList";
import Image from "next/image";
import MetricCard from "../elements/metrics/MetricCard";
import { FaCalendarAlt, FaHourglassStart } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IMAGES } from "@/app/constants/image";
import { Book } from "./DetailCourtClientWrapper";
import { Court } from "@/app/(main)/courts/page";
import { IoAlertCircle } from "react-icons/io5";
import {
  mapBookingsToMetricsAdmin,
  mapBooksToAlerts,
  mapBookToCourtTimeline,
} from "@/app/utils/mapers/dashboardMapers";
import Button from "../elements/Button";

interface CourtTimelineProps {
  courts: number[];
  bookings: Book[];
  now: Date;
  openTime: string;
  closeTime: string;
}
function CourtTimeline({
  courts,
  bookings,
  now,
  openTime,
  closeTime,
}: CourtTimelineProps) {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + (m || 0);
  };

  const startMin = toMinutes(openTime);
  const endMin = toMinutes(closeTime);
  const totalMin = endMin - startMin;
  if (totalMin <= 0) return null;

  const TL_WIDTH = 2000;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const showLine = nowMin >= startMin && nowMin <= endMin;
  const progressPx = ((nowMin - startMin) / totalMin) * TL_WIDTH;

  // create hour labels (cells)
  const hours: number[] = [];
  for (let m = startMin; m < endMin; m += 60) hours.push(Math.floor(m / 60));

  // helper untuk menentukan warna sesuai aturan kamu
  const getColorClass = (b: Book) => {
    const sMin = toMinutes(b.start_time);
    const eMin = toMinutes(b.end_time);

    const earlyWindowStart = sMin - 15; // 15 mnt before start
    const lateWindowStart = eMin - 15; // 15 mnt before end

    // 1) session already ended
    if (nowMin > eMin) {
      return "bg-gray-600 text-white";
    }

    // 2) between earlyWindowStart .. lateWindowStart => allowed check-in window
    if (nowMin >= earlyWindowStart && nowMin <= lateWindowStart) {
      return b.check_in ? "bg-green-500 text-white" : "bg-primary text-white";
    }

    // 3) between lateWindowStart .. eMin => last-15-minutes -> no more check-in allowed
    if (nowMin > lateWindowStart && nowMin <= eMin) {
      return b.check_in ? "bg-green-500 text-white" : "bg-red-600 text-white";
    }

    // 4) before earlyWindowStart => neutral (free)
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <div style={{ width: TL_WIDTH }}>
          {/* HOURS HEADER */}
          <div className="sticky top-0 bg-white z-30 h-12 border-b">
            {hours.map((h, idx) => {
              const left = (TL_WIDTH / hours.length) * idx;
              const center = left + TL_WIDTH / hours.length / 2;
              return (
                <div key={h}>
                  <div
                    className="absolute text-xs font-semibold"
                    style={{
                      left: center,
                      transform: "translateX(-50%)",
                      top: 6,
                    }}
                  >
                    {String(h).padStart(2, "0")}:00
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-px bg-gray-300"
                    style={{ left }}
                  />
                </div>
              );
            })}
          </div>

          {/* TIMELINE */}
          <div className="relative" style={{ height: courts.length * 60 }}>
            {showLine && (
              <div
                className="absolute top-0 bottom-0 w-0.5 z-20"
                style={{ left: progressPx, background: "var(--color-failed)" }}
              />
            )}

            <div className="flex flex-col gap-6">
              {courts.map((courtNum) => {
                const courtBookings = bookings
                  .filter((b) => Number(b.court_number) === courtNum)
                  .sort(
                    (a, b) => toMinutes(a.start_time) - toMinutes(b.start_time)
                  );

                return (
                  <div key={courtNum}>
                    <p className="text-sm font-semibold mb-1">
                      Court {courtNum}
                    </p>

                    <div className="relative h-10 rounded bg-gray-100">
                      {courtBookings.map((b, i) => {
                        const sMin = toMinutes(b.start_time);
                        const eMin = toMinutes(b.end_time);

                        const leftPx =
                          ((sMin - startMin) / totalMin) * TL_WIDTH;
                        const widthPx = ((eMin - sMin) / totalMin) * TL_WIDTH;

                        const colorClass = getColorClass(b);

                        return (
                          <div
                            key={`${courtNum}-${i}`}
                            className={`absolute top-0 h-full text-xs flex items-center justify-center rounded-lg border-2 border-white ${colorClass}`}
                            style={{
                              left: leftPx,
                              width: Math.max(widthPx, 2), // minimal supaya terlihat
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                            title={`${b.user} • ${b.start_time}-${b.end_time}`}
                          >
                            <span className="px-2">{b.user}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 my-3 bg-gray-200" /> Free
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4"
            style={{ background: "var(--color-primary)" }}
          />{" "}
          Waiting Check-In
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500" /> Ongoing / Checked-in
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-600" /> Missed / Cannot check-in
        </div>
      </div>
    </div>
  );
}

// ===============================
// AdminDashboard
// ===============================
function AdminDashboard({
  bookData,
  courtData,
}: {
  bookData: Book[];
  courtData: Court;
}) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const currentDate = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const currentTime = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const today = `${dd}-${mm}-${yyyy}`;

  const todayBookings = bookData.filter((b) => b.date === today);

  const metrics = mapBookingsToMetricsAdmin(todayBookings);

  const alerts = mapBooksToAlerts(todayBookings);

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">
          {currentDate} — {currentTime}
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <MetricCard
            key={i}
            title={m.title}
            value={m.value}
            icon={m.icon}
            badge={m.badge}
          />
        ))}
      </div>

      {/* TIMELINE */}
      <CourtTimeline
        courts={Array.from({ length: courtData.court_count }, (_, i) => i + 1)}
        bookings={todayBookings}
        now={now}
        openTime={courtData.open_time}
        closeTime={courtData.close_time}
      />

      {/* COURT LIST + ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* COURT LIST */}
        <div className="lg:col-span-3 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: courtData.court_count }, (_, i) => i + 1).map(
            (courtNumber) => {
              const courtStatus = mapBookToCourtTimeline(
                courtNumber,
                todayBookings,
                now,
                courtData.open_time,
                courtData.close_time
              );

              return (
                <div key={courtNumber} className="flex flex-col">
                  <Image
                    src={IMAGES.court}
                    alt={`court-${courtNumber}`}
                    width={400}
                    height={150}
                    className="w-full rounded-lg"
                  />

                  <div className="mt-2 text-sm text-center">
                    <p className="font-semibold">
                      Court {courtStatus.courtNumber}
                    </p>
                    <p>{courtStatus.status}</p>
                    <p className="text-gray-600">{courtStatus.user}</p>
                    <p className="text-gray-600">
                      {courtStatus.startTime} - {courtStatus.endTime}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* ALERT LIST */}
        <div className="lg:col-span-2">
          <AlertList alerts={alerts} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
