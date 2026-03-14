import React from 'react'
import Home from '../pages/home/page'

export const metadata = {
  title: "Professional Home Healthcare & Nursing Services | Vriddhi Care",
  description: "Vriddhi Care provides top-quality elder care, ICU at home, post-surgical care, and nursing services in Nagpur. Compassionate care you can trust.",
  alternates: {
    canonical: '/',
  },
};

const page = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default page
