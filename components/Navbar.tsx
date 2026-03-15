'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="hidden lg:block bg-slate-900 text-white py-3 text-sm font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-8 items-center">
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">📞</span> +91 9860802592, 9158393859
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">✉️</span> vriddhicare@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-500 text-lg">🕐</span> 24/7 Care & Support
            </span>
          </div>
          <div className="flex gap-4">
            {[
              { id: 'f', label: 'FB', link: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=61579528226152' },
              { id: 'in', label: 'IN', link: 'https://linkedin.com' },
              { id: 't', label: 'TW', link: 'https://twitter.com' },
              { id: 'i', label: 'IG', link: 'https://www.instagram.com/vriddhicare?igsh=eWhodnkxNmlzbjlj' }
            ].map(s => (
              <a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all border border-white/10 text-[10px] font-bold">{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className={`sticky top-0 z-[1000] bg-white transition-all duration-500 ${scrolled ? 'shadow-xl py-2' : 'py-4 shadow-sm'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="transition-transform active:scale-95">
            <img src="/log.png" alt="Logo" className={`transition-all duration-500 ${scrolled ? 'h-20' : 'h-24'} w-auto`} />
          </Link>

          <ul className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-screen lg:h-auto bg-white/95 lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-0 flex flex-col lg:flex-row items-center justify-center lg:p-0 gap-10 lg:gap-12 transition-all duration-500 z-[1001] ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <button className="lg:hidden absolute top-8 right-8 text-3xl text-emerald-500" onClick={() => setMenuOpen(false)}>×</button>
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative text-2xl lg:text-base font-bold transition-all hover:text-emerald-500 group ${pathname === item.href ? 'text-emerald-500' : 'text-slate-600'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 h-1 bg-emerald-500 transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 md:gap-6">
            <Link href="/appointment" className="inline-flex px-4 md:px-8 py-2.5 md:py-3.5 bg-slate-900 text-white text-[10px] sm:text-xs md:text-base font-black rounded-xl md:rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-gray-200 hover:shadow-emerald-200 active:scale-95">Book Appointment</Link>
            <button className="lg:hidden w-10 md:w-12 h-10 md:h-12 flex flex-col items-center justify-center gap-1 md:gap-1.5 bg-gray-50 rounded-xl" onClick={() => setMenuOpen(true)}>
              <span className="w-6 h-1 bg-emerald-500 rounded-full" />
              <span className="w-4 h-1 bg-emerald-500 rounded-full" />
              <span className="w-6 h-1 bg-emerald-500 rounded-full" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
