'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AppointmentBooking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', message: ''
  });

  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(data.message || 'Failed to request appointment. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Confirmed!</h2>
          <p className="text-slate-500 mb-8">Your request for {formData.date} at {formData.time} has been received. Check your email for details.</p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
            Make Another Booking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
      <nav className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
          <span className="font-black text-xl tracking-tight">Health<span className="text-emerald-500">Care</span></span>
        </Link>
        <div className="hidden md:flex bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100 gap-8 text-sm font-medium text-slate-500">
          <span className={step >= 1 ? "text-emerald-600 font-bold" : ""}>01 Details</span>
          <span className={step >= 2 ? "text-emerald-600 font-bold" : ""}>02 Schedule</span>
          <span className={step >= 3 ? "text-emerald-600 font-bold" : ""}>03 Confirm</span>
        </div>
      </nav>

      <main className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 px-6 mt-8 items-start">
        {/* Left Side: Info */}
        <div className="pt-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-emerald-600 font-bold tracking-widest uppercase text-xs"
          >
            Streamlined Experience
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 mt-4 mb-6 leading-[1.1]"
          >
            Care that <br /> <span className="text-emerald-500 italic">moves</span> with you.
          </motion.h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md">
            Skip the waiting room. Book your next consultation in less than 60 seconds with our instant scheduling system.
          </p>
          
          <div className="mt-12 space-y-4">
            {['Expert Doctors', 'Instant Confirmation', 'Secure Data'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                <CheckCircle2 size={20} className="text-emerald-500" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-50">
            <motion.div 
              className="h-full bg-emerald-500" 
              initial={{ width: "33%" }} 
              animate={{ width: `${(step / 3) * 100}%` }} 
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                      <input 
                        type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                      <input 
                        type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                      <input 
                        type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button type="button" onClick={nextStep} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Next Step <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                      <ArrowLeft size={16} /> GO BACK
                    </button>
                    <h2 className="text-2xl font-bold">Pick a Schedule</h2>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="date" name="date" min={minDate} required value={formData.date} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all appearance-none"
                      />
                    </div>
                    
                    <label className="block text-sm font-bold text-slate-500 mt-4">Available Slots</label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((t) => (
                        <button
                          key={t} type="button"
                          onClick={() => setFormData({...formData, time: t})}
                          className={`py-3 rounded-xl border-2 font-bold transition-all ${formData.time === t ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100' : 'bg-white border-slate-100 text-slate-600 hover:border-emerald-200'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    disabled={!formData.date || !formData.time}
                    onClick={nextStep} 
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                      <ArrowLeft size={16} /> GO BACK
                    </button>
                    <h2 className="text-2xl font-bold">Final Notes</h2>
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                      <textarea 
                        name="message" rows="4" placeholder="Briefly describe your health concern..." value={formData.message} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all resize-none"
                      />
                    </div>
                    
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Selected Date:</span>
                        <span className="font-bold text-emerald-700">{formData.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Selected Time:</span>
                        <span className="font-bold text-emerald-700">{formData.time}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </main>
    </div>
  );
}