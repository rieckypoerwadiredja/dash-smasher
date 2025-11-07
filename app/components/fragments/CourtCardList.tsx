"use client";
import { useMemo, useState } from "react";
import CardGrid from "./CardGrid";
import Section from "./Section";
import Card from "../elements/Card";

export interface Court {
  id: string;
  name: string;
  image: string;
  desc: string;
  location: string;
  city: string;
  open_time: string;
  close_time: string;
  open_day: string;
  map_link: string;
  court_count: number;
  price_per_hour: number;
}

interface CourtCardListProps {
  title: string;
  courts: Court[];
  limit?: boolean;
  filter?: boolean;
}

export default function CourtCardList({
  title,
  courts,
  limit = false,
  filter = false,
}: CourtCardListProps) {
  const [city, setCity] = useState("");
  const [minCourt, setMinCourt] = useState<number | "">("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  // city list
  const uniqueCities = useMemo(() => {
    const cities = courts.map((c) => c.city);
    return Array.from(new Set(cities)).sort();
  }, [courts]);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );

  const filteredCourts = filter
    ? courts.filter((court) => {
        const matchCity = city ? court.city === city : true;
        const matchCourtCount = minCourt
          ? court.court_count >= Number(minCourt)
          : true;

        const courtOpen = parseInt(court.open_time.split(":")[0]);
        const courtClose = parseInt(court.close_time.split(":")[0]);
        const userOpen = openTime ? parseInt(openTime.split(":")[0]) : null;
        const userClose = closeTime ? parseInt(closeTime.split(":")[0]) : null;

        let matchTime = true;

        if (userOpen !== null && userClose === null) {
          matchTime = courtOpen <= userOpen && courtClose > userOpen;
        } else if (userOpen === null && userClose !== null) {
          matchTime = courtOpen < userClose && courtClose >= userClose;
        } else if (userOpen !== null && userClose !== null) {
          matchTime = courtOpen <= userOpen && courtClose >= userClose;
        }

        return matchCity && matchCourtCount && matchTime;
      })
    : courts;

  const visibleCourts = limit ? filteredCourts.slice(-6) : filteredCourts;

  return (
    <Section title={title}>
      {filter && (
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-36"
          >
            <option value="">All cities</option>
            {uniqueCities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            className="shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-28"
          >
            <option value="">Open time</option>
            {hours.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>

          <select
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            className="shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-28"
          >
            <option value="">Close time</option>
            {hours.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min. courts"
            value={minCourt}
            onChange={(e) =>
              setMinCourt(e.target.value ? Number(e.target.value) : "")
            }
            className="shadow font-medium cursor-pointer bg-white rounded-lg px-3 py-2 w-28"
          />
        </div>
      )}

      <CardGrid className="gap-4 md:gap-8">
        {visibleCourts.map((court) => (
          <Card key={court.id} court={court} />
        ))}
      </CardGrid>
    </Section>
  );
}

export function CourtCardListSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <Section className="animate-pulse">
      {/* Title */}
      <div className="h-7 w-52 bg-gray-300 rounded mb-6"></div>

      <CardGrid className="gap-4 md:gap-8">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="p-3 bg-gray-100 rounded-xl shadow-sm border border-gray-200"
          >
            {/* Image block */}
            <div className="w-full h-48 rounded-t-xl bg-gray-300 mb-4"></div>

            {/* Text and button */}
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 pr-3">
                <div className="h-5 bg-gray-300 mb-2 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </CardGrid>
    </Section>
  );
}
