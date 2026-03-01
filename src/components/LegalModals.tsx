'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';

// ── Shared animation helpers ──────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.25 } },
};

function ModalShell({
  onClose,
  icon,
  title,
  subtitle,
  children,
}: {
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
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
      variants={backdropVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(10,22,50,0.3)', maxHeight: '90vh' }}
        variants={panelVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-5 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1a3a6b, #1a5fb4)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {icon}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {subtitle}
              </p>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {title}
              </h2>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center border-0 cursor-pointer transition-colors duration-200"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
            aria-label="Schließen"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-8 py-7 flex-1" style={{ scrollbarGutter: 'stable' }}>
          {children}
        </div>

        {/* Footer bar */}
        <div className="flex-shrink-0 px-8 py-4 flex justify-end" style={{ borderTop: '1px solid rgba(26,95,180,0.1)', background: '#f8fbff' }}>
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

// ── Datenschutzerklärung ──────────────────────────────────────────────────────

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
        text: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n\nDie Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.\n\nDie von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt.',
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

function SectionContent({ sections }: { sections: typeof datenschutzSections }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.heading} className="mb-8">
          <h3
            className="text-base font-bold mb-4 pb-2"
            style={{ color: '#1a2638', fontFamily: "'Playfair Display', Georgia, serif", borderBottom: '2px solid rgba(26,95,180,0.15)' }}
          >
            {section.heading}
          </h3>
          {section.subsections.map((sub) => (
            <div key={sub.title} className="mb-5">
              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a5fb4' }}>{sub.title}</h4>
              {sub.text.split('\n\n').map((para, pi) => (
                <p key={pi} className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(26,38,56,0.72)', whiteSpace: 'pre-line' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="rounded-xl p-4 mt-2 mb-2" style={{ background: '#eef4fd', border: '1px solid rgba(26,95,180,0.13)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,38,56,0.6)' }}>
          Quelle: Kanzlei Schreier &amp; Kollegen · Schäferstraße 61, 01067 Dresden ·{' '}
          <a href="mailto:info@kanzlei-schreier.de" style={{ color: '#1a5fb4' }}>info@kanzlei-schreier.de</a>
        </p>
      </div>
    </>
  );
}

export function DatenschutzModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      onClose={onClose}
      icon={<ShieldCheck size={18} color="white" strokeWidth={1.75} />}
      title="Datenschutzerklärung"
      subtitle="Kanzlei Schreier & Kollegen"
    >
      <SectionContent sections={datenschutzSections} />
    </ModalShell>
  );
}

// ── Impressum ─────────────────────────────────────────────────────────────────

const impressumSections = [
  {
    heading: 'Kontakt',
    subsections: [
      {
        title: 'Rechtsanwaltskanzlei Schreier & Kollegen',
        text: 'Andreas Schreier\nSchäferstraße 61\n01067 Dresden\n\nTel: 0351 210 762 32\nFax: 0351 210 762 31\nE-Mail: info@kanzlei-schreier.de',
      },
    ],
  },
  {
    heading: 'Berufsrechtliche Angaben',
    subsections: [
      {
        title: 'Berufsbezeichnung',
        text: 'Rechtsanwalt nach dem Recht der Bundesrepublik Deutschland. Die Berufsbezeichnung „Rechtsanwalt" wurde in der Bundesrepublik Deutschland verliehen. Gleiches gilt für die Titel „Fachanwalt".',
      },
      {
        title: 'Kammermitgliedschaft',
        text: 'Mitglied der Rechtsanwaltskammer Sachsen, Atrium am Rosengarten, Glacisstraße 6, 01099 Dresden.',
      },
      {
        title: 'Berufshaftpflichtversicherung',
        text: 'Berufshaftpflichtversicherer von Rechtsanwalt Andreas Schreier:\nERGO Versicherung AG, Victoriaplatz 1, 40477 Düsseldorf',
      },
      {
        title: 'Berufsrechtliche Regelungen',
        text: 'Maßgebliche berufsrechtliche Regelungen sind die Bundesrechtsanwaltsordnung (BRAO), die Berufsordnung für Rechtsanwälte (BORA), das Rechtsanwaltsvergütungsgesetz (RVG), die Fachanwaltsordnung (FAO), die Standesregelung der Rechtsanwälte in der Europäischen Gemeinschaft (CCBE-Berufsregeln) sowie das Gesetz über die Tätigkeit europäischer Rechtsanwälte in Deutschland (EuRAG).\n\nDie Inhalte sind als öffentlich zugängliche Sammlung im Volltext auf der Homepage der Bundesrechtsanwaltskammer abrufbar unter www.brak.de (Rubrik „Berufsrecht").',
      },
    ],
  },
  {
    heading: 'Haftungsausschluss',
    subsections: [
      {
        title: 'Haftung für Inhalte',
        text: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
      },
      {
        title: 'Haftung für Links',
        text: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
      },
      {
        title: 'Urheberrecht',
        text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
      },
      {
        title: 'Schlichtung',
        text: 'Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter https://ec.europa.eu/consumers/odr/ finden.',
      },
    ],
  },
];

export function ImpressumModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      onClose={onClose}
      icon={<FileText size={18} color="white" strokeWidth={1.75} />}
      title="Impressum"
      subtitle="Kanzlei Schreier & Kollegen"
    >
      {impressumSections.map((section) => (
        <div key={section.heading} className="mb-8">
          <h3
            className="text-base font-bold mb-4 pb-2"
            style={{ color: '#1a2638', fontFamily: "'Playfair Display', Georgia, serif", borderBottom: '2px solid rgba(26,95,180,0.15)' }}
          >
            {section.heading}
          </h3>
          {section.subsections.map((sub) => (
            <div key={sub.title} className="mb-5">
              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a5fb4' }}>{sub.title}</h4>
              {sub.text.split('\n\n').map((para, pi) => (
                <p key={pi} className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(26,38,56,0.72)', whiteSpace: 'pre-line' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </ModalShell>
  );
}
