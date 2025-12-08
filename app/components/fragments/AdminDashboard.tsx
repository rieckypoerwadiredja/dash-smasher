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

interface CourtTimelineProps {
  courts: number[]; // daftar nomor court, misal [1,2,3,4,5]
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
  // ------------------------------------------
  // Helpers
  // ------------------------------------------
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const startMin = toMinutes(openTime);
  const endMin = toMinutes(closeTime);
  const totalMin = endMin - startMin;

  const TL_WIDTH = 2000;

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const showLine = nowMin >= startMin && nowMin <= endMin;
  const progressPx = ((nowMin - startMin) / totalMin) * TL_WIDTH;

  // Generate hours header
  const hours = [];
  for (let m = startMin; m < endMin; m += 60) {
    hours.push(m / 60);
  }
  // ------------------------------------------
  // Render
  // ------------------------------------------
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <div style={{ width: TL_WIDTH }}>
          {/* HOURS HEADER */}
          <div className="sticky top-0 bg-white z-30 relative h-12 border-b">
            {hours.map((h, idx) => {
              const left = (TL_WIDTH / hours.length) * idx;

              return (
                <div key={h}>
                  {/* Label jam di tengah cell */}
                  <div
                    className="absolute text-xs font-semibold"
                    style={{
                      left: left + TL_WIDTH / hours.length / 2,
                      transform: "translateX(-50%)",
                      top: 6,
                    }}
                  >
                    {String(h).padStart(2, "0")}:00
                  </div>

                  {/* Garis pembatas jam EXACT di batas cell */}
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
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                style={{ left: progressPx }}
              />
            )}

            <div className="flex flex-col gap-6">
              {courts.map((courtNum) => {
                const courtBookings = bookings.filter(
                  (b) => Number(b.court_number) === courtNum
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

                        // -----------------------
                        // Status Color Logic
                        // -----------------------
                        let colorClass = "bg-gray-500"; // default = not started

                        if (b.check_in) colorClass = "bg-green-500";
                        else if (!b.check_in && nowMin > eMin)
                          colorClass = "bg-red-500";
                        else if (nowMin >= sMin && nowMin <= eMin)
                          colorClass = "bg-primary";

                        return (
                          <div
                            key={`${courtNum}-${i}`}
                            className={`absolute top-0 h-full text-xs text-white flex items-center justify-center rounded-lg border-2 border-white ${colorClass}`}
                            style={{
                              left: leftPx,
                              width: widthPx,
                            }}
                          >
                            {b.user}
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
          <div className="w-4 h-4 bg-primary" /> Waiting Check-In
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500" /> Ongoing
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500" /> Late (Not Checked-In)
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({
  bookData,
  courtData,
}: {
  bookData: Book[];
  courtData: Court;
}) {
  // ==== LIVE CLOCK ====
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

  // ==== TODAY FORMAT ====
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const today = `${dd}-${mm}-${yyyy}`;

  const todayBookings = bookData.filter((b) => b.date === today);

  // ==== METRICS ====
  const metrics = [
    {
      title: "Total Booking Today",
      value: todayBookings.length.toString(),
      icon: <FaCalendarAlt className="text-info text-xl" />,
    },
    {
      title: "Court in Use",
      value: todayBookings.filter((b) => b.check_in).length.toString(),
      icon: <FaHourglassStart className="text-warn text-xl" />,
    },
    {
      title: "Pending Check-In",
      value: todayBookings.filter((b) => !b.check_in).length.toString(),
      icon: <FaCircleCheck className="text-success text-xl" />,
    },
  ];

  // ==== ALERTS (waiting only) ====
  const alerts = todayBookings
    .filter((b) => !b.check_in)
    .map((b) => ({
      id: b.id,
      message: `Court ${b.court_number} waiting check-in (${b.user})`,
    }));

  // ==== GROUP COURTS ====
  const uniqueCourts = todayBookings.reduce((acc: any[], curr: Book) => {
    const exist = acc.find((x) => x.court_number === curr.court_number);

    if (exist) {
      exist.bookings.push(curr);
    } else {
      acc.push({
        court_number: curr.court_number,
        bookings: [curr],
      });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* HEADER TIME */}
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
            badge={false}
          />
        ))}
      </div>

      <div className="lg:col-span-5">
        <CourtTimeline
          courts={Array.from(
            { length: courtData.court_count },
            (_, i) => i + 1
          )}
          bookings={todayBookings}
          now={now}
          openTime={courtData.open_time}
          closeTime={courtData.close_time}
        />
      </div>

      {/* COURTS + ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* COURT LIST */}
        {/* COURT LIST */}
        <div className="lg:col-span-3 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: courtData.court_count }, (_, i) => i + 1).map(
            (courtNumber) => {
              const courtBookings = todayBookings
                .filter((b) => Number(b.court_number) === courtNumber)
                .sort(
                  (a, b) =>
                    Number(a.start_time.replace(":", "")) -
                    Number(b.start_time.replace(":", ""))
                );

              // helper parse time
              const parseTime = (timeStr: string) => {
                const [h, m] = timeStr.split(":").map(Number);
                const d = new Date(now);
                d.setHours(h, m, 0, 0);
                return d;
              };

              // booking aktif
              const active = courtBookings.find((b) => {
                const start = parseTime(b.start_time);
                const end = parseTime(b.end_time);
                return now >= start && now <= end;
              });

              // upcoming terdekat
              const upcoming = courtBookings
                .filter((b) => now < parseTime(b.start_time))
                .sort(
                  (a, b) =>
                    parseTime(a.start_time).getTime() -
                    parseTime(b.start_time).getTime()
                )[0];

              let status = "Available";
              let user = "-";
              let startTime = "-";
              let endTime = "-";

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
              } else {
                // Tidak ada booking sama sekali → available full
                status = "Available";
                user = "-";

                // available dari open_time sampai booking terdekat (tidak ada)
                startTime = courtData.open_time;
                endTime = courtData.close_time;
              }

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
                    <p className="font-semibold">Court {courtNumber}</p>
                    <p>{status}</p>
                    <p className="text-gray-600">{user}</p>
                    <p className="text-gray-600">
                      {startTime} - {endTime}
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
