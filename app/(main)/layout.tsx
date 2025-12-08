import type { Metadata } from "next";
import Header from "../components/fragments/Header";
import "../globals.css";
import { NavMob } from "../components/fragments/Nav";
import SessionWrapper from "../components/elements/SessionWrapper";
import { IMAGES } from "../constants/image";

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
      <div className="px-5 md:px-10">
        <Header />
        {children}
        <NavMob />
      </div>
    </SessionWrapper>
  );
}
