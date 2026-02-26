'use client';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useRef } from 'react';

/* ========== SUB-COMPONENTS ========== */

/**
 * Animated Counter Component
 * Replaces the animateCounter function in about.js
 */
const Counter = ({ target, label, suffix = '+' }: { target: number; label: string; suffix?: string }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(0, target, {
        duration: 2,
        onUpdate: (value) => {
          if (node) (node as HTMLElement).textContent = Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, suffix]);

  return (
    <div className="text-center p-5 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:-translate-y-1 transition-all duration-300 group">
      <div ref={nodeRef} className="text-4xl font-bold text-emerald-500 mb-2 group-hover:scale-110 transition-transform">
        0{suffix}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

const TeamCard = ({ name, specialty, education, experience, img }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="relative h-80 overflow-hidden rounded-2xl mb-5">
      <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-emerald-500/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {['in', 'tw', '✉'].map((icon) => (
          <button key={icon} className="w-11 h-11 bg-white text-emerald-500 rounded-full flex items-center justify-center font-bold hover:-translate-y-1 transition-transform shadow-lg">
            {icon}
          </button>
        ))}
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-emerald-500 font-semibold mb-2">{specialty}</p>
      <p className="text-sm text-gray-500">{education}</p>
      <p className="text-xs text-gray-400 mt-1">{experience}</p>
    </div>
  </motion.div>
);

/* ========== MAIN PAGE ========== */

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* ── TOP BAR ── */}
      <div className="hidden lg:block bg-emerald-700 text-white py-2 text-sm">
        <div className="container mx-auto px-5 flex justify-between items-center">
          <div className="flex gap-8">
            <span>📞 +1 (555) 123-4567</span>
            <span>✉️ info@healthcareplus.com</span>
            <span>🕐 Mon - Sat: 8:00 AM - 8:00 PM</span>
          </div>
          <div className="flex gap-3">
            {['f', 'in', 'tw', 'ig'].map(social => (
              <a key={social} href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-emerald-600 transition-all font-bold">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className={`sticky top-0 z-[1000] bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-3' : 'py-5'}`}>
        <div className="container mx-auto px-5 flex justify-between items-center">
          <Link href="/">
            <img src="/log.png" alt="Logo" className="h-14 w-auto drop-shadow-md" />
          </Link>

          <ul className={`fixed lg:static top-[70px] left-0 w-full lg:w-auto h-screen lg:h-auto bg-white flex flex-col lg:flex-row p-10 lg:p-0 gap-8 transition-all duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                  className={`text-lg lg:text-base font-medium transition-colors hover:text-emerald-500 ${item === 'About Us' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-600'}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Link href="/appointment" className="hidden sm:block px-7 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all shadow-md">Book Appointment</Link>
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
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5">
            <Link href="/" className="hover:text-emerald-500">Home</Link>
            <span>/</span>
            <span className="text-emerald-500 font-semibold">About Us</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            About HealthCare Plus
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
          >
            Committed to excellence in healthcare for over 20 years
          </motion.p>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">WHO WE ARE</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Leading Healthcare Provider Since 2004</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              HealthCare Plus has been at the forefront of providing exceptional medical care for over two decades. Our commitment to patient-centered care, combined with state-of-the-art facilities and experienced medical professionals, makes us the trusted choice for families across the region.
            </p>
            <div className="grid grid-cols-2 gap-5">
              <Counter target={20} label="Years of Experience" />
              <Counter target={50} label="Expert Doctors" />
              <Counter target={15000} label="Happy Patients" />
              <Counter target={98} label="Success Rate" suffix="%" />
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop" 
              alt="Hospital" 
              className="rounded-2xl shadow-2xl w-full"
            />
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4 border-l-4 border-emerald-500"
            >
              <span className="text-4xl">🏆</span>
              <div>
                <h4 className="font-bold text-gray-800">Award Winning</h4>
                <p className="text-emerald-500 text-sm">Healthcare Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-5 grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎯", title: "Our Mission", text: "To provide compassionate, accessible, and high-quality healthcare services to our community through innovative medical practices." },
            { icon: "👁️", title: "Our Vision", text: "To be recognized as the leading healthcare provider in the region, known for medical innovation and community health improvement." },
            { icon: "💎", title: "Our Values", text: "Compassion, Excellence, Integrity, Innovation, and Respect guide everything we do and maintain the highest standards." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl text-center border-2 border-transparent hover:border-emerald-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Our Team</span>
            <h2 className="text-4xl font-bold mt-2">Meet Our Expert Doctors</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Our dedicated team of healthcare professionals is here to serve you with expertise and compassion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { name: "Dr. Sarah Johnson", specialty: "Chief Cardiologist", education: "MD, FACC - Harvard Medical School", experience: "15 years experience", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop" },
              { name: "Dr. Michael Chen", specialty: "Senior Neurologist", education: "MD, PhD - Johns Hopkins University", experience: "12 years experience", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop" },
              { name: "Dr. Emily Brown", specialty: "Pediatric Specialist", education: "MD, FAAP - Stanford Medical School", experience: "10 years experience", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop" },
              { name: "Dr. James Wilson", specialty: "Orthopedic Surgeon", education: "MD, FAAOS - Yale School of Medicine", experience: "18 years experience", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" }
            ].map((doc, idx) => (
              <TeamCard key={idx} {...doc} />
            ))}
          </div>
        </div>
      </section>
      /* ========== FACILITIES SECTION ========== */
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-5">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">
        OUR FACILITIES
      </span>
      <h2 className="text-4xl font-bold text-gray-900">
        State-of-the-Art Medical Facilities
      </h2>
      <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
        We invest in the latest medical technology to provide you with the best care possible in a comfortable environment.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "Modern Operating Rooms",
          desc: "Equipped with advanced surgical technology and monitoring systems for safe procedures.",
          img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&h=300&fit=crop",
        },
        {
          title: "Intensive Care Unit",
          desc: "24/7 critical care with state-of-the-art monitoring and life support systems.",
          img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&h=300&fit=crop",
        },
        {
          title: "Diagnostic Laboratory",
          desc: "Advanced lab equipment for accurate and rapid diagnostic testing and analysis.",
          img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=300&fit=crop",
        },
        {
          title: "Comfortable Patient Rooms",
          desc: "Private and semi-private rooms designed for patient comfort and speedy recovery.",
          img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=300&fit=crop",
        },
      ].map((facility, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={facility.img}
              alt={facility.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{facility.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{facility.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ── TIMELINE ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-bold text-sm">OUR JOURNEY</span>
            <h2 className="text-4xl font-bold mt-2">20 Years of Excellence</h2>
          </div>
          <div className="relative max-w-4xl mx-auto before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-emerald-100 before:-translate-x-1/2 hidden md:block">
            {[
              { year: "2004", title: "Foundation", text: "HealthCare Plus was established with a vision to provide quality healthcare." },
              { year: "2010", title: "Expansion", text: "Opened our specialized cardiac care center with advanced diagnostic equipment." },
              { year: "2015", title: "Recognition", text: "Received national healthcare excellence award for patient care and innovation." },
              { year: "2024", title: "Present Day", text: "Continuing our mission with 50+ specialists serving 15,000+ patients." }
            ].map((milestone, idx) => (
              <div key={idx} className={`relative flex items-center mb-16 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-md z-10" />
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`w-[45%] p-8 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}
                >
                  <h3 className="text-3xl font-bold text-emerald-500 mb-2">{milestone.year}</h3>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{milestone.title}</h4>
                  <p className="text-sm text-gray-500">{milestone.text}</p>
                </motion.div>
              </div>
            ))}
          </div>
          {/* Mobile Timeline View */}
          <div className="md:hidden space-y-8">
             {/* Simple list for mobile... */}
          </div>
        </div>
      </section>
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-5">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">
        PATIENT STORIES
      </span>
      <h2 className="text-4xl font-bold text-gray-900">What Our Patients Say</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Jennifer Smith",
          role: "Cardiac Patient",
          text: "The care I received at HealthCare Plus was exceptional. The doctors are knowledgeable, the staff is friendly, and the facilities are top-notch. I wouldn't trust my health to anyone else.",
          img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        },
        {
          name: "Robert Williams",
          role: "General Care Patient",
          text: "From emergency care to follow-up appointments, every interaction has been professional and caring. The medical team truly goes above and beyond for their patients.",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
          name: "Maria Garcia",
          role: "Pediatric Parent",
          text: "As a parent, finding the right healthcare for my children is crucial. Dr. Brown and the pediatric team have been wonderful - professional, patient, and truly caring.",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
      ].map((testimonial, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
          <p className="text-gray-500 italic leading-relaxed mb-8">
            "{testimonial.text}"
          </p>
          <div className="flex items-center gap-4">
            <img
              src={testimonial.img}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
              <p className="text-xs text-emerald-500 font-medium">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ── CTA ── */}
      <section className="bg-emerald-600 py-16">
        <div className="container mx-auto px-5 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Family of Satisfied Patients</h2>
          <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto">Experience the difference that compassionate, expert healthcare can make</p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:shadow-2xl transition-all">Schedule Appointment</button>
            <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-all">Contact Us</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER (Consistent across pages) ── */}
     <footer className="bg-slate-900 text-white pt-20">
  <div className="container mx-auto px-5">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
      {/* Brand Column */}
      <div>
        <div className="flex items-center gap-2 text-2xl font-bold text-emerald-500 mb-6">
          <span className="w-10 h-10 bg-emerald-500 text-white flex items-center justify-center rounded-lg">+</span>
          HealthCare Plus
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Providing quality healthcare services with compassion and excellence. Your health is our priority.
        </p>
        <div className="flex gap-4">
          {['f', 'in', 't', 'i'].map((social) => (
            <div
              key={social}
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 cursor-pointer transition-all"
            >
              <span className="text-xs font-bold uppercase">{social}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-lg font-bold mb-8">Quick Links</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          {['Home', 'Services', 'About Us', 'Contact'].map((link) => (
            <li key={link}>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Services Links */}
      <div>
        <h4 className="text-lg font-bold mb-8">Services</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          {['Emergency Care', 'Cardiology', 'Laboratory', 'Pharmacy', 'Health Checkup'].map((service) => (
            <li key={service}>
              <Link href="#" className="hover:text-emerald-500 transition-colors">
                {service}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-lg font-bold mb-8">Contact Info</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="flex gap-3">
            <span className="text-emerald-500">📍</span>
            123 Medical Center Drive, NY 10001
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">📞</span>
            +1 (555) 123-4567
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">✉️</span>
            info@healthcareplus.com
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">🕐</span>
            Mon-Sat: 8:00 AM - 8:00 PM
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="py-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
      <p>© 2026 HealthCare Plus. All rights reserved.</p>
      <div className="flex gap-6">
        <Link href="#" className="hover:text-emerald-500">Privacy Policy</Link>
        <Link href="#" className="hover:text-emerald-500">Terms of Service</Link>
        <Link href="#" className="hover:text-emerald-500">Cookie Policy</Link>
      </div>
    </div>
  </div>
</footer>

      {/* ── FLOATERS ── */}
      <a href="#" className="fixed bottom-8 right-8 w-15 h-15 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl z-[999] hover:scale-110 transition-transform animate-bounce">
         <span className="text-white text-3xl">💬</span>
      </a>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-28 right-9 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-[998] ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        ↑
      </button>
    </div>
  );
}