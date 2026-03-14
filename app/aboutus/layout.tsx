import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Top Rated Home Healthcare Provider in Nagpur",
  description: "Learn about Vriddhi Care, a dedicated team of over 100 certified caregivers providing 24/7 home nursing, post-surgery care, and elder assistance in Nagpur.",
  keywords: ["About Vriddhi Care", "Home Nursing Agency Nagpur", "Elderly Care Agency", "Best Healthcare in Nagpur"],
  alternates: {
    canonical: '/aboutus',
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
