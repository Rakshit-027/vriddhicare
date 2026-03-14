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
  metadataBase: new URL("https://vriddhicare.com"),
  title: {
    default: "Vriddhi Care | Professional Home Healthcare & Elder Care Services",
    template: "%s | Vriddhi Care",
  },
  description: "Experience compassionate, comprehensive medical care with our team of expert healthcare professionals. We offer home nursing, elder care, physiotherapy, and ICU at home in Nagpur.",
  keywords: ["Home Healthcare", "Elder Care Nagpur", "Nursing Care at Home", "ICU at Home", "Physiotherapy at home", "Vriddhi Care"],
  authors: [{ name: "Vriddhi Care" }],
  creator: "Vriddhi Care",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vriddhicare.com",
    title: "Vriddhi Care | Professional Home Healthcare",
    description: "Professional home healthcare, nursing, and elder care services in Nagpur.",
    siteName: "Vriddhi Care",
    images: [{ url: "/log.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vriddhi Care | Professional Home Healthcare",
    description: "Professional home healthcare, nursing, and elder care services in Nagpur.",
    images: ["/log.png"],
  },
  verification: {
    google: "cdhJlCD4fvnAsEoHutGXXsrLOC2hX0znBqmSnDnFkrI",
  },
};

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// AI SEO: JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "name": "Vriddhi Care",
      "url": "https://vriddhicare.com",
      "logo": "https://vriddhicare.com/log.png",
      "description": "Professional home healthcare, nursing, and elder care services in Nagpur.",
      "telephone": "+91-9860802592",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "101, Vanashree Apartment",
        "addressLocality": "Nagpur",
        "postalCode": "440022",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "LocalBusiness",
      "name": "Vriddhi Care",
      "image": "https://vriddhicare.com/log.png",
      "telephone": "+91-9158393859",
      "url": "https://vriddhicare.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "101, Vanashree Apartment",
        "addressLocality": "Nagpur",
        "postalCode": "440022",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  // Replace this link when the user provides it
  const whatsappLink = "https://api.whatsapp.com/send/?phone=%2B919860802592&text&type=phone_number&app_absent=0";

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
