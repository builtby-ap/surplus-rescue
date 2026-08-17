import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surplus Rescue - Save Food, Save Money, Save the Planet",
  description: "Get quality surplus food at steep discounts from local restaurants, cafes, and bakeries. Choose delivery or pickup.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#FFFBF2]`}>
        {children}
      </body>
    </html>
  );
}
