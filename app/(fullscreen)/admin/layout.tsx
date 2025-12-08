import type { Metadata } from "next";
import "../../globals.css";
import SessionWrapper from "@/app/components/elements/SessionWrapper";
import { IMAGES } from "@/app/constants/image";

export const metadata: Metadata = {
  title: "Dash Smasher App",
  description: "Book your badminton court easily with Dash!",
  icons: {
    icon: IMAGES.logoIco,
    shortcut: IMAGES.logo,
    apple: IMAGES.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <div className="px-5 md:px-10">{children}</div>
    </SessionWrapper>
  );
}
