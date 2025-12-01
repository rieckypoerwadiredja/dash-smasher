import { History } from "@/app/(fullscreen)/profile/page";
import { MainCardProps } from "@/app/components/elements/Card";
import { generateQR } from "../generateQR";

const padTime = (t: string) =>
  t
    .split(":")
    .map((p, i) => (i === 0 ? p.padStart(2, "0") : p))
    .join(":");

// cek apakah booking udah lewat waktu
function isPastBooking(date: string, end_time: string) {
  const [dd, mm, yyyy] = date.split("-");
  const end = new Date(`${yyyy}-${mm}-${dd}T${padTime(end_time)}:00`);
  const now = new Date();
  return now > end;
}

export function mapBookToActivitiesPending(history: History): MainCardProps[] {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatDate = new Intl.DateTimeFormat("id-ID", options);

  return history.books
    .filter((e) => e.status.toLowerCase() === "pending")
    .map((e) => {
      const [dd, mm, yyyy] = e.date.split("-");
      const dateObject = new Date(`${yyyy}-${mm}-${dd}`);

      return {
        id: e.id,
        image: e.image,
        name: e.name,
        desc: `Payment status: ${e.status} | ${formatDate.format(
          dateObject
        )} | ${e.start_time} - ${e.end_time} | Court: ${
          e.court_number
        } | Check in: ${e.check_in ? "Done" : "Not Yet"}`,
        // TODO Open virtual account
        // action_name: "Waiting Payment",
        // action_popup: {
        //   image: "",
        //   title: "Payment Pending",
        //   desc: "Your payment is still in progress. Please complete the payment to activate your booking.",
        //   action_name: `${e.email}`,
        //   subTitle: {
        //     date: `${e.date} <br/> ${e.start_time} - ${e.end_time}`,
        //     members: `ID: ${e.id}`,
        //   },
        // },
      };
    });
}

export function mapBookToActivitiesActive(history: History): MainCardProps[] {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatDate = new Intl.DateTimeFormat("id-ID", options);

  return history.books
    .filter((e) => {
      const status = e.status.toLowerCase();
      return (
        (status === "capture" || status === "settlement") &&
        !e.check_in &&
        !isPastBooking(e.date, e.end_time)
      );
    })
    .map((e) => {
      const [dd, mm, yyyy] = e.date.split("-");
      const dateObject = new Date(`${yyyy}-${mm}-${dd}`);

      return {
        id: e.id,
        image: e.image,
        name: e.name,
        desc: `Payment status: ${e.status} | ${formatDate.format(
          dateObject
        )} | ${e.start_time} - ${e.end_time} | Court: ${
          e.court_number
        } | Check in: ${e.check_in ? "Done" : "Not Yet"}`,
        action_name: "Show QR",
        action_popup: {
          image: generateQR(JSON.stringify({ id: e.id })),
          title: "QR Code Check-In",
          desc: "Present this QR code during check-in. Open the code, show it to the staff, and ensure your screen brightness is sufficient for a successful scan.",
          action_name: `${e.email}`,
          subTitle: {
            date: `${e.date} <br/> ${e.start_time} - ${e.end_time}`,
            members: `ID: ${e.id}`,
          },
        },
      };
    });
}

export function mapBookToActivitiesHistory(history: History): MainCardProps[] {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatDate = new Intl.DateTimeFormat("id-ID", options);

  return history.books
    .filter((e) => {
      const status = e.status.toLowerCase();
      // sudah check-in → masuk history
      if (e.check_in) return true;
      // lewat waktu → masuk history
      if (isPastBooking(e.date, e.end_time)) return true;
      // cancel / deny / expire → masuk history
      if (["cancel", "deny", "expire"].includes(status)) return true;

      return false;
    })
    .map((e) => {
      const [dd, mm, yyyy] = e.date.split("-");
      const dateObject = new Date(`${yyyy}-${mm}-${dd}`);

      return {
        id: e.id,
        image: e.image,
        name: e.name,
        desc: `Payment status: ${e.status} | ${formatDate.format(
          dateObject
        )} | ${e.start_time} - ${e.end_time} | Court: ${
          e.court_number
        } | Check in: ${e.check_in ? "Done" : "Not Yet"}`,
      };
    });
}

export function mapEventToActivities(history: History): MainCardProps[] {
  return history.events.map((e) => ({
    id: e.id,
    image: e.image,
    name: e.name,
    desc: e.desc,
  }));
}
