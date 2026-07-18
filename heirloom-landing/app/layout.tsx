import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Heirloom — Find out what the collection is worth",
  description:
    "Heirloom identifies, values, and organizes an inherited coin collection in one afternoon — built for settling an estate, not hunting pocket change.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-parchment text-ink antialiased">{children}</body>
    </html>
  );
}
