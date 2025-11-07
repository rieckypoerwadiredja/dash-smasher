/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import BookingFooter from "@/app/components/fragments/BookingFooter";
import { Court } from "@/app/components/fragments/CourtCardList";
import DateSlider from "@/app/components/fragments/DateSlider";
import ParalaxImage from "@/app/components/fragments/ParalaxImage";
import { Slider } from "@/app/components/fragments/Slider";
import TimeSlotPicker from "@/app/components/fragments/TimeSlotPicker";
import generateId from "@/app/utils/generateId";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export interface Book {
  id: string;
  court_id: string;
  court_number: string;
  user: string;
  start_time: string;
  end_time: string;
  date: string;
  status: string;
}

export default function Page() {
  const params = useParams();
  const id = params.id;

  const [court, setCourt] = useState<Court | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState({
    id: "",
    court_id: "",
    court_number: "",
    user: "",
    start_time: "",
    end_time: "",
    date: "",
    status: "unpaid",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [timeLabel, setTimeLabel] = useState<string>("");

  // Fetch API
  useEffect(() => {
    async function fetchSheets() {
      try {
        const [resCourt, resBook] = await Promise.all([
          fetch(`/api/sheets/courts/${id}`),
          fetch(`/api/sheets/books/${id}`),
        ]);

        const courtData = await resCourt.json();
        const bookData = await resBook.json();

        const formattedBooks = (bookData.data || []).map((b: Book) => ({
          ...b,
          start_time: b.start_time
            ? b.start_time
                .split(":")
                .map((p: string, i: number) =>
                  i === 0 ? p.padStart(2, "0") : p
                )
                .join(":")
            : "",
          end_time: b.end_time
            ? b.end_time
                .split(":")
                .map((p: string, i: number) =>
                  i === 0 ? p.padStart(2, "0") : p
                )
                .join(":")
            : "",
        }));

        setCourt(courtData.data);
        setBooks(formattedBooks || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSheets();
  }, [id]);

  const [price, setPrice] = useState<number>(0);

  // Set Price
  useEffect(() => {
    if (!court || !form.start_time || !form.end_time) return;

    const startHour = parseInt(form.start_time.split(":")[0]);
    const endHour = parseInt(form.end_time.split(":")[0]);
    const duration = endHour - startHour;

    if (duration > 0) {
      setPrice((court.price_per_hour * duration) / 1000);
    } else {
      setPrice(0);
    }
  }, [court, form.start_time, form.end_time]);

  // Generate jam base on open/close time
  useEffect(() => {
    if (!court?.open_time || !court?.close_time) return;

    const [startH] = court.open_time.split(":").map(Number);
    const [endH] = court.close_time.split(":").map(Number);
    let slots: string[] = [];

    for (let i = startH; i < endH; i++) {
      slots.push(`${String(i).padStart(2, "0")}:00`);
    }

    if (selectedDate) {
      const today = new Date();
      if (
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
      ) {
        const currentHour = today.getHours() + 1; // mulai dari jam berikutnya
        slots = slots.filter((s) => parseInt(s.split(":")[0]) >= currentHour);
      }
    }

    setTimeSlots(slots);
  }, [court, selectedDate]);

  // Cek booked time setiap tanggal / court berubah
  useEffect(() => {
    if (!form.date || !form.court_number) {
      return;
    }

    const bookedForCourt = books
      .filter((b) => {
        return (
          b.court_id === court?.id &&
          b.court_number === form.court_number &&
          new Date(b.date).toISOString().split("T")[0] === form.date
        );
      })
      .map((b) => b.start_time.padStart(5, "0"));

    console.log("Updated booked times:", bookedForCourt);
  }, [books, form.date, form.court_number, court?.id]);

  // Handle pilih jam (multi & berurutan)
  const handleSelectTime = (time: string) => {
    const index = timeSlots.indexOf(time);

    // kalau belum ada jam dipilih, mulai dari jam ini
    if (!form.start_time) {
      const next = timeSlots[index + 1] || time;
      setForm((prev) => ({
        ...prev,
        start_time: time,
        end_time: next,
      }));
      setTimeLabel(`${time} - ${next}`);
      return;
    }

    // kalau udah ada start & end, tambahin waktu baru kalau berurutan
    const startIndex = timeSlots.indexOf(form.start_time);
    const endIndex = timeSlots.indexOf(form.end_time);

    // klik waktu di belakang end_time → extend durasi
    if (index === endIndex) {
      const next = timeSlots[index + 1] || form.end_time;
      setForm((prev) => ({
        ...prev,
        end_time: next,
      }));
      setTimeLabel(`${form.start_time} - ${next}`);
    }
    // klik waktu sebelum start_time → extend ke awal
    else if (index === startIndex - 1) {
      setForm((prev) => ({
        ...prev,
        start_time: time,
      }));
      setTimeLabel(`${time} - ${form.end_time}`);
    }
    // klik waktu di tengah range → reset
    else {
      const next = timeSlots[index + 1] || time;
      setForm((prev) => ({
        ...prev,
        start_time: time,
        end_time: next,
      }));
      setTimeLabel(`${time} - ${next}`);
    }
  };

  // Handle pilih tanggal
  const handleSelectDate = (day: number) => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);

    // Format jadi DD-MM-YYYY
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;

    setSelectedDate(date);
    setForm((prev) => ({
      ...prev,
      date: formattedDate,
      start_time: "",
      end_time: "",
    }));
  };
  // Handle pilih court number
  const handleSelectCourt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      court_number: e.target.value,
      start_time: "",
      end_time: "",
    }));
  };

  // Validasi sebelum submit
  // Validasi dan submit booking
  const handleBookNow = async () => {
    if (
      !form.user ||
      !form.court_number ||
      !form.start_time ||
      !form.end_time ||
      !form.date
    ) {
      alert("Semua field harus diisi sebelum booking!");
      return;
    }

    const idGen = generateId();
    const bookingData = { ...form, id: idGen, court_id: court?.id || "" };

    try {
      const res = await fetch("/api/sheets/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Gagal melakukan booking. Silakan coba lagi.");
      }

      const data = await res.json();
      console.log("Booking success:", data);

      alert("Booking success!");

      // Reset form setelah booking
      setForm({
        id: "",
        court_id: "",
        court_number: "",
        user: "",
        start_time: "",
        end_time: "",
        date: "",
        status: "unpaid",
      });

      setTimeLabel("");
      setSelectedDate(null);
    } catch (err) {
      console.error(err);
      alert("An error occurred while booking. Please try again.");
    }
  };

  // Dapatkan tanggal sekarang
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // 0-indexed
  const currentYear = today.getFullYear();

  // Dapatkan jumlah hari di bulan ini
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate array mulai dari hari ini sampai akhir bulan
  const daysArray = Array.from(
    { length: daysInMonth - currentDay + 1 },
    (_, i) => i + currentDay
  );

  return (
    <div className="flex flex-col min-h-screen">
      {court && (
        <>
          <ParalaxImage
            image={court.image}
            name={court.name}
            desc={`${court.location} | ${court.city}`}
          />

          <div className="relative min-h-screen -mt-5 flex flex-col justify-between gap-y-5 z-30 p-6 bg-white text-gray-800 rounded-t-2xl w-full flex-1 pb-40">
            <div className="flex flex-col gap-y-10">
              {/* Date Selector */}
              <Slider>
                <DateSlider
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  days={daysArray}
                  monthNames={[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ]}
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                  onMonthChange={() => {}}
                />
              </Slider>

              <div className="w-full max-w-[800px] mx-auto flex flex-col gap-y-5">
                {/* User */}
                <div>
                  <label className="text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={form.user}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, user: e.target.value }))
                    }
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                  />
                </div>

                {/* Court Number */}
                <div>
                  <label className="text-sm font-medium mb-2">
                    Court Number
                  </label>
                  <select
                    value={form.court_number}
                    onChange={handleSelectCourt}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                  >
                    <option value="">Select court</option>
                    {Array.from({ length: court.court_count }, (_, i) => (
                      <option key={i} value={(i + 1).toString()}>
                        Court {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Picker */}
                <div className="w-full max-w-[800px] mx-auto flex flex-col gap-y-5">
                  {/* Time Picker */}
                  <TimeSlotPicker
                    timeLabel={timeLabel}
                    timeSlots={timeSlots}
                    books={books}
                    form={form}
                    court={court}
                    onSelectTime={handleSelectTime}
                  />
                </div>
              </div>

              <BookingFooter price={price} onBook={handleBookNow} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
