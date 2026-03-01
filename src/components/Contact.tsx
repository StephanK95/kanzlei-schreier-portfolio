'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { MapPin, Phone, Mail, Clock, Printer } from 'lucide-react';
import { DatenschutzModal } from './LegalModals';


const inputCls =
  'w-full bg-white border rounded px-4 py-2.5 text-sm focus:outline-none transition-colors';
const inputStyle = { borderColor: 'rgba(26,95,180,0.2)', color: '#1a2638' };

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);

  const openDatenschutz = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDatenschutzOpen(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) {
      setPrivacyError(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <section id="kontakt" className="relative py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm tracking-[0.2em] uppercase accent-text mb-3 font-semibold">
                Kontakt
              </p>
              <h2
                className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
              >
                Sprechen Sie{' '}
                <span style={{ color: '#1a5fb4' }}>mit uns.</span>
              </h2>
              <div className="accent-divider mb-8" />
              <p className="leading-relaxed mb-10" style={{ color: 'rgba(26,38,56,0.65)' }}>
                Kontaktieren Sie uns – wir melden uns innerhalb von 24 Stunden
                bei Ihnen und besprechen Ihr Anliegen.
              </p>

              <div className="flex flex-col gap-4 text-sm">
                {[
                  { Icon: MapPin,  label: 'Adresse',        value: 'Schäferstraße 61, 01067 Dresden' },
                  { Icon: Phone,   label: 'Telefon',        value: '0351 210 762 32' },
                  { Icon: Printer, label: 'Fax',            value: '0351 210 762 31' },
                  { Icon: Mail,    label: 'E-Mail',         value: 'info@kanzlei-schreier.de' },
                  { Icon: Clock,   label: 'Öffnungszeiten', value: 'Mo–Fr, 9:00–18:00 Uhr' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-3 items-start">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(26,95,180,0.1)' }}
                    >
                      <Icon size={15} style={{ color: '#1a5fb4' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-xs uppercase tracking-wide mb-0.5" style={{ color: '#1a5fb4' }}>
                        {label}
                      </p>
                      <p style={{ color: 'rgba(26,38,56,0.72)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {submitted ? (
                <div className="card-kanzlei rounded-lg p-10 flex flex-col items-center justify-center text-center h-full min-h-64">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'rgba(26,95,180,0.1)' }}
                  >
                    <span className="text-2xl" style={{ color: '#1a5fb4' }}>✓</span>
                  </div>
                  <h3
                    className="font-serif text-2xl font-semibold mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a5fb4' }}
                  >
                    Nachricht erhalten
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(26,38,56,0.6)' }}>
                    Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="card-kanzlei rounded-lg p-8 flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-wide uppercase font-medium" style={{ color: 'rgba(26,38,56,0.5)' }}>Vorname *</label>
                      <input type="text" required placeholder="Max" className={inputCls} style={inputStyle} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-wide uppercase font-medium" style={{ color: 'rgba(26,38,56,0.5)' }}>Nachname *</label>
                      <input type="text" required placeholder="Mustermann" className={inputCls} style={inputStyle} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wide uppercase font-medium" style={{ color: 'rgba(26,38,56,0.5)' }}>E-Mail *</label>
                    <input type="email" required placeholder="max@beispiel.de" className={inputCls} style={inputStyle} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wide uppercase font-medium" style={{ color: 'rgba(26,38,56,0.5)' }}>Rechtsgebiet</label>
                    <select className={inputCls} style={{ ...inputStyle, background: '#ffffff' }} defaultValue="">
                      <option value="" disabled>Bitte wählen …</option>
                      <option value="verkehr">Verkehrsrecht</option>
                      <option value="familie">Familienrecht</option>
                      <option value="versicherung">Versicherungsrecht</option>
                      <option value="miete">Miet- und WEG-Recht</option>
                      <option value="vertrag">Vertragsrecht</option>
                      <option value="bau">Baurecht</option>
                      <option value="arbeit">Arbeitsrecht</option>
                      <option value="sonstige">Sonstiges</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wide uppercase font-medium" style={{ color: 'rgba(26,38,56,0.5)' }}>Ihr Anliegen *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Bitte beschreiben Sie kurz Ihr Anliegen …"
                      className={`${inputCls} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  {/* ── Privacy checkbox ─────────────────────── */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: privacyError ? 'rgba(220,38,38,0.04)' : 'rgba(26,95,180,0.04)',
                      border: `1px solid ${privacyError ? 'rgba(220,38,38,0.3)' : 'rgba(26,95,180,0.13)'}`,
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      {/* Custom checkbox */}
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={privacy}
                          onChange={(e) => {
                            setPrivacy(e.target.checked);
                            if (e.target.checked) setPrivacyError(false);
                          }}
                        />
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center transition-all duration-200"
                          style={{
                            background: privacy ? '#1a5fb4' : '#ffffff',
                            border: `2px solid ${privacyError ? '#dc2626' : privacy ? '#1a5fb4' : 'rgba(26,95,180,0.35)'}`,
                          }}
                        >
                          {privacy && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Text */}
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(26,38,56,0.7)' }}>
                        Ich habe die{' '}
                        <button
                          type="button"
                          onClick={openDatenschutz}
                          className="font-semibold underline underline-offset-2 cursor-pointer border-0 bg-transparent p-0 transition-colors duration-150"
                          style={{ color: '#1a5fb4' }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#134a8e')}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#1a5fb4')}
                        >
                          Datenschutzerklärung
                        </button>{' '}
                        zur Kenntnis genommen. Ich stimme zu, dass meine Angaben und Daten zur Beantwortung meiner Anfrage elektronisch erhoben und gespeichert werden.{' '}
                        <span style={{ color: 'rgba(26,38,56,0.5)' }}>
                          Hinweis: Sie können Ihre Einwilligung jederzeit für die Zukunft per E-Mail an{' '}
                          <a href="mailto:info@kanzlei-schreier.de" style={{ color: '#1a5fb4' }}>
                            info@kanzlei-schreier.de
                          </a>{' '}
                          widerrufen.
                        </span>
                      </span>
                    </label>

                    {/* Error message */}
                    <AnimatePresence>
                      {privacyError && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs mt-2 ml-8 font-medium"
                          style={{ color: '#dc2626' }}
                        >
                          Bitte stimmen Sie der Datenschutzerklärung zu, um fortzufahren.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button type="submit" className="btn-primary px-8 py-3.5 rounded text-sm mt-1">
                    Nachricht senden
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Datenschutz Modal */}
      <AnimatePresence>
        {datenschutzOpen && (
          <DatenschutzModal key="datenschutz" onClose={() => setDatenschutzOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
