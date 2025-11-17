import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/fragments/Footer";
import SessionWrapper from "../components/elements/SessionWrapper";

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
  return <SessionWrapper>{children}</SessionWrapper>;
}
