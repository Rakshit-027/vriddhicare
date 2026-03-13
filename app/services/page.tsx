'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ========== COMPONENTS ========== */

const ServiceCard = ({ icon, title, availability, description, features }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
    >
      <div className="bg-gradient-to-br from-emerald-50 to-white p-8 flex flex-col md:flex-row items-center gap-6 border-b-2 border-gray-100">
        <div className="w-[90px] h-[90px] bg-white rounded-[15px] flex items-center justify-center shadow-md shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-3">
          {icon}
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-[28px] font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">{availability}</p>
        </div>
      </div>
      <div className="p-8">
        <p className="text-gray-500 leading-relaxed mb-6">{description}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-8">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 text-gray-700">
              <span className="text-emerald-500 font-bold">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/appointment" className="w-full md:w-auto px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200">
          Book {title}
        </Link>
      </div>
    </motion.div>
  );
};

/* ========== MAIN PAGE ========== */

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      category: "Home Patient Care Services",
      title: "Nursing Care at Home",
      availability: "Available 24/7",
      description: "Our qualified nurses provide medical care such as:",
      features: ["Injection administration", "IV fluids and medication", "Wound dressing", "Vital monitoring", "Post-surgery care", "Medical supervision"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM32 27H27V32H23V27H18V23H23V18H27V23H32V27Z" fill="#10B981" />
        </svg>
      )
    },
    {
      category: "Home Patient Care Services",
      title: "Post-Hospitalization Care",
      availability: "Available 24/7",
      description: "Recovering at home becomes easier with our trained caregivers who assist with:",
      features: ["Medication management", "Physiotherapy assistance", "Mobility support", "Daily health monitoring", "Doctor coordination"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M39.5 15C39.5 9.2 34.8 4.5 29 4.5C24.86 4.5 21.27 6.79 19.5 10.17C17.73 6.79 14.14 4.5 10 4.5C4.2 4.5 -0.5 9.2 -0.5 15C-0.5 21.69 5.14 27 18.89 39.73L19.5 40.3L20.11 39.73C33.86 27 39.5 21.69 39.5 15Z" fill="#10B981" />
        </svg>
      )
    },
    {
      category: "Home Patient Care Services",
      title: "ICU Care at Home",
      availability: "Critical Care",
      description: "For patients requiring critical care support at home, our experienced nurses provide:",
      features: ["ICU-level monitoring", "Medical equipment handling", "Ventilator care assistance", "Continuous patient supervision"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M42 8H8C5.79 8 4 9.79 4 12V38C4 40.21 5.79 42 8 42H42C44.21 42 46 40.21 46 38V12C46 9.79 44.21 8 42 8ZM40 32H10V18H40V32Z" fill="#10B981" />
        </svg>
      )
    },
    {
      category: "Elder Care Services",
      title: "Personal Care Assistance",
      availability: "Daily Support",
      description: "Our caregivers assist elderly individuals with daily routines such as:",
      features: ["Bathing and grooming", "Dressing assistance", "Mobility support", "Meal preparation", "Medication reminders"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M38 4H12C9.79 4 8 5.79 8 8V42C8 44.21 9.79 46 12 46H38C40.21 46 42 44.21 42 42V8C42 5.79 40.21 4 38 4ZM28 38H22V32H28V38ZM28 28H22V10H28V28Z" fill="#10B981" />
        </svg>
      )
    },
    {
      category: "Elder Care Services",
      title: "Companionship Care",
      availability: "Daily Support",
      description: "Loneliness can affect elderly health. Our caregivers provide:",
      features: ["Emotional support", "Friendly companionship", "Conversation and engagement", "Outdoor walks and activities"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M39 5H11C8.24 5 6 7.24 6 10V40C6 42.76 8.24 45 11 45H39C41.76 45 44 42.76 44 40V10C44 7.24 41.76 5 39 5ZM20 35L12 27L15.06 23.94L20 28.88L34.94 13.94L38 17L20 35Z" fill="#10B981" />
        </svg>
      )
    },
    {
      category: "Elder Care Services",
      title: "24/7 Elder Care Support",
      availability: "Continuous Care",
      description: "For seniors who require constant support, we provide:",
      features: ["Full-time caregivers", "Day & night assistance", "Health monitoring", "Emergency response support"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM32 27H27V32H23V27H18V23H23V18H27V23H32V27Z" fill="#10B981" />
        </svg>
      )
    },
    {
      category: "Attendant Care Services",
      title: "Attendant Care Services",
      availability: "Daily Care",
      description: "Our trained attendants help patients and elderly individuals with their daily routines including:",
      features: ["Feeding assistance", "Personal hygiene support", "Mobility assistance", "Bedridden patient care", "Home support activities"],
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M42 8H8C5.79 8 4 9.79 4 12V38C4 40.21 5.79 42 8 42H42C44.21 42 46 40.21 46 38V12C46 9.79 44.21 8 42 8ZM40 32H10V18H40V32Z" fill="#10B981" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* ── TOP BAR ── */}
      <div className="hidden lg:block bg-emerald-700 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span>📞 +91 9860802592, +91 9158393859</span>
            <span>✉️ vriddhicare@gmail.com</span>
            <span>🕐 24/7 Care & Emergency Support</span>
          </div>
          <div className="flex gap-3">
            {['f', 'in', 'tw', 'ig'].map(s => (
              <a key={s} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-emerald-600 transition-all">{s}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className={`sticky top-0 z-[1000] bg-white transition-all duration-300 ${scrolled ? 'shadow-lg py-3' : 'py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <img src="/log.png" alt="Logo" className="h-14 w-auto" />
          </Link>

          <ul className={`fixed lg:static top-[70px] left-0 w-full lg:w-auto h-screen lg:h-auto bg-white flex flex-col lg:flex-row p-10 lg:p-0 gap-8 transition-all duration-300 ${menuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}`}>
            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                  className={`text-lg lg:text-base font-medium transition-colors hover:text-emerald-500 ${item === 'Services' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-600'}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/appointment" className="hidden sm:block px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all">Book Appointment</Link>
            <button className="lg:hidden flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`w-6 h-0.5 bg-emerald-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-emerald-500 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-emerald-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── PAGE HEADER ── */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-emerald-500">Home</Link>
            <span>/</span>
            <span className="text-emerald-500 font-semibold">Services</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Our Medical Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Comprehensive healthcare solutions tailored to your needs
          </motion.p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">WHAT WE OFFER</span>
            <h2 className="text-4xl font-bold mb-6">Professional Home Patient Care & Elder Care</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              We provide professional home healthcare services for patients who need medical assistance and care after hospitalization or during long-term illness.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              We also provide compassionate elder care services designed to support senior citizens in maintaining a comfortable and dignified lifestyle. Our trained attendants help patients and elderly individuals with their daily routines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["Home Patient Care", "Elder Care Services", "Attendant Care", "Available 24/7"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">✓</div>
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=500&fit=crop"
              alt="Home Care"
              className="rounded-3xl shadow-2xl"
            />
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -right-4 md:bottom-8 md:right-8 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-8 rounded-2xl shadow-xl text-center"
            >
              <h3 className="text-3xl font-bold mb-1">500+</h3>
              <p className="text-sm opacity-90">Happy Families</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN SERVICES LIST ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Our Specialties</span>
            <h2 className="text-4xl font-bold mt-2">Medical Services We Provide</h2>
          </div>
          <div className="flex flex-col gap-16">
            {Object.entries(
              services.reduce((acc, service) => {
                const cat = service.category || "Other";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(service);
                return acc;
              }, {} as any)
            ).map(([category, items]: any) => (
              <div key={category}>
                <h3 className="text-2xl font-bold mb-6 mt-4 text-gray-800 border-l-4 border-emerald-500 pl-4 text-left">{category}</h3>
                <div className="flex flex-col gap-10">
                  {items.map((service: any, index: number) => (
                    <ServiceCard key={index} {...service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">WHY CHOOSE US</span>
          <h2 className="text-4xl font-bold mb-16">Why Families Trust Vriddhicare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "👨‍⚕️", title: "Experienced Professionals", desc: "Our team includes 100+ trained and government-certified nurses and caregivers with extensive experience." },
              { icon: "⭐", title: "7+ Years Trusted Service", desc: "We have been providing reliable healthcare services for more than 7 years." },
              { icon: "💚", title: "Served 500+ Patients", desc: "Successfully cared for 500+ patients and senior citizens with compassion and professionalism." },
              { icon: "📋", title: "Personalized Care Plans", desc: "Every patient has different needs. We create customized care plans based on medical requirements." },
              { icon: "🏡", title: "Comfort of Home", desc: "We bring professional healthcare services directly to your home, ensuring comfort and convenience." },
              { icon: "💎", title: "Affordable & Reliable", desc: "Our services are designed to be cost-effective while maintaining high quality care." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 bg-gray-50 rounded-2xl transition-all hover:bg-white hover:shadow-xl group border border-gray-100"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARE PROCESS ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">OUR PROCESS</span>
          <h2 className="text-4xl font-bold mb-16">Our Care Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-emerald-200 z-0"></div>
            {[
              { num: "1", title: "Consultation", text: "We understand the patient's condition and care requirements." },
              { num: "2", title: "Care Plan Creation", text: "A personalized care plan is designed." },
              { num: "3", title: "Caregiver Assignment", text: "A trained nurse or caregiver is assigned." },
              { num: "4", title: "Continuous Monitoring", text: "Regular supervision ensures the highest quality care." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500 text-white font-bold text-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200 border-4 border-white shrink-0">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-emerald-600 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Need Medical Assistance?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">Our healthcare professionals are ready to help you. Book an appointment today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/appointment" className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:shadow-2xl transition-all">Schedule Appointment</Link>
            <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-all">Emergency: +91 9860802592, +91 9158393859</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-white pt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-emerald-500 mb-6">
              <span className="w-10 h-10 bg-emerald-500 text-white flex items-center justify-center rounded-lg">+</span>
              Vriddhicare
            </div>
            <p className="text-slate-400 mb-8">Providing quality healthcare services with compassion and excellence. Your health is our priority.</p>
            <div className="flex gap-4">
              {['f', 'in', 't', 'i'].map(s => (
                <div key={s} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 cursor-pointer transition-all">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              {['Home', 'Services', 'About Us', 'Contact'].map(l => (
                <li key={l}><Link href="#" className="hover:text-emerald-500 transition-all">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8">Medical Services</h4>
            <ul className="space-y-4 text-slate-400">
              {['Home Patient Care', 'Elder Care Services', 'Nursing Care', 'Attendant Care', 'Emergency Support'].map(s => (
                <li key={s}><Link href="#" className="hover:text-emerald-500 transition-all">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8">Contact Info</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>📍 101, Vanashree Apartment, IT Park Road, Gayatri Nagar, Nagpur. 440022</li>
              <li>📞 +91 9860802592, +91 9158393859</li>
              <li>✉️ vriddhicare@gmail.com</li>
              <li>🕐 24/7 Care & Emergency Support</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 flex flex-col md:row justify-between items-center text-slate-500 text-sm gap-4">
          <p>© 2026 Vriddhicare. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-emerald-500">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-500">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* ── FLOAT BUTTONS ── */}
      <a href="https://api.whatsapp.com/send/?phone=%2B919860802592&text&type=phone_number&app_absent=0" target="_blank" className="fixed bottom-8 right-8 w-15 h-15 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl z-[999] transition-transform hover:scale-110 active:scale-95 animate-bounce">
        <span className="text-white text-3xl">💬</span>
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-28 right-9 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-[998] hover:-translate-y-2 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        ↑
      </button>
    </div>
  );
}