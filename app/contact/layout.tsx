import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Vriddhi Care | Home Healthcare Services in Nagpur",
  description: "Get in touch with Vriddhi Care for 24/7 home nursing, elder care, and medical assistance in Nagpur. Call us at +91 9860802592.",
  keywords: ["Contact Vriddhi Care", "Vriddhi Care Phone Number", "Home Healthcare Near Me", "Nagpur Home Nursing"],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
