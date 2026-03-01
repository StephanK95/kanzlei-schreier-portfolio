'use client';

import { motion } from 'framer-motion';
import { Scale, Award } from 'lucide-react';
import Image from 'next/image';

const lawyers = [
  {
    name: 'Andreas Schreier',
    role: 'Rechtsanwalt',
    initials: 'AS',
    image: '/team/schreier.jpg',
    specializations: ['Fachanwalt für Verkehrsrecht', 'Fachanwalt für Versicherungsrecht', 'Fachanwalt für Miet- und WEG-Recht'],
    bio: 'Gründer der Kanzlei (2015). Studium der Rechtswissenschaften in Dresden, Rechtsanwalt seit 2005. Mitglied des Dresdner Anwalt Vereins und der ARGE Verkehrsrecht.',
  },
  {
    name: 'Doris Kopp-Metzler',
    role: 'Rechtsanwältin',
    initials: 'DK',
    image: '/team/kopp-metzler.jpg',
    specializations: ['Familienrecht', 'Miet- und WEG-Recht', 'Verkehrsrecht', 'Vertragsrecht'],
    bio: 'Zugelassen als Rechtsanwältin seit 1991. Langjährige Erfahrung in familienrechtlichen Verfahren und im Mietrecht.',
  },
  {
    name: 'Renate Krause',
    role: 'Rechtsanwältin i.R.',
    initials: 'RK',
    image: '/team/krause.jpg',
    specializations: ['Mietrecht', 'Vertragsrecht', 'Zivilrecht'],
    bio: 'Richterin am Vertragsgericht Dresden 1973–1982, anschließend Justiziarin. Zugelassen als Rechtsanwältin seit 1992, seit 2018 im Ruhestand.',
  },
];

const staff = [
  { name: 'Daniela Golle',    role: 'Rechtsanwaltsfachangestellte', since: '2005', image: '/team/golle.jpg',    initials: 'DG' },
  { name: 'Steffi Frontzek',  role: 'Rechtsfachwirtin',             since: '2020', image: '/team/frontzek.jpg', initials: 'SF' },
  { name: 'Bettina Köhler',   role: 'Rechtsfachwirtin',             since: '2013', image: null,                 initials: 'BK' },
  { name: 'Amabella Focke',   role: 'Rechtsanwaltsfachangestellte', since: '2024', image: null,                 initials: 'AF' },
];

export default function Team() {
  return (
    <section id="kanzlei" className="relative py-24" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: '#1a5fb4' }}>
            Die Kanzlei
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
          >
            Unser Team
          </h2>
          <div className="accent-divider mx-auto mb-4" />
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(26,38,56,0.6)' }}>
            Ein erfahrenes Team aus spezialisierten Rechtsanwälten und qualifizierten Mitarbeiterinnen steht Ihnen zur Seite.
          </p>
        </motion.div>

        {/* Lawyers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {lawyers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,95,180,0.13)',
                boxShadow: '0 2px 8px rgba(26,95,180,0.06)',
              }}
            >
              {/* Photo header */}
              <div className="relative">
                <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient overlay at bottom for name legibility */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(14,30,70,0.82) 100%)' }}
                  />
                </div>
                {/* Name / role on top of gradient */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 text-center">
                  <h3
                    className="font-serif text-lg font-bold text-white leading-tight mb-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Card body */}
              <div className="px-6 py-5">
                {/* Specializations */}
                <div className="flex flex-col gap-1.5 mb-4">
                  {member.specializations.map((spec) => (
                    <div key={spec} className="flex items-center gap-2">
                      <Award size={13} style={{ color: '#1a5fb4', flexShrink: 0 }} />
                      <span className="text-xs font-medium" style={{ color: '#1a2638' }}>{spec}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(26,95,180,0.1)' }} className="pt-4">
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,38,56,0.58)' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support staff */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Scale size={18} style={{ color: '#1a5fb4' }} />
            <h3
              className="font-serif text-xl font-semibold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a2638' }}
            >
              Kanzleiteam
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {staff.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-xl overflow-hidden"
                style={{ background: '#ffffff', border: '1px solid rgba(26,95,180,0.13)', boxShadow: '0 2px 8px rgba(26,95,180,0.05)' }}
              >
                {/* Avatar */}
                <div className="relative w-full" style={{ height: 140 }}>
                  {s.image ? (
                    <>
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(14,30,70,0.55) 100%)' }}
                      />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-2xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #1a5fb4, #4a90d9)' }}
                    >
                      {s.initials}
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="px-4 py-3">
                  <p className="font-semibold text-sm mb-0.5" style={{ color: '#1a2638' }}>{s.name}</p>
                  <p className="text-xs leading-snug" style={{ color: '#1a5fb4' }}>{s.role}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(26,38,56,0.45)' }}>seit {s.since}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
