'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home Patient Care & Elder Care Services in Nagpur",
  description: "Explore our wide range of professional healthcare services including Nursing Care, ICU at Home, Post-Hospitalization Care, and Elder Care in Nagpur.",
  keywords: ["Home Patient Care", "Elder Care", "Nursing Care", "ICU Care at Home", "Post-Hospitalization Care", "Attendant Care Services"],
  alternates: {
    canonical: '/services',
  },
};

/* ========== COMPONENTS ========== */

const ServiceCard = ({ icon, title, availability, description, features }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-[32px] p-3 border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 h-full"
    >
      <div className="bg-gray-50 rounded-[28px] p-8 md:p-12 transition-colors duration-500 group-hover:bg-white h-full flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 text-[11px] font-black uppercase tracking-widest rounded-full self-start shadow-sm shadow-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {availability}
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1]">
              {title}
            </h3>
          </div>
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-gray-200/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-gray-50 shrink-0 order-1 lg:order-2">
            <div className="text-emerald-500 scale-150">
              {icon}
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 flex-grow font-medium opacity-80">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-12">
          {features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-4 text-slate-700 group/feature">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200 group-hover/feature:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-bold text-sm md:text-base">{feature}</span>
            </div>
          ))}
        </div>

        <Link
          href="/appointment"
          className="group/btn relative overflow-hidden bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center transition-all duration-300 hover:bg-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-[0.98] w-full"
        >
          <span className="relative z-10 flex items-center gap-3">
            Book Appointment
            <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

/* ========== MAIN PAGE ========== */

export default function ServicesPage() {
  const services = [
    {
      category: "Home Patient Care Services",
      title: "Nursing Care at Home",
      availability: "Available 24/7",
      description: "Our qualified nurses provide medical care such as:",
      features: ["Injection administration", "IV fluids and medication", "Wound dressing", "Vital monitoring", "Post-surgery care", "Medical supervision"],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-500 selection:text-white pb-20">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white py-24 md:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-white rounded-full shadow-lg shadow-emerald-100 text-emerald-600 font-black text-xs md:text-sm uppercase tracking-[0.2em] mb-8 border border-emerald-50"
          >
            Empowering Health at Home
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tight"
          >
            Professional <br /> <span className="text-emerald-500">Care Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            High-quality medical assistance and elder care tailored for comfort, dignity, and recovery.
          </motion.p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-6 block">What We Offer</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">Expert Healthcare, <br />Personal Approach.</h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-8">
              We provide professional home healthcare services for patients who need medical assistance and care after hospitalization or during long-term illness.
            </p>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Our compassionate elder care services are designed to support senior citizens in maintaining a comfortable and dignified lifestyle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["Home Patient Care", "Elder Care Services", "Attendant Care", "Available 24/7"].map(item => (
                <div key={item} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-200">✓</div>
                  <span className="font-extrabold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 md:order-2"
          >
            <div className="absolute inset-0 bg-emerald-500 rounded-[40px] rotate-3 -z-10 opacity-10 group-hover:rotate-6 transition-transform" />
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=800&fit=crop"
              alt="Home Care"
              className="rounded-[40px] shadow-2xl relative z-10 w-full"
            />
            <div className="absolute -bottom-10 -left-10 md:bottom-10 md:left-10 bg-slate-900 text-white p-10 rounded-[32px] shadow-2xl z-20 hidden sm:block">
              <h3 className="text-5xl font-black mb-1 text-emerald-500">500+</h3>
              <p className="text-sm font-bold opacity-70 uppercase tracking-widest">Happy Families</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN SERVICES LIST ── */}
      <section className="py-24 md:py-32 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-4 block">Our Specialties</span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900">Medical Excellence</h2>
          </div>

          <div className="space-y-32">
            {Object.entries(
              services.reduce((acc, service) => {
                const cat = service.category || "Other";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(service);
                return acc;
              }, {} as any)
            ).map(([category, items]: any, catIndex: number) => (
              <div key={category} className="space-y-12">
                <div className="flex items-center gap-6">
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 flex items-center gap-4">
                    <span className="w-12 h-1 bg-emerald-500 rounded-full" />
                    {category}
                  </h3>
                  <div className="flex-grow h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16">
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
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-4 block">Why Us</span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900">The Vriddhicare Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { icon: "👨‍⚕️", title: "Experienced Teams", desc: "100+ trained and government-certified nurses and caregivers with years of clinical experience." },
              { icon: "⭐", title: "7+ Years Legacy", desc: "A track record of excellence in home healthcare since our founding." },
              { icon: "💚", title: "500+ Patients", desc: "Successfully managed high-acuity cases and complex elder care requirements with success." },
              { icon: "📋", title: "Bespoke Care", desc: "Each medical plan is unique, crafted specifically for the patient's physiological and emotional needs." },
              { icon: "🏡", title: "Clinical Support at Home", desc: "We bridge the gap between hospital discharge and full recovery in the comfort of home." },
              { icon: "💎", title: "Premium Standards", desc: "Hospital-grade care protocols delivered through a lens of compassion and empathy." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12 }}
                className="p-12 bg-gray-50 rounded-[40px] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/10 group"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-xl shadow-gray-200/50 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARE PROCESS ── */}
      <section className="py-24 md:py-32 bg-slate-900 text-white rounded-[60px] md:rounded-[100px] my-10 mx-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,theme(colors.emerald.500),transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <span className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-4 block">Our Process</span>
            <h2 className="text-4xl md:text-7xl font-black">How We Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Consultation", text: "In-depth health assessment by our experts." },
              { num: "02", title: "Strategy", text: "Designing a personalized 24/7 care roadmap." },
              { num: "03", title: "Deployment", text: "Assigning the most compatible caregiver." },
              { num: "04", title: "Optimization", text: "Real-time monitoring and medical feedback." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start group">
                <div className="text-7xl font-black text-emerald-500/20 mb-6 group-hover:text-emerald-500/100 transition-colors duration-500">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-400 text-lg font-medium text-center md:text-left">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 md:py-48 text-center bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-9xl font-black text-slate-900 mb-12 leading-none">Ready for <br /> <span className="text-emerald-500">Better Care?</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/appointment" className="px-12 py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-emerald-500 transition-all shadow-2xl hover:shadow-emerald-200 text-xl active:scale-95">Book Consultation</Link>
            <a href="tel:+919860802592" className="px-12 py-6 border-4 border-slate-900 text-slate-900 font-black rounded-3xl hover:bg-slate-900 hover:text-white transition-all text-xl active:scale-95">Support Hotline</a>
          </div>
        </div>
      </section>

      {/* ── FLOAT BUTTONS ── */}
      {/* <a href="https://api.whatsapp.com/send/?phone=%2B919860802592&text&type=phone_number&app_absent=0" target="_blank" className="fixed bottom-8 right-8 w-20 h-20 bg-[#25D366] rounded-3xl flex items-center justify-center shadow-2xl z-[999] transition-transform hover:scale-110 active:scale-95 animate-bounce-slow">
        <span className="text-white text-4xl">💬</span>
      </a> */}

      {/* <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-32 right-10 w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 z-[998] hover:-translate-y-2 border border-gray-100 font-black opacity-100"
      >
        ↑
      </button> */}

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1.05); }
          50% { transform: translateY(-10px) scale(1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}