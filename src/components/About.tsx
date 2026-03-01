'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
}

const values = [
  {
    title: 'Fachliche Kompetenz',
    text: 'Unser Ziel ist es, durch fachliche Kompetenz und herausragenden Service die bestmöglichen Ergebnisse für unsere Mandanten zu erreichen.',
  },
  {
    title: 'Persönliches Engagement',
    text: 'Sie können sich darauf verlassen, dass wir Ihre Interessen mit hohem Engagement wahrnehmen – sowohl außergerichtlich als auch in gerichtlichen Verfahren.',
  },
  {
    title: 'Hohe Spezialisierung',
    text: 'Um fachlich stets auf der Höhe der Zeit zu sein, haben sich unsere Anwälte in hohem Maße spezialisiert und bilden sich kontinuierlich fort.',
  },
];

export default function About() {
  return (
    <section id="ueber-uns" className="relative py-24" style={{ background: '#f0f5fb' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: '#1a5fb4' }}>
              Über uns
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
            >
              Herzlich{' '}
              <span style={{ color: '#1a5fb4' }}>willkommen</span>{' '}
              in unserer Kanzlei.
            </h2>
            <div className="accent-divider mb-8" />
            <p className="leading-relaxed mb-5" style={{ color: 'rgba(26,38,56,0.68)', fontSize: '1rem' }}>
              Wir sind ein erfahrenes, freundliches Team und freuen uns über Ihr Interesse an unserer Kanzlei.
              Gern sind wir Ihnen bei rechtlichen Fragen behilflich.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: 'rgba(26,38,56,0.68)', fontSize: '1rem' }}>
              In unserem Team arbeiten Rechtsanwälte, die sich durch hohe Fachkompetenz, Berufserfahrung und
              menschliche Integrität auszeichnen. Wir empfehlen Ihnen, den Anwalt Ihres Vertrauens frühzeitig zu
              kontaktieren – wenn sich Streitigkeiten abzeichnen und noch außergerichtliche Lösungen möglich sind.
            </p>

            <button
              onClick={() => scrollTo('kontakt')}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded px-6 py-3 transition-all duration-200 cursor-pointer border-0"
              style={{ background: '#1a5fb4', color: '#ffffff' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#134a8e')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#1a5fb4')}
            >
              Jetzt Termin vereinbaren →
            </button>
          </motion.div>

          {/* Right: values */}
          <div className="flex flex-col gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl p-6 flex gap-4 items-start"
                style={{ background: '#ffffff', border: '1px solid rgba(26,95,180,0.13)', boxShadow: '0 1px 6px rgba(26,95,180,0.06)' }}
              >
                <CheckCircle2 size={22} style={{ color: '#1a5fb4', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3
                    className="font-serif text-base font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,38,56,0.62)' }}>
                    {v.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
