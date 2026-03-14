import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vriddhi Care - Professional Healthcare Services",
  description: "Experience compassionate, comprehensive medical care with our team of expert healthcare professionals.",
  verification: {
    google: "cdhJlCD4fvnAsEoHutGXXsrLOC2hX0znBqmSnDnFkrI",
  },
};

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function RootLayout({ children }) {
  // Replace this link when the user provides it
  const whatsappLink = "https://api.whatsapp.com/send/?phone=%2B919860802592&text&type=phone_number&app_absent=0";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <WhatsAppButton link={whatsappLink} />
        <Footer />
      </body>
    </html>
  );
}
