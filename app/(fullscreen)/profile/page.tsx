import Button from "@/app/components/elements/Button";
import { Paragraph } from "@/app/components/elements/Text";
import RecentActivityList from "@/app/components/fragments/RecentActivityList";
import SkeletonImage from "@/app/components/fragments/SkeletonImage";
import { protectedPage } from "@/app/utils/protectedPage";

export default async function ProfilePage() {
  const session = await protectedPage();
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
          <Paragraph className="font-semibold">doni@gmail.com</Paragraph>
        </div>
        <div className="flex justify-between">
          <Paragraph className="font-semibold">Phone</Paragraph>
          <Paragraph className="font-semibold">123321235</Paragraph>
        </div>
      </div>
      <RecentActivityList />

      <Button className="w-full max-w-2xl">Log Out</Button>
    </div>
  );
}
