import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Footer from "./components/fragments/Footer";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-[#f9f9f9] min-h-screen!" lang="en">
      <body
        className={`max-w-[1440px] mx-auto ${dmSans.className} min-h-screen!`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
