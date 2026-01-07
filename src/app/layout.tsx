import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dune = localFont({
  src: "../fonts/DuneRise.ttf",
  variable: "--font-dune",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
});

const garet = localFont({
  src: [
    { path: "../fonts/Garet-Book.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Garet-Heavy.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-garet",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dune Links",
  description: "Link hub with warm dune palette",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload gate image untuk menghindari lag */}
        <link rel="preload" as="image" href="/DUNE-GATE4.jpg" />
        <link rel="preload" as="image" href="/bg-dune-dark.jpg" />
      </head>
      <body className={`${dune.variable} ${garet.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
