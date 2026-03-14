import { Metadata } from 'next';

export const metadata = {
  title: "Book an Appointment | Vriddhi Care Home Healthcare",
  description: "Schedule your home nursing, elder care, or medical consultation appointment with Vriddhi Care in Nagpur. Quick and easy online booking.",
  keywords: ["Book Appointment Home Healthcare", "Schedule Nurse at Home", "Nagpur Home Care Booking"],
  alternates: {
    canonical: '/appointment',
  },
};

export default function AppointmentLayout({ children }) {
  return <>{children}</>;
}
