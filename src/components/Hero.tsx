'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: easing },
  }),
};

function useCountUp(target: number, duration = 3800, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return count;
}

function StatCounter({
  target,
  suffix,
  label,
  format,
  animDelay = 0,
}: {
  target: number;
  suffix: string;
  label: string;
  format?: (n: number) => string;
  animDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;
    const timer = setTimeout(() => setStarted(true), animDelay);
    return () => clearTimeout(timer);
  }, [isInView, started, animDelay]);

  const count = useCountUp(target, 5500, started);
  const displayValue = format ? format(count) : String(count);

  return (
    <div ref={ref}>
      <p className="text-4xl md:text-5xl font-bold" style={{ color: '#ffffff' }}>
        {displayValue}{suffix}
      </p>
      <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Kanzlei background photo */}
      <Image
        src="/slider1.jpg"
        alt="Rechtsanwaltskanzlei Schreier"
        fill
        priority
        quality={85}
        className="object-cover"
        style={{ zIndex: 0, objectPosition: 'center 20%' }}
      />

      {/* Blue overlay — lightened so the face stays visible */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8, 20, 50, 0.60)', zIndex: 1 }}
      />

      {/* Subtle blue grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100,160,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          zIndex: 2,
        }}
      />

      {/* Blue radial glow at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(26,95,180,0.18), transparent 60%)',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full flex justify-end" style={{ zIndex: 4 }}>
        <div className="max-w-xl w-full">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-sm tracking-[0.2em] uppercase mb-6 font-semibold hero-accent"
          >
            Rechtsanwaltskanzlei
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff' }}
          >
            Ihr Recht.{' '}
            <span className="hero-accent-text">Unser Einsatz.</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="hero-divider mb-8"
          />

          {/* Subline */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-lg leading-relaxed max-w-xl mb-10"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            Wir vertreten Ihre Interessen mit Kompetenz, Erfahrung und dem
            persönlichen Engagement, das jeder Fall verdient. Von der ersten
            Anfrage bis zur abschließenden Lösung — an Ihrer Seite.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            {/* Primary: solid white, blue text — maximum contrast on dark photo */}
            <button
              onClick={() => scrollTo('kontakt')}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded text-base font-semibold cursor-pointer border-0 transition-all duration-200"
              style={{ background: '#ffffff', color: '#1a5fb4' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#e8f0fb';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#ffffff';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Jetzt kontaktieren
            </button>

            {/* Secondary: white outline, white text */}
            <button
              onClick={() => scrollTo('leistungen')}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded text-base font-semibold cursor-pointer transition-all duration-200"
              style={{ background: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.75)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.75)';
              }}
            >
              Unsere Leistungen
            </button>
          </motion.div>

          {/* Stats with count-up */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-16 flex flex-wrap gap-8 text-sm"
          >
            <StatCounter target={25} suffix="+" label="Jahre Erfahrung" animDelay={0} />
            <StatCounter
              target={1200}
              suffix="+"
              label="Erfolgreich abgeschlossene Fälle"
              format={(n) => n.toLocaleString('de-DE')}
              animDelay={200}
            />
            <StatCounter target={5} suffix="" label="Rechtsgebiete" animDelay={400} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
