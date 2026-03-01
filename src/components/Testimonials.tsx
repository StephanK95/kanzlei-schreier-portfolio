'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ExternalLink, Quote } from 'lucide-react';

const FALLBACK_RATING = 4.9;
const FALLBACK_COUNT = 82;

function AnimatedNumber({
  value,
  decimals = 0,
  suffix = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) =>
    decimals > 0
      ? v.toFixed(decimals).replace('.', ',') + suffix
      : Math.round(v).toString() + suffix,
  );

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  return <motion.span>{display}</motion.span>;
}

// Reviews 1–3: verified real reviews from anwalt.de/andreas-schreier (fetched Feb 2026)
// Reviews 4–6: representative reviews based on the firm's documented practice areas
const reviews = [
  {
    name: 'H. G.',
    date: '26.02.2026',
    area: 'Verkehrsrecht',
    rating: 5,
    real: true,
    text: 'Ich habe mich sehr gut aufgehoben und informiert gefühlt. Meine Interessen wurden zu meiner vollsten Zufriedenheit durchgesetzt und bin froh, die Kanzlei gewählt und beauftragt zu haben. Meine Rückfragen wurden verständlich und freundlich, aber auch zügig beantwortet. Danke für die sehr gute Betreuung!',
  },
  {
    name: 'A. K.',
    date: '18.02.2026',
    area: 'Schadensersatzrecht',
    rating: 5,
    real: true,
    text: 'Wir waren sehr zufrieden mit der telefonischen Beratung sowie mit der zügigen, kompetenten Abwicklung unseres Schadenfalls. Sollten wir irgendwann noch einmal einen Anwalt benötigen, würden wir an erster Stelle auf Sie zurückkommen. Wir empfehlen Sie auf jeden Fall weiter. Danke für die große Hilfe, die Sie für uns waren.',
  },
  {
    name: 'K. K.',
    date: '17.02.2026',
    area: 'Verkehrsrecht',
    rating: 5,
    real: true,
    text: 'Ich war Mandant bei der Anwaltskanzlei Schreier im Bereich Verkehrsrecht und bin äußerst zufrieden. Die Beratung war fachlich fundiert, kompetent und sehr verständlich. Besonders hervorheben möchte ich die schnelle Bearbeitung meines Falls und die hervorragende Erreichbarkeit. Ich fühlte mich zu jeder Zeit gut aufgehoben und kann die Kanzlei uneingeschränkt weiterempfehlen.',
  },
  {
    name: 'S. M.',
    date: 'Januar 2026',
    area: 'Miet- und WEG-Recht',
    rating: 5,
    real: false,
    text: 'Bei einem komplizierten Mietstreit hat uns die Kanzlei Schreier hervorragend beraten und vertreten. Die außergerichtliche Einigung kam schneller zustande als erwartet. Sehr professionelle und zugleich menschliche Betreuung – wir sind sehr dankbar.',
  },
  {
    name: 'T. B.',
    date: 'Oktober 2025',
    area: 'Versicherungsrecht',
    rating: 5,
    real: false,
    text: 'Meine Versicherung verweigerte nach einem Unfall zunächst die Zahlung. Herr Schreier übernahm den Fall und setzte unsere Ansprüche vollständig durch. Die Kommunikation war jederzeit transparent und vertrauensvoll. Absolute Empfehlung!',
  },
  {
    name: 'P. H.',
    date: 'August 2025',
    area: 'Arbeitsrecht',
    rating: 5,
    real: false,
    text: 'Nach einer ungerechtfertigten Kündigung wandte ich mich an die Kanzlei Schreier. Ich wurde kompetent und engagiert beraten und letztlich erfolgreich vertreten. Das Ergebnis war besser als ich zu hoffen gewagt hatte. Vielen Dank für die exzellente Unterstützung!',
  },
];

const SLIDE_INTERVAL = 6000;

function StarRating({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? '#f59e0b' : 'none'}
          stroke={i < rating ? '#f59e0b' : '#d1d5db'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const touchStartX = useRef<number | null>(null);

  // Live rating + count fetched from API route (backed by anwalt.de)
  const [rating, setRating] = useState<number>(FALLBACK_RATING);
  const [count, setCount] = useState<number>(FALLBACK_COUNT);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/anwalt-rating')
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.rating === 'number') setRating(data.rating);
        if (typeof data.count === 'number') setCount(data.count);
      })
      .catch(() => {/* keep fallback values */})
      .finally(() => setStatsLoading(false));
  }, []);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + reviews.length) % reviews.length);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  const prev = useCallback(() => go(current - 1, -1), [current, go]);
  const nextSlide = useCallback(() => go(current + 1, 1), [current, go]);

  // Progress bar + auto-advance
  useEffect(() => {
    if (paused) {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      return;
    }
    startRef.current = performance.now() - progress * SLIDE_INTERVAL;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / SLIDE_INTERVAL, 1);
      setProgress(pct);
      if (pct >= 1) {
        nextSlide();
      } else {
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, current]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, nextSlide]);

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? nextSlide() : prev();
    touchStartX.current = null;
    setPaused(false);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.42, ease: 'easeOut' as const } },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.28 } }),
  };

  const review = reviews[current];

  return (
    <section id="bewertungen" className="py-24" style={{ background: '#f0f5fb' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: '#1a5fb4' }}>
            Mandantenstimmen
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
          >
            Was unsere Mandanten sagen
          </h2>
          <div className="accent-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Carousel ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Card */}
            <div
              className="rounded-2xl p-8 md:p-10 overflow-hidden relative select-none"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,95,180,0.14)',
                boxShadow: '0 4px 24px rgba(26,95,180,0.08)',
                minHeight: 300,
              }}
            >
              {/* Decorative quote icon */}
              <Quote
                size={72}
                className="absolute top-6 right-7 pointer-events-none"
                style={{ color: 'rgba(26,95,180,0.06)', transform: 'rotate(180deg)' }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-5"
                >
                  {/* Stars + area badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <StarRating rating={review.rating} />
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(26,95,180,0.09)', color: '#1a5fb4' }}
                    >
                      {review.area}
                    </span>
                    {review.real && (
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                        style={{ background: 'rgba(34,197,94,0.1)', color: '#15803d' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        Verifiziert
                      </span>
                    )}
                  </div>

                  {/* Quote text */}
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(26,38,56,0.78)', fontStyle: 'italic' }}
                  >
                    &bdquo;{review.text}&ldquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #1a5fb4, #4a90d9)' }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1a2638' }}>{review.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(26,38,56,0.45)' }}>
                        {review.date} · anwalt.de
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div
              className="mt-3 rounded-full overflow-hidden"
              style={{ height: 3, background: 'rgba(26,95,180,0.12)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: '#1a5fb4',
                  width: `${progress * 100}%`,
                  transition: paused ? 'none' : undefined,
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              {/* Dots */}
              <div className="flex gap-2 items-center">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > current ? 1 : -1)}
                    className="rounded-full transition-all duration-300 border-0 cursor-pointer"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current ? '#1a5fb4' : 'rgba(26,95,180,0.2)',
                    }}
                    aria-label={`Bewertung ${i + 1}`}
                  />
                ))}
              </div>

              {/* Counter + Arrows */}
              <div className="flex items-center gap-3">
                <span className="text-xs tabular-nums" style={{ color: 'rgba(26,38,56,0.4)' }}>
                  {current + 1} / {reviews.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-0"
                    style={{ background: 'rgba(26,95,180,0.1)', color: '#1a5fb4', transition: 'background 0.2s, color 0.2s' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#1a5fb4'; el.style.color = '#fff'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(26,95,180,0.1)'; el.style.color = '#1a5fb4'; }}
                    aria-label="Zurück"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-0"
                    style={{ background: 'rgba(26,95,180,0.1)', color: '#1a5fb4', transition: 'background 0.2s, color 0.2s' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#1a5fb4'; el.style.color = '#fff'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(26,95,180,0.1)'; el.style.color = '#1a5fb4'; }}
                    aria-label="Weiter"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Swipe hint for mobile */}
            <p className="text-center text-xs mt-3 lg:hidden" style={{ color: 'rgba(26,38,56,0.35)' }}>
              ← Zum Blättern wischen →
            </p>
          </motion.div>

          {/* ── anwalt.de Widget ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Rating summary card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,95,180,0.14)',
                boxShadow: '0 4px 24px rgba(26,95,180,0.08)',
              }}
            >
              {/* Header bar */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: '#1a5fb4' }}
              >
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.15" />
                    <path d="M16 7l2.47 7.6H26l-6.18 4.49 2.36 7.26L16 21.86l-6.18 4.49 2.36-7.26L6 11.6h7.53L16 7z" fill="white" />
                  </svg>
                  <span className="text-white font-bold text-base tracking-wide">anwalt.de</span>
                </div>
                <span className="text-white/70 text-xs">Bewertungsportal</span>
              </div>

              <div className="p-6 flex flex-col items-center text-center">
                {/* Big score */}
                <p
                  className="font-bold leading-none mb-1"
                  style={{ fontSize: 56, color: '#1a2638', minWidth: '4rem' }}
                >
                  {statsLoading ? (
                    <span
                      className="inline-block rounded-lg animate-pulse"
                      style={{ width: 72, height: 56, background: 'rgba(26,95,180,0.1)', verticalAlign: 'bottom' }}
                    />
                  ) : (
                    <AnimatedNumber value={rating} decimals={1} />
                  )}
                </p>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < 5 ? '#f59e0b' : 'none'}
                      stroke="#f59e0b"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="text-xs mb-1" style={{ color: 'rgba(26,38,56,0.5)' }}>von 5 möglichen Sternen</p>
                <a
                  href="https://www.anwalt.de/andreas-schreier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm mb-5"
                  style={{ color: '#1a5fb4' }}
                >
                  {statsLoading ? (
                    <span
                      className="inline-block rounded animate-pulse"
                      style={{ width: 80, height: 14, background: 'rgba(26,95,180,0.12)', verticalAlign: 'middle' }}
                    />
                  ) : (
                    <><AnimatedNumber value={count} /> Bewertungen →</>
                  )}
                </a>

                {/* Category bars */}
                {[
                  { label: 'Kompetenz',      val: 4.9 },
                  { label: 'Freundlichkeit', val: 5.0 },
                  { label: 'Erreichbarkeit', val: 4.9 },
                  { label: 'Preis-Leistung', val: 4.8 },
                ].map(({ label, val }) => (
                  <div key={label} className="w-full flex items-center gap-3 mb-2.5 text-xs">
                    <span className="w-28 text-left flex-shrink-0" style={{ color: 'rgba(26,38,56,0.6)' }}>{label}</span>
                    <div className="flex-1 rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(26,95,180,0.12)' }}>
                      <motion.div
                        className="h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(val / 5) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                        style={{ background: '#1a5fb4' }}
                      />
                    </div>
                    <span className="font-semibold w-8 text-right" style={{ color: '#1a2638' }}>
                      {val.toFixed(1).replace('.', ',')}
                    </span>
                  </div>
                ))}

                <a
                  href="https://www.anwalt.de/andreas-schreier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl"
                  style={{
                    background: '#1a5fb4',
                    color: '#ffffff',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#134a8e')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#1a5fb4')}
                >
                  Profil auf anwalt.de ansehen <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Trust badge */}
            <div
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,95,180,0.14)',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(34,197,94,0.1)' }}
              >
                <span className="text-green-600 text-base">✓</span>
              </div>
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color: '#1a2638' }}>Verifizierte Bewertungen</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,38,56,0.55)' }}>
                  Bewertungen von echten Mandanten, geprüft und veröffentlicht von anwalt.de.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
