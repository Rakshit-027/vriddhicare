import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home Patient Care & Elder Care Services in Nagpur",
  description: "Explore our wide range of professional healthcare services including Nursing Care, ICU at Home, Post-Hospitalization Care, and Elder Care in Nagpur.",
  keywords: ["Home Patient Care", "Elder Care", "Nursing Care", "ICU Care at Home", "Post-Hospitalization Care", "Attendant Care Services"],
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
