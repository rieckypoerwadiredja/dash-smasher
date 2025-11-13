"use client";
import React, { useEffect, useMemo, useState } from "react";
import { GeneralInput, SelectInput } from "../elements/Form";
import { MainCardProps } from "../elements/Card";

interface FilterCourtProps {
  courts: MainCardProps[];
  onFilterChange?: (filters: {
    city: string;
    minCourt: number;
    openTime: string;
    closeTime: string;
  }) => void;
}

const FilterCourt: React.FC<FilterCourtProps> = ({
  courts,
  onFilterChange,
}) => {
  const [city, setCity] = useState("");
  const [minCourt, setMinCourt] = useState<number>(0);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  // city list
  const uniqueCities = useMemo(() => {
    const cities = courts.map((c) => c.rawCity).filter(Boolean) as string[];
    const sorted = Array.from(new Set(cities)).sort();
    return sorted.map((city) => ({ label: city, value: city }));
  }, [courts]);

  const hours = Array.from({ length: 24 }, (_, i) => {
    const time = `${String(i).padStart(2, "0")}:00`;
    return { label: time, value: time };
  });

  // update parent kalau filter berubah
  const handleChange = () => {
    onFilterChange?.({ city, minCourt, openTime, closeTime });
  };

  useEffect(() => {
    onFilterChange?.({ city, minCourt, openTime, closeTime });
  }, [city, minCourt, openTime, closeTime, onFilterChange]);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
      <SelectInput
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          handleChange();
        }}
        options={uniqueCities}
        label="All cities"
      />

      <SelectInput
        value={openTime}
        onChange={(e) => {
          setOpenTime(e.target.value);
        }}
        options={hours}
        label="Open time"
      />

      <SelectInput
        value={closeTime}
        onChange={(e) => {
          setCloseTime(e.target.value);
        }}
        options={hours}
        label="Close time"
      />

      <GeneralInput
        type="text"
        placeholder="Min. courts"
        value={minCourt > 0 ? String(minCourt) : ""}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          const val = raw ? Number(raw) : 0;
          setMinCourt(val);
        }}
      />
    </div>
  );
};

export default FilterCourt;
