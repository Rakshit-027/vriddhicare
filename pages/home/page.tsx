'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const heroStatsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

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

  const registerCard = (id: string) => (el: HTMLElement | null) => {
    if (el) cardRefs.current.set(id, el);
  };

  const cardStyle = (id: string): React.CSSProperties => ({
    opacity: visibleCards.has(id) ? 1 : 0,
    transform: visibleCards.has(id) ? 'translateY(0)' : 'translateY(30px)',
    transition: '0.6s ease',
  });

  return (
    <div className="pb-20">
      <style>{`
        /* ===== RESET & BASE ===== */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

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
        .about-feature-item { display: flex; gap: 15px; margin-bottom: 20px; }
        .check-icon { width: 30px; height: 30px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }

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

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .features-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-content, .about-content { grid-template-columns: 1fr; text-align: center; }
          .hero-title { font-size: 36px; }
          .hero-buttons { justify-content: center; flex-wrap: wrap; }
          .hero-stats { justify-content: center; flex-wrap: wrap; }
          .features-cards { grid-template-columns: 1fr; }
          .services-grid, .testimonials-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 32px; }
          .cta-title { font-size: 32px; }
          .cta-buttons { flex-direction: column; align-items: center; }
          .about-feature-item { text-align: left; }
          .image-badge { display: none; }
          .about-stats { position: static; margin-top: 20px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">
                <span className="badge-dot" />
                Professional Healthcare Services
              </span>
              <h1 className="hero-title">Compassionate Home Patient Care & Elder Care Services</h1>
              <p className="hero-description">
                Providing professional, compassionate, and reliable home healthcare and elder care services for families who want the best care for their loved ones in the comfort of their home.
              </p>
              <div className="hero-buttons">
                <Link href="/appointment" className="btn btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
                <button className="btn btn-secondary">
                  <span className="play-icon">▶</span>
                  Watch Video
                </button>
              </div>
              <div className="hero-stats" ref={heroStatsRef}>
                <StatCounter target={7} label="Years Experience" triggered={statsTriggered} />
                <StatCounter target={100} label="Certified Caregivers" triggered={statsTriggered} />
                <StatCounter target={500} label="Happy Patients" triggered={statsTriggered} />
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
              { icon: '👨‍⚕️', title: 'Experienced Nurses', text: 'Professional & certified team', id: 'feat-1' },
              { icon: '🏡', title: 'Personalized Care', text: 'Tailored home care services', id: 'feat-2' },
              { icon: '🚑', title: '24/7 Support', text: 'Round-the-clock assistance', id: 'feat-3' },
              { icon: '❤️', title: 'Trusted Service', text: 'Trusted by 500+ families', id: 'feat-4' },
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
                <h3>7+</h3>
                <p>Years of Service</p>
              </div>
              <div className="about-stats">
                <div className="about-stat"><h4>500+</h4><p>Happy Families</p></div>
                <div className="about-stat"><h4>100+</h4><p>Certified Nurses</p></div>
              </div>
            </div>
            <div className="about-text">
              <span className="section-badge">About Us</span>
              <h2 className="section-title" style={{ fontSize: '32px', lineHeight: '1.2' }}>Compassionate Home Patient Care & Elder Care Services</h2>
              <div className="about-description">
                <p style={{ marginBottom: '15px' }}>
                  Providing professional, compassionate, and reliable home healthcare and elder care services for families who want the best care for their loved ones in the comfort of their home.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  With 7+ years of experience in patient care and elderly assistance, our team of 100+ qualified and government-certified nurses and caregivers have successfully cared for 500+ patients with dedication, dignity, and professionalism.
                </p>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>Our Commitment</h3>
              <div className="about-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                {[
                  'Professional & Experienced Nurses',
                  'Personalized Home Care Services',
                  '24/7 Care & Emergency Support',
                  'Trusted by 500+ Families',
                  '100+ Certified Caregivers'
                ].map((f) => (
                  <div key={f} className="about-feature-item" style={{ marginBottom: 0, gap: '10px' }}>
                    <div className="check-icon" style={{ width: '22px', height: '22px', fontSize: '12px' }}>✓</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '15px', margin: 0 }}>{f}</h4>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/aboutus" className="btn btn-primary" style={{ textDecoration: 'none' }}>Learn More About Us</Link>
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
                id: 'svc-1', title: 'Nursing Care at Home', text: 'Injection administration, IV fluids, wound dressing, and vital monitoring.',
                svg: <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM32 27H27V32H23V27H18V23H23V18H27V23H32V27Z" fill="#10B981" />,
              },
              {
                id: 'svc-2', title: 'Post-Hospitalization', text: 'Medication management, physiotherapy assistance, and daily health monitoring.',
                svg: <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM25 13C28.31 13 31 15.69 31 19C31 22.31 28.31 25 25 25C21.69 25 19 22.31 19 19C19 15.69 21.69 13 25 13ZM25 39.2C19.75 39.2 15.15 36.42 12.5 32.19C12.56 27.9 21 25.55 25 25.55C28.99 25.55 37.44 27.9 37.5 32.19C34.85 36.42 30.25 39.2 25 39.2Z" fill="#10B981" />,
              },
              {
                id: 'svc-3', title: 'ICU Care at Home', text: 'ICU-level monitoring, medical equipment handling, and continuous patient supervision.',
                svg: <path d="M39.5 15C39.5 9.2 34.8 4.5 29 4.5C24.86 4.5 21.27 6.79 19.5 10.17C17.73 6.79 14.14 4.5 10 4.5C4.2 4.5 -0.5 9.2 -0.5 15C-0.5 21.69 5.14 27 18.89 39.73L19.5 40.3L20.11 39.73C33.86 27 39.5 21.69 39.5 15Z" fill="#10B981" />,
              },
              {
                id: 'svc-4', title: 'Personal Care Assistance', text: 'Caregivers assist elderly individuals with daily routines such as bathing, grooming, and meals.',
                svg: <path d="M42 8H8C5.79 8 4 9.79 4 12V38C4 40.21 5.79 42 8 42H42C44.21 42 46 40.21 46 38V12C46 9.79 44.21 8 42 8ZM40 32H10V18H40V32Z" fill="#10B981" />,
              },
              {
                id: 'svc-5', title: 'Companionship Care', text: 'Emotional support, friendly companionship, conversation, and outdoor walks.',
                svg: <path d="M38 4H12C9.79 4 8 5.79 8 8V42C8 44.21 9.79 46 12 46H38C40.21 46 42 44.21 42 42V8C42 5.79 40.21 4 38 4ZM28 38H22V32H28V38ZM28 28H22V10H28V28Z" fill="#10B981" />,
              },
              {
                id: 'svc-6', title: 'Attendant Care Services', text: 'Feeding assistance, personal hygiene support, and bedridden patient care.',
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
                <Link href="/services" className="service-link">Learn More →</Link>
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
                text: '"The caregivers were extremely professional and compassionate while taking care of my father after his surgery. Their dedication made a huge difference in his recovery."',
                name: 'Rahul Sharma',
                img: '',
              },
              {
                id: 'test-2',
                text: '"We were worried about leaving our elderly mother alone at home, but their caregiver treated her like family. We are very thankful for their support."',
                name: 'Meena Patil',
                img: '',
              },
              {
                id: 'test-3',
                text: '"The nursing staff is very well trained and responsible. They took excellent care of my grandfather. Highly recommended."',
                name: 'Amit Deshmukh',
                img: '',
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
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 font-bold">
                    {t.name[0]}
                  </div>
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
    </div>
  );
}