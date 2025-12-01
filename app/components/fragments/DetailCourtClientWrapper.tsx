"use client";

import { Court } from "@/app/(main)/courts/page";
import BookingFooter from "@/app/components/fragments/BookingFooter";

import DateSlider from "@/app/components/fragments/DateSlider";
import ParalaxImage from "@/app/components/fragments/ParalaxImage";
import PaymentPopup from "@/app/components/fragments/popup/PaymentPopup";
import { Slider } from "@/app/components/fragments/Slider";
import StatusMessage from "@/app/components/fragments/status/StatusMessage";
import TimeSlotPicker from "@/app/components/fragments/TimeSlotPicker";
import { API_BASE_URL } from "@/app/utils/fetcher";
import generateId from "@/app/utils/generateId";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { GeneralInput, SelectInput } from "../elements/Form";
import Popup from "./popup/Popup";
import ModalDialog, { ModalProps } from "./popup/ModalDialog";

export interface Book {
  id: string;
  court_id: string;
  court_number: string;
  user: string;
  email: string;
  start_time: string;
  end_time: string;
  date: string;
  status: string;
  total_price: number;
  payment_type: string;
  check_in: boolean;
  created_at: string;
  updated_at: string;
  check_in_at: string;
}

export default function DetailCourtClientWrapper({
  courtData,
  booksData,
}: {
  courtData: Court;
  booksData: Book[];
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [court, setCourt] = useState<Court | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [token, setToken] = useState("");

  // Dapatkan tanggal sekarang
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  // Dapatkan jumlah hari di bulan ini

  // Generate array from today to the end of the month
  const daysArray = useMemo(() => {
    const isCurrentMonth =
      currentYear === today.getFullYear() && currentMonth === today.getMonth();

    const startDay = isCurrentMonth ? today.getDate() : 1;
    const endDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    return Array.from(
      { length: endDay - startDay + 1 },
      (_, i) => i + startDay
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentYear]);

  const [form, setForm] = useState({
    id: "",
    court_id: "",
    court_number: "",
    user: "",
    email: "",
    start_time: "",
    end_time: "",
    date: "",
    status: "-", // value from midtrans
    total_price: 0,
    payment_type: "-", // value from midtrans
    check_in: false,
    created_at: "",
    updated_at: "",
    check_in_at: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [timeLabel, setTimeLabel] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  // Pakai data dari server props
  useEffect(() => {
    if (!courtData) {
      setError("Court not found");
      return;
    }

    setCourt(courtData);

    const formattedBooks = (booksData || []).map((b: Book) => ({
      ...b,
      start_time: b.start_time
        ? b.start_time
            .split(":")
            .map((p: string, i: number) => (i === 0 ? p.padStart(2, "0") : p))
            .join(":")
        : "",
      end_time: b.end_time
        ? b.end_time
            .split(":")
            .map((p: string, i: number) => (i === 0 ? p.padStart(2, "0") : p))
            .join(":")
        : "",
    }));

    const validBooks = formattedBooks.filter(
      (book: Book) => book.status !== "-" && book.payment_type !== "-"
    );

    setBooks(validBooks || []);
  }, [courtData, booksData]);

  // Set Price
  useEffect(() => {
    if (!court || !form.start_time || !form.end_time) return;

    const startHour = parseInt(form.start_time.split(":")[0]);
    const endHour = parseInt(form.end_time.split(":")[0]);
    const duration = endHour - startHour;

    if (duration > 0) {
      const price = court.price_per_hour * duration;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        ...prev,
        total_price: price,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        total_price: 0,
      }));
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeSlots(slots);
  }, [court, selectedDate]);

  // Cek booked time setiap tanggal / court berubah
  useEffect(() => {
    if (!form.date || !form.court_number) return;

    const bookedForCourt = books
      .filter((b) => {
        if (!b.date) return false;

        //  "DD-MM-YYYY" → "YYYY-MM-DD"
        const normalize = (d: string) => {
          if (/^\d{2}-\d{2}-\d{4}$/.test(d)) {
            const [dd, mm, yyyy] = d.split("-");
            return `${yyyy}-${mm}-${dd}`;
          }
          return d;
        };

        const normalizedBookDate = normalize(b.date);
        const normalizedFormDate = normalize(form.date);

        return (
          b.court_id === court?.id &&
          b.court_number === form.court_number &&
          normalizedBookDate === normalizedFormDate
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

  const [popup, setPopup] = useState<ModalProps & { open: boolean }>({
    type: "success",
    open: false,
    title: "",
    message: "",
    notes: "",
    onConfirm: () => {},
  });

  // Handle pilih tanggal
  const handleSelectDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
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
    // cek login
    if (!session?.user?.email) {
      setPopup({
        open: true,
        type: "warning",
        title: "Login Required",
        message: "You must log in before making a booking.",
        notes: "You will be redirected to the login page.",
        onConfirm: () => {
          router.push("/login");
        },
      });
      return;
    }
    if (
      !form.user ||
      !form.court_number ||
      !form.start_time ||
      !form.end_time ||
      !form.date ||
      !form.total_price
    ) {
      setPopup({
        open: true,
        type: "warning",
        title: "Incomplete Information",
        message: "Please fill in all required fields before proceeding.",
        notes:
          "Name, court, date, start time, end time, and duration are mandatory.",
        onConfirm: () => {},
      });
    }

    const idGen = generateId();
    const bookingData = {
      ...form,
      id: idGen,
      court_id: court?.id || "",
      email: session?.user?.email ?? "",
    };

    setForm(bookingData);
    try {
      // TODO post data to Spreadsheet
      const res = await fetch(`${API_BASE_URL}/api/sheets/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        throw new Error(
          data.message || "Failed to make a booking. Please try again."
        );
      }

      // TODO Payment Token
      const midtransToken = await fetch(
        `${API_BASE_URL}/api/midtrans/tokenizer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const midtransData = await midtransToken.json();

      if (!midtransToken.ok) {
        setPopup({
          open: true,
          type: "error",
          title: "Transaction Failed",
          message: midtransData.error || "Failed to create payment session.",
          notes: "Please try again later or check your network connection.",
          onConfirm: () => {},
        });

        return;
      }
      setToken(midtransData.token);

      setTimeLabel("");
      setSelectedDate(null);
      // Reset form setelah booking
      setForm({
        id: "",
        court_id: "",
        court_number: "",
        user: "",
        email: "",
        start_time: "",
        end_time: "",
        date: "",
        status: "-",
        total_price: 0,
        payment_type: "-",
        check_in: false,
        created_at: "",
        updated_at: "",
        check_in_at: "",
      });
    } catch (err: unknown) {
      let message = "An unexpected error occurred";

      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "object" && err !== null && "error" in err) {
        message = (err as { error: string }).error;
      }

      setPopup({
        open: true,
        type: "warning",
        title: message,
        message,
        notes: "Please try again later.",
        onConfirm: () => {},
      });
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setCurrentYear(year);
    setCurrentMonth(month - 1); // karena JS month 0-indexed
  };

  if (error) {
    return (
      <div className="px-5 p-10 flex items-center justify-center">
        <StatusMessage
          data={{
            title: error,
            desc: "Please try again later.",
            status: "not-found",
          }}
        />
      </div>
    );
  }

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
                  onMonthChange={handleMonthChange}
                />
              </Slider>

              <div className="w-full max-w-[800px] mx-auto flex flex-col gap-y-5">
                {/* User */}
                <div>
                  <GeneralInput
                    label="Your Name"
                    type="text"
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, user: e.target.value }))
                    }
                    value={form.user}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                  />
                </div>

                {/* Court Number */}
                <div>
                  <SelectInput
                    label="Court Number"
                    value={form.court_number}
                    onChange={handleSelectCourt}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                    firstOption="Select court"
                    options={Array.from(
                      { length: court.court_count },
                      (_, i) => ({
                        label: `Court ${i + 1}`,
                        value: (i + 1).toString(),
                      })
                    )}
                  />
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

              <BookingFooter price={form.total_price} onBook={handleBookNow} />
              <PaymentPopup
                token={token}
                onClose={async () => {
                  setToken("");
                  window.location.reload();
                }}
              />

              <Popup
                open={popup.open}
                handleClose={() => {
                  setPopup({ ...popup, open: false });
                  popup.onConfirm();
                }}
              >
                <ModalDialog
                  type={popup.type}
                  title={popup.title}
                  message={popup.message}
                  notes={popup.notes}
                  onConfirm={() => {
                    setPopup({ ...popup, open: false });
                    popup.onConfirm();
                  }}
                />
              </Popup>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
