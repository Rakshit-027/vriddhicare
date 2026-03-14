'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-32 pb-12 rounded-t-[60px] md:rounded-t-[100px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-20 border-b border-white/5">
          <div className="space-y-6">
            <img src="/log.png" alt="Logo" className="h-28 lg:h-32 w-auto brightness-0 invert lg:-mt-6 -ml-2" />
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Redefining home healthcare with expertise, empathy, and innovation since 2019.</p>
            <div className="flex gap-4">
              {[
                { id: 'f', label: 'FB' },
                { id: 'in', label: 'IN' },
                { id: 't', label: 'TW' },
                { id: 'i', label: 'IG' }
              ].map(s => (
                <div key={s.id} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black hover:bg-emerald-500 transition-all cursor-pointer border border-white/10 text-[10px]">{s.label}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black mb-10">Navigation</h4>
            <ul className="space-y-5 text-slate-400 font-bold text-lg">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'About Us', href: '/aboutus' },
                { name: 'Contact', href: '/contact' },
              ].map(l => (
                <li key={l.name}><Link href={l.href} className="hover:text-emerald-500 transition-all">{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-black mb-10">Offerings</h4>
            <ul className="space-y-5 text-slate-400 font-bold text-lg">
              {['Nursing Care', 'Elder Assist', 'ICU Home', 'Physiotherapy'].map(s => (
                <li key={s}><Link href="/services" className="hover:text-emerald-500 transition-all">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-black mb-10">Headquarters</h4>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex gap-4 italic font-bold text-blue-100 uppercase text-xs tracking-widest">Vriddhicare Healthcare Services</li>
              <li className="flex gap-4">📍 101, Vanashree Apartment, Nagpur. 440022</li>
              <li className="flex gap-4">📞 +91 9860802592, 9158393859</li>
              <li className="flex gap-4">🕐 24/7 Global Response</li>
            </ul>
          </div>
        </div>
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center text-slate-500 font-bold gap-6">
          <p>© 2026 Vriddhicare. Crafted for Excellence.</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
