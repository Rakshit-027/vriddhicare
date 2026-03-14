'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Vriddhi Care | Home Healthcare Services in Nagpur",
  description: "Get in touch with Vriddhi Care for 24/7 home nursing, elder care, and medical assistance in Nagpur. Call us at +91 9860802592.",
  keywords: ["Contact Vriddhi Care", "Vriddhi Care Phone Number", "Home Healthcare Near Me", "Nagpur Home Nursing"],
  alternates: {
    canonical: '/contact',
  },
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">

      {/* ── FULLSCREEN LOADER ── */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-emerald-100"
            >
              <div className="flex gap-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-200"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <p className="text-gray-700 font-bold text-lg">Sending Message...</p>
              <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            { icon: '📞', title: 'Call Us', info: '+91 9860802592, 9158393859', sub: 'Mon-Sat 8AM-8PM' },
            { icon: '✉️', title: 'Email Us', info: 'vriddhicare@gmail.com', sub: 'Response within 24h' },
            { icon: '📍', title: 'Visit Us', info: '101, Vanashree Apt, Nagpur', sub: 'Nagpur 440022' },
            { icon: '🕐', title: 'Hours', info: '24/7 Care & Support', sub: 'Always open' },
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
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=101,%20Vanashree%20Apartment,%20IT%20Park%20Road,%20Gayatri%20Nagar,%20Nagpur+(Vriddhicare)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              ></iframe>
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
            <a href="tel:+919860802592" className="bg-white text-red-600 px-10 py-4 rounded-xl font-black text-xl hover:scale-105 transition-transform">CALL NOW</a>
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
          <FAQItem question="Do you provide home nursing?" answer="Yes, we provide professional nursing care, post-hospitalization care, and ICU setup at your home." />
          <FAQItem question="What are your working hours?" answer="Our healthcare services and emergency hotline are available 24/7." />
        </div>
      </section>

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
    </div>
  );
}