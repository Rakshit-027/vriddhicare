'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ========== COMPONENTS ========== */

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-emerald-500/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <span className={`text-2xl text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-500 leading-relaxed text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========== MAIN PAGE ========== */

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(true);
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to submit form.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ── TOP BAR & NAVBAR (Consistent with Home/About) ── */}
      <div className="hidden lg:block bg-emerald-700 text-white py-2.5 text-sm">
        <div className="container mx-auto px-5 flex justify-between items-center">
          <div className="flex gap-8">
            <span>📞 +1 (555) 123-4567</span>
            <span>✉️ info@healthcareplus.com</span>
          </div>
          <div className="flex gap-4">
            {['f', 'in', 'tw', 'ig'].map(s => <span key={s} className="cursor-pointer hover:opacity-70">{s}</span>)}
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-[1000] bg-white transition-all ${scrolled ? 'shadow-lg py-3' : 'py-5'}`}>
        <div className="container mx-auto px-5 flex justify-between items-center">
          <Link href="/"><img src="/log.png" alt="Logo" className="h-14" /></Link>
          <ul className={`fixed lg:static top-20 left-0 w-full lg:w-auto h-screen lg:h-auto bg-white flex flex-col lg:flex-row p-10 lg:p-0 gap-8 transition-all duration-300 ${menuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}`}>
            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className={`font-medium hover:text-emerald-500 ${item === 'Contact' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-600'}`}>{item}</Link>
              </li>
            ))}
          </ul>
          <button className="hidden sm:block bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-600">Book Appointment</button>
        </div>
      </nav>

      {/* ── PAGE HEADER ── */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-20 text-center">
        <div className="container mx-auto px-5">
          <div className="flex justify-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/">Home</Link><span>/</span><span className="text-emerald-500 font-bold">Contact Us</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-500 text-lg">We're here to help and answer any questions you might have</p>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="relative z-10 -mt-12 container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '📞', title: 'Call Us', info: '+1 (555) 123-4567', sub: 'Mon-Sat 8AM-8PM' },
            { icon: '✉️', title: 'Email Us', info: 'info@healthcareplus.com', sub: 'Response within 24h' },
            { icon: '📍', title: 'Visit Us', info: '123 Medical Center Dr', sub: 'New York, NY 10001' },
            { icon: '🕐', title: 'Hours', info: '8:00 AM - 8:00 PM', sub: 'Sun: Emergency Only' },
          ].map((card, i) => (
            <motion.div
              key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center hover:-translate-y-2 transition-transform border border-gray-50"
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-emerald-500 font-semibold text-sm mb-1">{card.info}</p>
              <p className="text-gray-400 text-xs">{card.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM & MAP ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-16">
          <div className="bg-white">
            <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold mb-4 inline-block tracking-wider">SEND MESSAGE</span>
            <h2 className="text-4xl font-bold mb-6">Contact Our Support Team</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">First Name *</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Last Name *</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subject *</label>
                <select required name="subject" value={formData.subject} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-all bg-white">
                  <option value="">Select a subject</option>
                  <option value="appointment">Appointment Booking</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message *</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-emerald-500 text-white p-4 rounded-xl font-bold hover:bg-emerald-600 transition-all flex justify-center items-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              ></iframe>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl grid grid-cols-1 gap-6">
              <div className="flex gap-4">
                <span className="text-2xl">🚗</span>
                <div><h4 className="font-bold">Free Parking</h4><p className="text-sm text-gray-500">Available for all visitors</p></div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">♿</span>
                <div><h4 className="font-bold">Accessible</h4><p className="text-sm text-gray-500">Full wheelchair accessibility</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY CONTACT ── */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl shadow-red-200">
            <div className="flex items-center gap-6">
              <span className="text-6xl animate-pulse">🚨</span>
              <div>
                <h2 className="text-3xl font-bold mb-2">In Case of Emergency</h2>
                <p className="opacity-90">Our 24/7 hotline is always open for immediate assistance</p>
              </div>
            </div>
            <a href="tel:911" className="bg-white text-red-600 px-10 py-4 rounded-xl font-black text-xl hover:scale-105 transition-transform">CALL 911</a>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find quick answers to common inquiries</p>
          </div>
          <FAQItem question="How do I schedule an appointment?" answer="You can schedule via our online booking portal, call our hotline, or visit the front desk during working hours." />
          <FAQItem question="Do you accept health insurance?" answer="Yes, we accept most major providers. Please bring your insurance card during your first visit for verification." />
          <FAQItem question="What are your visiting hours?" answer="Our general visiting hours are 8:00 AM to 8:00 PM, Monday through Saturday." />
        </div>
      </section>

      {/* ── FOOTER ── */}
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

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[10001] flex items-center justify-center p-5"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 rounded-3xl text-center max-w-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-emerald-500 text-white text-4xl flex items-center justify-center rounded-full mx-auto mb-6">✓</div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-500 mb-8">Thank you for reaching out. We will contact you within 24 hours.</p>
              <button onClick={() => setShowModal(false)} className="bg-emerald-500 text-white w-full py-4 rounded-xl font-bold hover:bg-emerald-600">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-10 right-10 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-2xl cursor-pointer hover:scale-110 transition-transform">💬</div>
    </div>
  );
}