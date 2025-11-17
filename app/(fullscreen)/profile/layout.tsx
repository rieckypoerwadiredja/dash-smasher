import type { Metadata } from "next";
import "../../globals.css";
import { NavMob } from "@/app/components/fragments/Nav";
import { HeaderWithoutSearchBar } from "@/app/components/fragments/Header";
import Footer from "@/app/components/fragments/Footer";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Profile!",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="px-5 md:px-10">
        <HeaderWithoutSearchBar />

        {children}
        <NavMob />
      </div>
    </>
  );
}
