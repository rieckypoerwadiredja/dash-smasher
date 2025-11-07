import type { Metadata } from "next";
import Header from "../components/fragments/Header";
import "../globals.css";
import { NavMob } from "../components/fragments/Nav";
import { DM_Sans } from "next/font/google";
import Footer from "../components/fragments/Footer";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dash Smasher App",
  description: "Book your badminton court easily with Dash!",
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
    <body className={`max-w-[1440px] mx-auto ${dmSans.className}`}>
      <div className="px-5 md:px-10">
        <Header />
        {children}
        <NavMob />
      </div>
      <Footer />
    </body>
  );
}
