"use client";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../elements/Form";

interface FilterEventProps {
  onFilterChange: (month: number, type: string) => void;
}

export default function FilterEvent({ onFilterChange }: FilterEventProps) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [type, setType] = useState("");

  useEffect(() => {
    onFilterChange(month, type);
  }, [month, type, onFilterChange]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <>
      <SelectInput
        label="Month"
        onChange={handleMonthChange}
        options={[
          { label: "All Month", value: "" },
          { label: "January", value: 1 },
          { label: "February", value: 2 },
          { label: "March", value: 3 },
          { label: "April", value: 4 },
          { label: "May", value: 5 },
          { label: "June", value: 6 },
          { label: "July", value: 7 },
          { label: "August", value: 8 },
          { label: "September", value: 9 },
          { label: "October", value: 10 },
          { label: "November", value: 11 },
          { label: "December", value: 12 },
        ]}
        value={month}
      />
      <SelectInput
        label="Event Type"
        onChange={handleTypeChange}
        options={[
          { label: "All Types", value: "" },
          { label: "Tournament", value: "Tournament" },
          { label: "Friendly Match", value: "Friendly Match" },
          { label: "League", value: "League" },
          { label: "Mini Games", value: "Mini Games" },
        ]}
        value={type}
      />
    </>
  );
}
