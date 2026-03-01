'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Phone, Mail, Clock, Printer, X, ShieldCheck } from 'lucide-react';

// ── Datenschutzerklärung content ─────────────────────────────────────────────

const datenschutzSections = [
  {
    heading: '1. Datenschutz auf einen Blick',
    subsections: [
      {
        title: 'Allgemeine Hinweise',
        text: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.',
      },
      {
        title: 'Datenerfassung auf unserer Website',
        text: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.\n\nIhre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.',
      },
      {
        title: 'Ihre Rechte bezüglich Ihrer Daten',
        text: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.',
      },
    ],
  },
  {
    heading: '2. Allgemeine Hinweise und Pflichtinformationen',
    subsections: [
      {
        title: 'Datenschutz',
        text: 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.\n\nWenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.\n\nWir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.',
      },
      {
        title: 'Verantwortliche Stelle',
        text: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nAndreas Schreier\nSchäferstraße 61\n01067 Dresden\n\nTelefon: 0351 210 762 32\nE-Mail: info@kanzlei-schreier.de\n\nVerantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.',
      },
      {
        title: 'Widerruf Ihrer Einwilligung zur Datenverarbeitung',
        text: 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.',
      },
      {
        title: 'Beschwerderecht bei der zuständigen Aufsichtsbehörde',
        text: 'Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.',
      },
      {
        title: 'Recht auf Datenübertragbarkeit',
        text: 'Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.',
      },
      {
        title: 'SSL- bzw. TLS-Verschlüsselung',
        text: 'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.',
      },
      {
        title: 'Auskunft, Sperrung, Löschung',
        text: 'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
      },
    ],
  },
  {
    heading: '3. Datenerfassung auf unserer Website',
    subsections: [
      {
        title: 'Cookies',
        text: 'Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.\n\nDie meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.\n\nSie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.',
      },
      {
        title: 'Server-Log-Dateien',
        text: 'Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:\n\n• Browsertyp und Browserversion\n• verwendetes Betriebssystem\n• Referrer URL\n• Hostname des zugreifenden Rechners\n• Uhrzeit der Serveranfrage\n• IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.',
      },
      {
        title: 'Kontaktformular',
        text: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n\nDie Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.\n\nDie von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt.',
      },
    ],
  },
  {
    heading: '4. Plugins und Tools',
    subsections: [
      {
        title: 'Google Web Fonts',
        text: 'Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.\n\nZu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung unserer Online-Angebote (Art. 6 Abs. 1 lit. f DSGVO).',
      },
      {
        title: 'Google Maps',
        text: 'Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.\n\nZur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.\n\nDie Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte (Art. 6 Abs. 1 lit. f DSGVO).',
      },
    ],
  },
];

// ── Datenschutz Modal ─────────────────────────────────────────────────────────

function DatenschutzModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,22,50,0.6)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: '#ffffff',
          boxShadow: '0 24px 64px rgba(10,22,50,0.3)',
          maxHeight: '90vh',
        }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-5 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1a3a6b, #1a5fb4)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <ShieldCheck size={18} color="white" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Kanzlei Schreier &amp; Kollegen
              </p>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Datenschutzerklärung
              </h2>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 border-0 cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
            aria-label="Schließen"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-8 py-7 flex-1" style={{ scrollbarGutter: 'stable' }}>
          {datenschutzSections.map((section) => (
            <div key={section.heading} className="mb-8">
              <h3
                className="text-base font-bold mb-4 pb-2"
                style={{
                  color: '#1a2638',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  borderBottom: '2px solid rgba(26,95,180,0.15)',
                }}
              >
                {section.heading}
              </h3>
              {section.subsections.map((sub) => (
                <div key={sub.title} className="mb-5">
                  <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a5fb4' }}>
                    {sub.title}
                  </h4>
                  {sub.text.split('\n\n').map((para, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed mb-2"
                      style={{ color: 'rgba(26,38,56,0.72)', whiteSpace: 'pre-line' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* Footer note */}
          <div
            className="rounded-xl p-4 mt-2 mb-2"
            style={{ background: '#eef4fd', border: '1px solid rgba(26,95,180,0.13)' }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,38,56,0.6)' }}>
              Quelle: Kanzlei Schreier &amp; Kollegen · Schäferstraße 61, 01067 Dresden ·{' '}
              <a href="mailto:info@kanzlei-schreier.de" style={{ color: '#1a5fb4' }}>
                info@kanzlei-schreier.de
              </a>
            </p>
          </div>
        </div>

        {/* Sticky close button at bottom */}
        <div
          className="flex-shrink-0 px-8 py-4 flex justify-end"
          style={{ borderTop: '1px solid rgba(26,95,180,0.1)', background: '#f8fbff' }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white border-0 cursor-pointer transition-colors duration-200"
            style={{ background: '#1a5fb4' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#134a8e')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#1a5fb4')}
          >
            Schließen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────

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
                Das erste Beratungsgespräch ist kostenfrei. Schildern Sie uns Ihr
                Anliegen – wir melden uns innerhalb von 24 Stunden bei Ihnen.
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
