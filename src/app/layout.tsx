import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kannambra – Rishinaradamangalam Vela | The Grand Festival of Rhythm, Fire and Tradition",
  description: "Experience the grand traditional Kerala temple festival of Kannambra – Rishinaradamangalam Vela. A cinematic journey of rhythm, fire, and culture.",
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import SparksEffect from "./components/SparksEffect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased`}
      >
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            <SparksEffect />
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
