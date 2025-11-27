import { Paragraph } from "@/app/components/elements/Text";
import SkeletonImage from "@/app/components/fragments/SkeletonImage";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";
import { protectedPage } from "@/app/utils/protectedPage";
import { Book } from "../courts/[id]/page";
import { redirect } from "next/navigation";
import { Event } from "@/app/(main)/events/page";
import {
  mapBookToActivities,
  mapBookToActivitiesActive,
  mapEventToActivities,
} from "@/app/utils/mapers/historyMapers";
import CardList from "@/app/components/fragments/CardList";

export interface HistoryBook extends Book {
  name: string;
  image: string;
}

export interface HistoryEvent extends Event {
  name: string;
  image: string;
}

export interface History {
  books: HistoryBook[];
  events: HistoryEvent[];
}

// update section
// unpaid (paling atas), paid, hostory dlu (exp cek jam mulai sm selesai + tgl hari book)
export default async function ProfilePage() {
  const session = await protectedPage();
  if (!session.user) redirect("/login");

  const history = await fetchData<History>(
    `${API_BASE_URL}/api/sheets/history?email=${session.user.email}`
  );
  const bookHistory = [history].map(mapBookToActivities)[0];
  const bookActive = [history].map(mapBookToActivitiesActive)[0];
  const eventHistory = [history].map(mapEventToActivities)[0];

  return (
    <div className="min-h-screen flex flex-col gap-y-5 items-center p-4 md:p-10 mx-auto">
      {/* Header */}
      <div className="relative w-28 h-28">
        <SkeletonImage
          src={
            session?.user?.image ??
            "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="title"
          aspectRatio={1 / 1}
          customImage="rounded-full!"
        />
      </div>
      <div>
        <p className="font-semibold text-center">{session?.user?.name}</p>
        <p className="font-medium text-center text-dark-gray">
          {session?.user?.email}
        </p>
      </div>

      <div className="w-full bg-white p-5 rounded-2xl flex flex-col gap-y-2 max-w-2xl">
        <div className="flex justify-between">
          <Paragraph className="font-semibold">Email</Paragraph>
          <Paragraph className="font-semibold">{session.user.email}</Paragraph>
        </div>
        <div className="flex justify-between">
          <Paragraph className="font-semibold">Name</Paragraph>
          <Paragraph className="font-semibold">{session.user.name}</Paragraph>
        </div>
      </div>
      <CardList
        cards={bookActive}
        title="Active Book"
        status={{
          title: "Oops, you haven't active books",
          desc: "Book new court now",
          status: "empty",
        }}
      />
      <CardList
        cards={bookHistory}
        title="Book History"
        status={{
          title: "you have never booked a court",
          desc: "Let's make your first book!",
          status: "empty",
        }}
      />
      <CardList
        cards={eventHistory}
        title="Event History"
        status={{
          title: "Oops, event not found",
          desc: "Try other keywords",
          status: "empty",
        }}
      />
    </div>
  );
}
