'use client';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useRef } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Top Rated Home Healthcare Provider in Nagpur",
  description: "Learn about Vriddhi Care, a dedicated team of over 100 certified caregivers providing 24/7 home nursing, post-surgery care, and elder assistance in Nagpur.",
  keywords: ["About Vriddhi Care", "Home Nursing Agency Nagpur", "Elderly Care Agency", "Best Healthcare in Nagpur"],
  alternates: {
    canonical: '/aboutus',
  },
};

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
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden pb-20">

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
            About Vriddhicare
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
          >
            Committed to excellence in home healthcare for over 7 years
          </motion.p>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">WHO WE ARE</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Dedicated to Caring for Your Loved Ones</h2>
            <div className="text-gray-500 leading-relaxed mb-6 space-y-4">
              <p>
                We are a trusted provider of home patient care and elder care services, committed to improving the quality of life for patients and senior citizens who need professional assistance at home.
              </p>
              <p>
                For the past 7 years, we have been helping families by providing skilled nurses, trained caregivers, and compassionate attendants who ensure proper medical support and daily assistance.
              </p>
              <p>
                Our team consists of 100+ government-certified nurses and healthcare assistants who are highly experienced in managing patient routines, post-hospitalization care, elderly support, and long-term care.
              </p>
              <p>
                Having served 500+ patients, we have built a strong reputation for providing reliable and compassionate care that families can trust.
              </p>
              <p className="font-bold text-gray-800 text-lg pt-2 border-t border-gray-100">
                Our goal is simple:<br />To bring hospital-quality care to the comfort of your home.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Counter target={7} label="Years of Experience" />
              <Counter target={100} label="Certified Caregivers" />
              <Counter target={500} label="Happy Patients" />
              <Counter target={100} label="Commitment" suffix="%" />
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
        <div className="container mx-auto px-5 grid md:grid-cols-2 gap-8 justify-center">
          {[
            {
              icon: "👁️",
              title: "Our Vision",
              text: "To become a trusted leader in home healthcare and elder care services, delivering compassionate, reliable, and high-quality care that enhances the dignity, comfort, and independence of patients and senior citizens."
            },
            {
              icon: "🎯",
              title: "Our Mission",
              text: "Our mission is to provide professional and personalized home healthcare services that improve the lives of patients and elderly individuals by:",
              list: [
                "Delivering compassionate care with respect and dignity",
                "Providing trained and certified healthcare professionals",
                "Ensuring safety, comfort, and emotional support",
                "Helping families manage patient care with confidence",
                "Promoting healthy and independent living for seniors"
              ]
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl text-center border-2 border-transparent hover:border-emerald-500 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <div className="text-gray-500 leading-relaxed text-sm text-left w-full flex flex-col justify-center h-full">
                <p className={item.list ? "mb-4" : "text-center"}>{item.text}</p>
                {item.list && (
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    {item.list.map((li, i) => <li key={i}>{li}</li>)}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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
            <h2 className="text-4xl font-bold mt-2">7+ Years of Excellence</h2>
          </div>
          <div className="relative max-w-4xl mx-auto before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-emerald-100 before:-translate-x-1/2 hidden md:block">
            {[
              { year: "2017", title: "Foundation", text: "Vriddhicare was established with a vision to provide quality healthcare at home." },
              { year: "2019", title: "Expansion", text: "Expanded our team to 100+ certified caregivers across Nagpur." },
              { year: "2022", title: "Recognition", text: "Received recognition for our excellence in post-hospitalization care." },
              { year: "2024", title: "Present Day", text: "Continuing our mission to serve 500+ happy families with professional care." }
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
                name: "Rahul Sharma",
                role: "Patient - Nagpur",
                text: "The caregivers were extremely professional and compassionate while taking care of my father after his surgery. Their dedication made a huge difference in his recovery.",
                img: "",
              },
              {
                name: "Meena Patil",
                role: "Patient - Nagpur",
                text: "We were worried about leaving our elderly mother alone at home, but their caregiver treated her like family. We are very thankful for their support.",
                img: "",
              },
              {
                name: "Amit Deshmukh",
                role: "Patient - Nagpur",
                text: "The nursing staff is very well trained and responsible. They took excellent care of my grandfather. Highly recommended.",
                img: "",
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
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 font-bold uppercase">
                    {testimonial.name.split(' ').map(n=>n[0]).join('')}
                  </div>
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
            <Link href="/appointment" className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:shadow-2xl transition-all">Schedule Appointment</Link>
            <Link href="/contact" className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-all">Contact Us</Link>
          </div>
        </div>
      </section>

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