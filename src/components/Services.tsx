'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Users, ShieldCheck, Home, FileText, HardHat, Briefcase, X, ArrowRight } from 'lucide-react';

interface Service {
  Icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  url: string;
}

const services: Service[] = [
  {
    Icon: Car,
    title: 'Verkehrsrecht',
    subtitle: 'Ihre Anwälte für Verkehrsrecht in Dresden',
    url: 'https://kanzlei-schreier.de/verkehrsrecht/',
    description:
      'Wir wahren Ihre Interessen im Falle von Verkehrsunfällen, bei Verkehrsordnungswidrigkeiten und im Verkehrsstrafrecht.',
    details: [
      'Geltendmachung aller Schadensersatzansprüche nach Verkehrsunfällen (Reparaturkosten, Mietwagen, Schmerzensgeld)',
      'Vertretung bei Verkehrsordnungswidrigkeiten – Bußgeldverfahren, Fahrverbote, Punktereduktion',
      'Verteidigung im Verkehrsstrafrecht (Trunkenheitsfahrt, Unfallflucht u. a.)',
      'Geltendmachung von Ansprüchen beim Autokauf oder nach Werkstattreparaturen',
      'Beratung in Angelegenheiten der eigenen KFZ-Versicherung',
    ],
  },
  {
    Icon: Users,
    title: 'Familienrecht',
    subtitle: 'Ihre Anwälte für Familienrecht in Dresden',
    url: 'https://kanzlei-schreier.de/familienrecht/',
    description:
      'Wir begleiten Sie einfühlsam und kompetent durch alle familienrechtlichen Situationen – von Sorgerecht bis Scheidung.',
    details: [
      'Beratung und Vertretung in Kindschaftssachen: Sorge- und Umgangsrechtsstreitigkeiten',
      'Unterhaltssachen: Kindesunterhalt, Ehegattenunterhalt, nachehelicher Unterhalt und Elternunterhalt',
      'Beratung und Vertretung bei Trennung und Ehescheidung',
      'Vorbereitung von Getrenntlebens- und Ehescheidungsfolgenvereinbarungen',
      'Vermögensauseinandersetzung bei Immobilien und gemeinsamen Konten',
      'Auflösung nichtehelicher Lebensgemeinschaften',
    ],
  },
  {
    Icon: ShieldCheck,
    title: 'Versicherungsrecht',
    subtitle: 'Ihre Anwälte für Versicherungsrecht in Dresden',
    url: 'https://kanzlei-schreier.de/versicherungsrecht/',
    description:
      'Wir beraten und vertreten Versicherungsunternehmen und Versicherungsnehmer in allen Bereichen des privaten Versicherungsrechts.',
    details: [
      'Kraftfahrtversicherung: Haftpflicht, Kasko, Insassenunfallversicherung',
      'Haftpflichtversicherung: private und betriebliche Haftpflicht',
      'Lebensversicherung und Berufsunfähigkeitsversicherung',
      'Rechtsschutzversicherung: Deckungsanfragen und -klagen',
      'Unfallversicherung: Invaliditätsfeststellung, Leistungsansprüche',
      'Hausratversicherung: Schadenregulierung und Leistungsstreitigkeiten',
    ],
  },
  {
    Icon: Home,
    title: 'Miet- und WEG-Recht',
    subtitle: 'Ihre Anwälte für Miet- und WEG-Recht in Dresden',
    url: 'https://kanzlei-schreier.de/mietrecht/',
    description:
      'Wir beraten und vertreten Mieter und Vermieter im Wohnungsmietrecht und im gewerblichen Mietrecht.',
    details: [
      'Gestaltung und Prüfung von Mietverträgen (Wohn- und Gewerberaum)',
      'Mieterseitige Gewährleistungsrechte: Mängelbeseitigung, Mietminderung',
      'Mieterhöhungsverfahren und Betriebskostenabrechnungen',
      'Kündigung von Mietverträgen und Räumungsklagen',
      'WEG-Recht: Eigentümerversammlungen, Beschlussanfechtung, Verwalterfragen',
      'Vertretung von Wohnungseigentümern und Eigentumsverwaltungen',
    ],
  },
  {
    Icon: FileText,
    title: 'Vertragsrecht',
    subtitle: 'Ihre Anwälte für Vertragsrecht in Dresden',
    url: 'https://kanzlei-schreier.de/vertragsrecht/',
    description:
      'Wir gestalten individuell zugeschnittene Verträge und helfen Ihnen bei der Durchsetzung und Abwehr vertraglicher Ansprüche.',
    details: [
      'Gestaltung von Kauf-, Werk-, Reise- und Darlehensverträgen',
      'Erstellung und Prüfung allgemeiner Geschäftsbedingungen (AGB)',
      'Geltendmachung von Gewährleistungsrechten: Nacherfüllung, Rücktritt, Minderung, Schadensersatz',
      'Durchsetzung von Kaufpreisforderungen und offenen Rechnungen',
      'Rückabwicklung fehlerhafter Verträge',
      'Beratung bei Vertragsverhandlungen und -streitigkeiten',
    ],
  },
  {
    Icon: HardHat,
    title: 'Baurecht',
    subtitle: 'Ihre Anwälte für Baurecht in Dresden',
    url: 'https://kanzlei-schreier.de/baurecht/',
    description:
      'Wir sind Ansprechpartner für private Bauherren, Wohnungseigentümer und gewerbliche Auftraggeber sowie für Auftragnehmer.',
    details: [
      'Gestaltung und Prüfung von Werkverträgen und Bauverträgen (VOB, BGB)',
      'Durchsetzung von Werklohnansprüchen und Zahlungsforderungen',
      'Abwehr unberechtigter Werklohnforderungen',
      'Geltendmachung von Gewährleistungsansprüchen gegenüber Bauunternehmen',
      'Beratung beim Kauf vom Bauträger (Wohnungseigentumsrecht)',
      'Begleitung von Abnahmen und Streitigkeiten über Baumängel',
    ],
  },
  {
    Icon: Briefcase,
    title: 'Arbeitsrecht',
    subtitle: 'Ihre Anwälte für Arbeitsrecht in Dresden',
    url: 'https://kanzlei-schreier.de/arbeitsrecht/',
    description:
      'Wir beraten und vertreten Arbeitgeber und Arbeitnehmer in allen Angelegenheiten des Arbeitsrechts.',
    details: [
      'Prüfung und Gestaltung von Arbeitsverträgen',
      'Beratung bei Kündigungen: ordentliche, außerordentliche und betriebsbedingte Kündigung',
      'Vertretung in Kündigungsschutzverfahren vor dem Arbeitsgericht',
      'Durchsetzung arbeitsrechtlicher Forderungen (Lohn, Urlaub, Abfindung)',
      'Abschluss von Aufhebungsverträgen und Abwicklungsvereinbarungen',
      'Fokus auf einvernehmliche Konfliktlösung und außergerichtliche Einigung',
    ],
  },
];

// ── Modal ─────────────────────────────────────────────────────────────────────

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and focus X button when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,22,50,0.55)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Panel */}
        <motion.div
          key="panel"
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 24px 64px rgba(10,22,50,0.28)',
            maxHeight: '90vh',
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Coloured header */}
          <div
            className="relative px-8 pt-8 pb-7"
            style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #1a5fb4 100%)' }}
          >
            {/* Close button */}
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 border-0 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
              aria-label="Schließen"
            >
              <X size={16} />
            </button>

            {/* Icon + title */}
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <service.Icon size={26} color="#ffffff" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Rechtsgebiet
                </p>
                <h3
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {service.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto px-8 py-7" style={{ maxHeight: 'calc(90vh - 160px)' }}>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(26,38,56,0.72)' }}>
              {service.subtitle}
            </p>

            {/* Divider */}
            <div className="mb-6" style={{ borderTop: '1px solid rgba(26,95,180,0.12)' }} />

            {/* Bullet points */}
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: '#1a5fb4' }}>
              Unsere Leistungen im Überblick
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {service.details.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ background: '#1a5fb4', minWidth: 20 }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(26,38,56,0.75)' }}>
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: '#eef4fd', border: '1px solid rgba(26,95,180,0.13)' }}
            >
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color: '#1a2638' }}>
                  Jetzt kontaktieren
                </p>
                <p className="text-xs" style={{ color: 'rgba(26,38,56,0.55)' }}>
                  Wir beraten Sie persönlich – vereinbaren Sie noch heute einen Termin.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById('kontakt');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 300);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white flex-shrink-0 border-0 cursor-pointer transition-colors duration-200"
                style={{ background: '#1a5fb4' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#134a8e')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#1a5fb4')}
              >
                Kontakt aufnehmen <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Services Section ──────────────────────────────────────────────────────────

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: easing },
  }),
};

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <section id="leistungen" className="relative py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: '#1a5fb4' }}>
              Rechtsgebiete
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
            >
              Unsere Leistungen
            </h2>
            <div className="accent-divider mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className="rounded-xl p-7 flex flex-col gap-4 transition-all duration-300 group cursor-pointer"
                style={{ background: '#e8f0fb', border: '1px solid rgba(26,95,180,0.12)' }}
                onClick={() => setActive(service)}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#dceafa';
                  el.style.borderColor = 'rgba(26,95,180,0.28)';
                  el.style.boxShadow = '0 6px 24px rgba(26,95,180,0.12)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#e8f0fb';
                  el.style.borderColor = 'rgba(26,95,180,0.12)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(service); }}
                aria-label={`${service.title} – mehr erfahren`}
              >
                {/* Icon badge */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#1a5fb4' }}
                >
                  <service.Icon size={22} color="#ffffff" strokeWidth={1.75} />
                </div>

                <h3
                  className="font-serif text-lg font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
                >
                  {service.title}
                </h3>

                <p style={{ color: 'rgba(26,38,56,0.68)', fontSize: '0.875rem', lineHeight: '1.7' }}>
                  {service.description}
                </p>

                {/* CTA link */}
                <span
                  className="mt-auto flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                  style={{ color: '#1a5fb4' }}
                >
                  Mehr erfahren
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal portal */}
      <AnimatePresence>
        {active && <ServiceModal key="modal" service={active} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
