import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LenisWrapper from "./components/shared/LenisWrapper";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WayFare",
  description: "Plan your next trip with WayFare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable}`}>
      <body className="antialiased">
        <LenisWrapper><main>{children}</main></LenisWrapper>
        <Toaster />
      </body>
    </html>
  );
}