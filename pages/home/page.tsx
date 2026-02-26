'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ========== TYPES ========== */
interface StatItem {
  target: number;
  label: string;
}

/* ========== COUNTER HOOK ========== */
function useCounterAnimation(target: number, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let current = 0;
    const speed = target / 100;
    const interval = setInterval(() => {
      current += speed;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(interval);
  }, [triggered, target]);

  return count;
}

/* ========== STAT COUNTER COMPONENT ========== */
function StatCounter({ target, label, triggered }: StatItem & { triggered: boolean }) {
  const count = useCounterAnimation(target, triggered);
  return (
    <div className="stat-item">
      <h3 className="stat-number">{triggered ? `${count}+` : '0'}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
}

/* ========== MAIN COMPONENT ========== */
export default function HealthcarePlus() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const heroStatsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  /* ── Scroll effects ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Counter observer ── */
  useEffect(() => {
    if (!heroStatsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsTriggered(true); },
      { threshold: 0.5 }
    );
    observer.observe(heroStatsRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Fade-in card observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.cardId;
            if (id) setVisibleCards((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Keyboard: close menu on Escape ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  const registerCard = (id: string) => (el: HTMLElement | null) => {
    if (el) cardRefs.current.set(id, el);
  };

  const cardStyle = (id: string): React.CSSProperties => ({
    opacity: visibleCards.has(id) ? 1 : 0,
    transform: visibleCards.has(id) ? 'translateY(0)' : 'translateY(30px)',
    transition: '0.6s ease',
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        /* ===== RESET ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; color: #1f2937; line-height: 1.6; overflow-x: hidden; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* ===== TOP BAR ===== */
        .top-bar { background: #059669; color: white; padding: 10px 0; font-size: 14px; }
        .top-bar-content { display: flex; justify-content: space-between; align-items: center; }
        .contact-info { display: flex; gap: 30px; }
        .contact-info span { display: flex; align-items: center; gap: 8px; }
        .social-links { display: flex; gap: 10px; }
        .social-icon { width: 30px; height: 30px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-weight: bold; transition: all 0.3s ease; }
        .social-icon:hover { background: white; color: #10B981; transform: translateY(-2px); }

        /* ===== NAVBAR ===== */
        .navbar { background: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 1000; transition: all 0.3s ease; }
        .navbar.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .nav-wrapper { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
        .logo { display: flex; align-items: center; text-decoration: none; }
        .logo-img { height: 70px; width: auto; filter: drop-shadow(0 0 8px rgba(34,211,238,0.5)); transition: transform 0.3s ease; }
        .logo:hover .logo-img { transform: scale(1.05); }
        .nav-menu { display: flex; list-style: none; gap: 35px; }
        .nav-link { text-decoration: none; color: #4b5563; font-weight: 500; transition: color 0.3s ease; position: relative; cursor: pointer; background: none; border: none; font-size: 1rem; }
        .nav-link:hover, .nav-link.active { color: #10B981; }
        .nav-link::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #10B981; transition: width 0.3s ease; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-actions { display: flex; align-items: center; gap: 20px; }
        .btn-appointment { background: #10B981; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-appointment:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(16,185,129,0.2); }
        .menu-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
        .menu-toggle span { width: 25px; height: 3px; background: #10B981; display: block; transition: all 0.3s ease; }

        /* ===== HERO ===== */
        .hero { padding: 140px 0 80px; background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%); position: relative; overflow: hidden; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #d1fae5; color: #065f46; padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; margin-bottom: 20px; }
        .badge-dot { width: 8px; height: 8px; background: #10B981; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        .hero-title { font-size: 52px; color: #1f2937; margin-bottom: 20px; line-height: 1.2; }
        .hero-description { font-size: 18px; color: #6b7280; margin-bottom: 30px; line-height: 1.8; }
        .hero-buttons { display: flex; gap: 20px; margin-bottom: 40px; }
        .btn { padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border: none; display: inline-flex; align-items: center; gap: 10px; }
        .btn-primary { background: #10B981; color: white; }
        .btn-primary:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(16,185,129,0.3); }
        .btn-secondary { background: transparent; color: #10B981; border: 2px solid #10B981; }
        .btn-secondary:hover { background: #f0fdf4; transform: translateY(-2px); }
        .play-icon { width: 30px; height: 30px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
        .hero-stats { display: flex; gap: 40px; }
        .stat-item { text-align: left; }
        .stat-number { font-size: 42px; font-weight: bold; color: #10B981; margin-bottom: 5px; }
        .stat-label { font-size: 14px; color: #6b7280; }
        .hero-image { position: relative; display: flex; justify-content: center; align-items: center; animation: fadeInRight 0.8s ease-out; }
        .hero-text { animation: fadeInLeft 0.8s ease-out; }
        .image-wrapper { position: relative; z-index: 2; }
        .main-image { width: 100%; max-width: 500px; height: auto; border-radius: 20px; box-shadow: 0 20px 60px rgba(16,185,129,0.2); }
        .image-badge { position: absolute; background: white; padding: 15px 20px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; z-index: 3; }
        .badge-1 { top: 20px; left: -20px; }
        .badge-2 { bottom: 40px; right: -20px; }
        .badge-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .badge-title { font-size: 16px; font-weight: 700; color: #1f2937; margin: 0; }
        .badge-text { font-size: 12px; color: #6b7280; margin: 0; }
        .floating-shapes { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1; pointer-events: none; }
        .shape { position: absolute; border-radius: 50%; background: rgba(16,185,129,0.1); }
        .shape-1 { width: 100px; height: 100px; top: 10%; right: 20%; animation: float 6s ease-in-out infinite; }
        .shape-2 { width: 150px; height: 150px; bottom: 20%; left: 10%; animation: float 8s ease-in-out infinite; animation-delay: 1s; }
        .shape-3 { width: 80px; height: 80px; top: 60%; right: 5%; animation: float 7s ease-in-out infinite; animation-delay: 2s; }

        /* ===== FEATURES MINI CARDS ===== */
        .features-section { padding: 0; margin-top: -50px; position: relative; z-index: 10; }
        .features-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .feature-mini-card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); text-align: center; transition: all 0.3s ease; cursor: pointer; }
        .feature-mini-card:hover { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(16,185,129,0.2); }
        .mini-icon { font-size: 40px; margin-bottom: 15px; }
        .feature-mini-card h4 { font-size: 18px; color: #1f2937; margin-bottom: 8px; }
        .feature-mini-card p { font-size: 14px; color: #6b7280; margin: 0; }

        /* ===== ABOUT ===== */
        .about-section { padding: 100px 0; background: white; }
        .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .about-image { position: relative; }
        .facility-image { width: 100%; height: auto; border-radius: 20px; box-shadow: 0 20px 60px rgba(16,185,129,0.15); }
        .experience-badge { position: absolute; top: 30px; right: 30px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(16,185,129,0.3); }
        .experience-badge h3 { font-size: 40px; margin-bottom: 5px; }
        .experience-badge p { font-size: 14px; margin: 0; }
        .about-stats { position: absolute; bottom: 30px; left: 30px; display: flex; gap: 20px; }
        .about-stat { background: white; padding: 20px 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
        .about-stat h4 { font-size: 28px; color: #10B981; margin-bottom: 5px; }
        .about-stat p { font-size: 13px; color: #6b7280; margin: 0; }
        .section-badge { display: inline-block; background: #d1fae5; color: #065f46; padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; margin-bottom: 15px; }
        .section-title { font-size: 40px; color: #1f2937; margin-bottom: 15px; }
        .section-description { font-size: 18px; color: #6b7280; max-width: 700px; margin: 0 auto 50px; }
        .about-description { font-size: 16px; color: #6b7280; margin-bottom: 30px; line-height: 1.8; }
        .about-features { margin-bottom: 30px; }
        .about-feature-item { display: flex; gap: 15px; margin-bottom: 20px; }
        .check-icon { width: 30px; height: 30px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
        .about-feature-item h4 { font-size: 18px; color: #1f2937; margin-bottom: 5px; }
        .about-feature-item p { font-size: 14px; color: #6b7280; margin: 0; }

        /* ===== SERVICES ===== */
        .services-section { padding: 80px 0; background: #F9FAFB; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .service-card { background: white; padding: 40px; border-radius: 15px; transition: all 0.3s ease; cursor: pointer; border: 2px solid transparent; }
        .service-card:hover { border-color: #10B981; transform: translateY(-10px); box-shadow: 0 20px 50px rgba(16,185,129,0.15); }
        .service-icon { width: 80px; height: 80px; background: #f0fdf4; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin-bottom: 25px; transition: all 0.3s ease; }
        .service-card:hover .service-icon { background: #10B981; transform: scale(1.1); }
        .service-card:hover .service-icon svg path { fill: white; }
        .service-title { font-size: 22px; color: #1f2937; margin-bottom: 15px; }
        .service-text { color: #6b7280; font-size: 15px; line-height: 1.7; margin-bottom: 20px; }
        .service-link { color: #10B981; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 5px; transition: gap 0.3s ease; }
        .service-link:hover { gap: 10px; }

        /* ===== DOCTORS ===== */
        .doctors-section { padding: 80px 0; background: white; }
        .doctors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
        .doctor-card { transition: transform 0.3s ease; }
        .doctor-card:hover { transform: translateY(-10px); }
        .doctor-image-wrapper { position: relative; width: 100%; height: 350px; overflow: hidden; border-radius: 15px; margin-bottom: 20px; }
        .doctor-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .doctor-card:hover .doctor-image { transform: scale(1.1); }
        .doctor-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(16,185,129,0.9); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
        .doctor-card:hover .doctor-overlay { opacity: 1; }
        .btn-view-profile { background: white; color: #10B981; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-view-profile:hover { transform: scale(1.05); }
        .doctor-info { text-align: center; }
        .doctor-name { font-size: 22px; color: #1f2937; margin-bottom: 8px; }
        .doctor-specialty { font-size: 16px; color: #10B981; font-weight: 600; margin-bottom: 5px; }
        .doctor-experience { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
        .doctor-rating { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .star { color: #FCD34D; font-size: 16px; }
        .rating-text { font-size: 14px; font-weight: 600; color: #1f2937; }

        /* ===== TESTIMONIALS ===== */
        .testimonials-section { padding: 80px 0; background: #F9FAFB; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .testimonial-card { background: white; padding: 35px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: all 0.3s ease; }
        .testimonial-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(16,185,129,0.1); }
        .testimonial-rating { color: #FCD34D; font-size: 20px; margin-bottom: 20px; }
        .testimonial-text { color: #6b7280; font-size: 15px; line-height: 1.8; margin-bottom: 25px; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 15px; }
        .author-image { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
        .author-name { font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 3px; }
        .author-type { font-size: 13px; color: #6b7280; margin: 0; }

        /* ===== CTA ===== */
        .cta-section { background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 80px 0; }
        .cta-content { text-align: center; color: white; }
        .cta-title { font-size: 42px; margin-bottom: 15px; }
        .cta-text { font-size: 18px; margin-bottom: 30px; opacity: 0.95; }
        .cta-buttons { display: flex; gap: 20px; justify-content: center; }
        .btn-white { background: white; color: #10B981; }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,255,255,0.3); }
        .btn-outline-white { background: transparent; color: white; border: 2px solid white; }
        .btn-outline-white:hover { background: white; color: #10B981; }

        /* ===== FOOTER ===== */
        .footer { background: #0F172A; color: white; padding: 60px 0 0; }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 50px; margin-bottom: 50px; }
        .footer-logo { margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-size: 24px; font-weight: bold; color: #10B981; }
        .footer-logo .logo-icon { background: #10B981; color: white; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 28px; }
        .footer-description { color: #94A3B8; font-size: 15px; line-height: 1.8; margin-bottom: 25px; }
        .footer-social { display: flex; gap: 12px; }
        .footer-social .social-icon { background: rgba(255,255,255,0.1); }
        .footer-social .social-icon:hover { background: #10B981; color: white; }
        .footer-title { font-size: 20px; margin-bottom: 25px; color: white; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { color: #94A3B8; text-decoration: none; transition: all 0.3s ease; font-size: 15px; }
        .footer-links a:hover { color: #10B981; padding-left: 5px; }
        .footer-contact { list-style: none; }
        .footer-contact li { color: #94A3B8; margin-bottom: 15px; font-size: 15px; display: flex; align-items: start; gap: 10px; }
        .footer-bottom { border-top: 1px solid #334155; padding: 25px 0; display: flex; justify-content: space-between; align-items: center; }
        .footer-bottom p { color: #94A3B8; font-size: 14px; margin: 0; }
        .footer-bottom-links { display: flex; gap: 25px; }
        .footer-bottom-links a { color: #94A3B8; text-decoration: none; font-size: 14px; transition: color 0.3s ease; }
        .footer-bottom-links a:hover { color: #10B981; }

        /* ===== WHATSAPP FLOAT ===== */
        .whatsapp-float { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 20px rgba(37,211,102,0.4); z-index: 999; transition: all 0.3s ease; animation: pulse-whatsapp 2s infinite; }
        .whatsapp-float:hover { transform: scale(1.1); box-shadow: 0 8px 25px rgba(37,211,102,0.6); }
        @keyframes pulse-whatsapp { 0%, 100% { box-shadow: 0 5px 20px rgba(37,211,102,0.4); } 50% { box-shadow: 0 5px 30px rgba(37,211,102,0.7); } }

        /* ===== SCROLL TO TOP ===== */
        .scroll-top { position: fixed; bottom: 100px; right: 30px; width: 50px; height: 50px; background: #10B981; color: white; border: none; border-radius: 50%; font-size: 20px; cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 998; }
        .scroll-top.show { opacity: 1; visibility: visible; }
        .scroll-top:hover { background: #059669; transform: translateY(-5px); }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .features-cards { grid-template-columns: repeat(2, 1fr); }
          .footer-top { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .top-bar { display: none; }
          .menu-toggle { display: flex; }
          .nav-menu { position: fixed; top: 80px; left: -100%; width: 100%; height: calc(100vh - 80px); background: white; flex-direction: column; padding: 40px; gap: 20px; transition: left 0.3s ease; box-shadow: 0 5px 20px rgba(0,0,0,0.1); z-index: 999; }
          .nav-menu.active { left: 0; }
          .hero-content, .about-content { grid-template-columns: 1fr; text-align: center; }
          .hero-title { font-size: 36px; }
          .hero-buttons { justify-content: center; flex-wrap: wrap; }
          .hero-stats { justify-content: center; flex-wrap: wrap; }
          .features-cards { grid-template-columns: 1fr; }
          .services-grid, .doctors-grid, .testimonials-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 32px; }
          .cta-title { font-size: 32px; }
          .cta-buttons { flex-direction: column; align-items: center; }
          .about-feature-item { text-align: left; }
          .footer-top { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
          .image-badge { display: none; }
          .about-stats { position: static; margin-top: 20px; }
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span><i>📞</i> +1 (555) 123-4567</span>
              <span><i>✉️</i> info@healthcareplus.com</span>
              <span><i>🕐</i> Mon - Sat: 8:00 AM - 8:00 PM</span>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">tw</a>
              <a href="#" className="social-icon">ig</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
              <img src="/log.png" alt="HealthCare Plus Logo" className="logo-img" />
            </a>
            <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
              {[
                { label: 'Home', href: '/', page: true },
                { label: 'Services', href: '/services', page: true },
                { label: 'About Us', href: '/aboutus', page: true },
                { label: 'Contact', href: '/contact', page: true },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <Link href="/appointment" className="btn-appointment" style={{ textDecoration: 'none', display: 'inline-block' }}>Book Appointment</Link>
              <button
                className="menu-toggle"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">
                <span className="badge-dot" />
                Professional Healthcare Services
              </span>
              <h1 className="hero-title">Caring for Your Health, Every Step of the Way</h1>
              <p className="hero-description">
                Experience compassionate, comprehensive medical care with our team of expert healthcare professionals.
                We're committed to your well-being with advanced technology and personalized treatment plans.
              </p>
              <div className="hero-buttons">
                <Link href="/appointment" className="btn btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
                <button className="btn btn-secondary">
                  <span className="play-icon">▶</span>
                  Watch Video
                </button>
              </div>
              <div className="hero-stats" ref={heroStatsRef}>
                <StatCounter target={20} label="Years Experience" triggered={statsTriggered} />
                <StatCounter target={50} label="Expert Doctors" triggered={statsTriggered} />
                <StatCounter target={15000} label="Happy Patients" triggered={statsTriggered} />
              </div>
            </div>
            <div className="hero-image">
              <div className="image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=700&fit=crop"
                  alt="Healthcare Professional"
                  className="main-image"
                />
                <div className="image-badge badge-1">
                  <div className="badge-icon">✓</div>
                  <div className="badge-content">
                    <p className="badge-title">Certified</p>
                    <p className="badge-text">Healthcare Provider</p>
                  </div>
                </div>
                <div className="image-badge badge-2">
                  <div className="badge-icon">★</div>
                  <div className="badge-content">
                    <p className="badge-title">4.9/5</p>
                    <p className="badge-text">Patient Rating</p>
                  </div>
                </div>
              </div>
              <div className="floating-shapes">
                <div className="shape shape-1" />
                <div className="shape shape-2" />
                <div className="shape shape-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES MINI CARDS ── */}
      <section className="features-section">
        <div className="container">
          <div className="features-cards">
            {[
              { icon: '🚑', title: 'Emergency Care', text: '24/7 emergency services', id: 'feat-1' },
              { icon: '🏥', title: 'Modern Facility', text: 'Advanced medical equipment', id: 'feat-2' },
              { icon: '👨‍⚕️', title: 'Expert Team', text: 'Qualified specialists', id: 'feat-3' },
              { icon: '💊', title: 'Pharmacy', text: 'In-house medication', id: 'feat-4' },
            ].map((f) => (
              <div
                key={f.id}
                className="feature-mini-card"
                ref={registerCard(f.id)}
                data-card-id={f.id}
                style={cardStyle(f.id)}
              >
                <div className="mini-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=500&fit=crop"
                alt="Modern Hospital"
                className="facility-image"
              />
              <div className="experience-badge">
                <h3>20+</h3>
                <p>Years of Excellence</p>
              </div>
              <div className="about-stats">
                <div className="about-stat"><h4>98%</h4><p>Success Rate</p></div>
                <div className="about-stat"><h4>100+</h4><p>Beds Available</p></div>
              </div>
            </div>
            <div className="about-text">
              <span className="section-badge">About Us</span>
              <h2 className="section-title">Welcome to HealthCare Plus Medical Center</h2>
              <p className="about-description">
                We are a leading healthcare provider committed to delivering exceptional medical services with compassion
                and expertise. Our state-of-the-art facility is equipped with the latest technology to ensure accurate
                diagnosis and effective treatment.
              </p>
              <div className="about-features">
                {[
                  { title: 'Experienced Medical Team', text: 'Board-certified specialists with extensive experience in their fields' },
                  { title: 'Advanced Technology', text: 'Latest medical equipment for precise diagnosis and treatment' },
                  { title: 'Patient-Centered Care', text: "Personalized treatment plans tailored to each patient's needs" },
                ].map((f) => (
                  <div key={f.title} className="about-feature-item">
                    <div className="check-icon">✓</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary">Learn More About Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Services</span>
            <h2 className="section-title">Comprehensive Medical Care</h2>
            <p className="section-description">We provide a wide range of healthcare services with state-of-the-art facilities</p>
          </div>
          <div className="services-grid">
            {[
              {
                id: 'svc-1', title: 'Emergency Care', text: '24/7 emergency medical services with rapid response team and advanced life support systems.',
                svg: <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM32 27H27V32H23V27H18V23H23V18H27V23H32V27Z" fill="#10B981" />,
              },
              {
                id: 'svc-2', title: 'Specialist Consultation', text: 'Expert consultations with highly qualified specialists across multiple medical disciplines.',
                svg: <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM25 13C28.31 13 31 15.69 31 19C31 22.31 28.31 25 25 25C21.69 25 19 22.31 19 19C19 15.69 21.69 13 25 13ZM25 39.2C19.75 39.2 15.15 36.42 12.5 32.19C12.56 27.9 21 25.55 25 25.55C28.99 25.55 37.44 27.9 37.5 32.19C34.85 36.42 30.25 39.2 25 39.2Z" fill="#10B981" />,
              },
              {
                id: 'svc-3', title: 'Cardiology', text: 'Comprehensive heart care with advanced diagnostic tools and treatment options.',
                svg: <path d="M39.5 15C39.5 9.2 34.8 4.5 29 4.5C24.86 4.5 21.27 6.79 19.5 10.17C17.73 6.79 14.14 4.5 10 4.5C4.2 4.5 -0.5 9.2 -0.5 15C-0.5 21.69 5.14 27 18.89 39.73L19.5 40.3L20.11 39.73C33.86 27 39.5 21.69 39.5 15Z" fill="#10B981" />,
              },
              {
                id: 'svc-4', title: 'Laboratory Services', text: 'State-of-the-art lab facilities for accurate diagnostic testing and analysis.',
                svg: <path d="M42 8H8C5.79 8 4 9.79 4 12V38C4 40.21 5.79 42 8 42H42C44.21 42 46 40.21 46 38V12C46 9.79 44.21 8 42 8ZM40 32H10V18H40V32Z" fill="#10B981" />,
              },
              {
                id: 'svc-5', title: 'Pharmacy', text: 'In-house pharmacy with comprehensive medication management and counseling.',
                svg: <path d="M38 4H12C9.79 4 8 5.79 8 8V42C8 44.21 9.79 46 12 46H38C40.21 46 42 44.21 42 42V8C42 5.79 40.21 4 38 4ZM28 38H22V32H28V38ZM28 28H22V10H28V28Z" fill="#10B981" />,
              },
              {
                id: 'svc-6', title: 'Health Checkups', text: 'Comprehensive health screening packages for preventive care and early detection.',
                svg: <path d="M39 5H11C8.24 5 6 7.24 6 10V40C6 42.76 8.24 45 11 45H39C41.76 45 44 42.76 44 40V10C44 7.24 41.76 5 39 5ZM20 35L12 27L15.06 23.94L20 28.88L34.94 13.94L38 17L20 35Z" fill="#10B981" />,
              },
            ].map((s) => (
              <div
                key={s.id}
                className="service-card"
                ref={registerCard(s.id)}
                data-card-id={s.id}
                style={cardStyle(s.id)}
              >
                <div className="service-icon">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">{s.svg}</svg>
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-text">{s.text}</p>
                <a href="#" className="service-link">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="doctors-section" id="doctors">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet Our Expert Doctors</h2>
            <p className="section-description">Our dedicated team of healthcare professionals is here to serve you</p>
          </div>
          <div className="doctors-grid">
            {[
              { id: 'doc-1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', exp: '15 years experience', rating: '4.9', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop' },
              { id: 'doc-2', name: 'Dr. Michael Chen', specialty: 'Neurologist', exp: '12 years experience', rating: '4.8', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop' },
              { id: 'doc-3', name: 'Dr. Emily Brown', specialty: 'Pediatrician', exp: '10 years experience', rating: '5.0', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop' },
            ].map((d) => (
              <div
                key={d.id}
                className="doctor-card"
                ref={registerCard(d.id)}
                data-card-id={d.id}
                style={cardStyle(d.id)}
              >
                <div className="doctor-image-wrapper">
                  <img src={d.img} alt={d.name} className="doctor-image" />
                  <div className="doctor-overlay">
                    <button className="btn-view-profile">View Profile</button>
                  </div>
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{d.name}</h3>
                  <p className="doctor-specialty">{d.specialty}</p>
                  <p className="doctor-experience">{d.exp}</p>
                  <div className="doctor-rating">
                    <span className="star">★★★★★</span>
                    <span className="rating-text">{d.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">What Our Patients Say</h2>
            <p className="section-description">Read reviews from our satisfied patients</p>
          </div>
          <div className="testimonials-grid">
            {[
              {
                id: 'test-1',
                text: '"Excellent care and professional staff. Dr. Johnson took time to explain everything and made me feel comfortable throughout my treatment."',
                name: 'Jennifer Smith',
                img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
              },
              {
                id: 'test-2',
                text: '"The facility is modern and clean. The staff is friendly and efficient. I highly recommend HealthCare Plus for anyone seeking quality medical care."',
                name: 'Robert Williams',
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
              },
              {
                id: 'test-3',
                text: '"Best healthcare experience I\'ve had. The doctors are knowledgeable and caring. The entire process was smooth and stress-free."',
                name: 'Maria Garcia',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              },
            ].map((t) => (
              <div
                key={t.id}
                className="testimonial-card"
                ref={registerCard(t.id)}
                data-card-id={t.id}
                style={cardStyle(t.id)}
              >
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.img} alt={t.name} className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-type">Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-text">Book an appointment today and experience world-class healthcare services</p>
            <div className="cta-buttons">
              <Link href="/appointment" className="btn btn-white" style={{ textDecoration: 'none' }}>Schedule Appointment</Link>
              <Link href="/contact" className="btn btn-outline-white" style={{ textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-logo">
                <span className="logo-icon">+</span>
                <span>HealthCare Plus</span>
              </div>
              <p className="footer-description">
                Providing quality healthcare services with compassion and excellence. Your health is our priority.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">tw</a>
                <a href="#" className="social-icon">ig</a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                {['Home', 'Services', 'About Us', 'Doctors', 'Testimonials', 'Contact'].map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase().replace(' ', '')}`}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                {['Emergency Care', 'Cardiology', 'Laboratory', 'Pharmacy', 'Health Checkup', 'Dental Care'].map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Contact Info</h4>
              <ul className="footer-contact">
                <li><i>📍</i> 123 Medical Center Drive, NY 10001</li>
                <li><i>📞</i> +1 (555) 123-4567</li>
                <li><i>✉️</i> info@healthcareplus.com</li>
                <li><i>🕐</i> Mon-Sat: 8:00 AM - 8:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 HealthCare Plus. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <a href="https://wa.me/1234567890" className="whatsapp-float" target="_blank" rel="noreferrer" title="Chat on WhatsApp">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M27.2 4.6C24.3 1.7 20.4 0 16.2 0C7.4 0 0.3 7.1 0.3 15.9C0.3 18.7 1 21.4 2.4 23.8L0.1 32L8.5 29.7C10.8 31 13.4 31.7 16.1 31.7C24.9 31.7 32 24.6 32 15.8C32 11.6 30.2 7.6 27.2 4.6ZM16.2 29C13.8 29 11.5 28.4 9.4 27.2L8.9 26.9L3.9 28.2L5.2 23.3L4.9 22.8C3.6 20.6 2.9 18.3 2.9 15.9C2.9 8.5 8.8 2.6 16.2 2.6C19.8 2.6 23.1 4 25.6 6.5C28.1 9 29.5 12.3 29.5 15.9C29.6 23.3 23.7 29 16.2 29ZM23.6 19.4C23.2 19.2 21.3 18.3 20.9 18.1C20.5 18 20.2 17.9 19.9 18.3C19.6 18.7 18.9 19.6 18.7 19.9C18.4 20.2 18.2 20.3 17.8 20.1C17.4 19.9 16 19.4 14.4 18C13.1 16.9 12.3 15.5 12 15.1C11.8 14.7 11.9 14.5 12.1 14.3C12.3 14.1 12.5 13.8 12.7 13.6C12.9 13.4 13 13.2 13.1 13C13.2 12.7 13.2 12.5 13.1 12.3C13 12.1 12.3 10.2 11.9 9.4C11.6 8.6 11.2 8.7 11 8.7C10.8 8.7 10.5 8.7 10.2 8.7C9.9 8.7 9.5 8.8 9.1 9.2C8.7 9.6 7.7 10.5 7.7 12.4C7.7 14.3 9.1 16.1 9.3 16.4C9.5 16.7 12.3 20.9 16.5 22.6C17.5 23.1 18.3 23.3 18.9 23.5C19.9 23.8 20.8 23.8 21.5 23.7C22.3 23.6 23.8 22.8 24.1 21.9C24.5 21 24.5 20.2 24.4 20.1C24.2 19.9 23.9 19.8 23.6 19.4Z" fill="white" />
        </svg>
      </a>

      {/* ── SCROLL TO TOP ── */}
      <button
        className={`scroll-top${showScrollTop ? ' show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
}