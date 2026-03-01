'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ImpressumModal, DatenschutzModal } from './LegalModals';

export default function Footer() {
  const year = new Date().getFullYear();
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);

  return (
    <>
      <footer style={{ borderTop: '1px solid rgba(26,95,180,0.15)', background: '#ffffff' }} className="py-10 px-6">
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: 'rgba(26,38,56,0.45)' }}
        >
          <Image
            src="/logo_neu_web.png"
            alt="Kanzlei Logo"
            height={36}
            width={140}
            className="h-8 w-auto object-contain opacity-70"
          />
          <p>© {year} Kanzlei Schreier &amp; Kollegen. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <button
              onClick={() => setImpressumOpen(true)}
              className="bg-transparent border-0 cursor-pointer p-0 transition-colors duration-150 hover:text-[#1a5fb4]"
              style={{ color: 'inherit', font: 'inherit' }}
            >
              Impressum
            </button>
            <button
              onClick={() => setDatenschutzOpen(true)}
              className="bg-transparent border-0 cursor-pointer p-0 transition-colors duration-150 hover:text-[#1a5fb4]"
              style={{ color: 'inherit', font: 'inherit' }}
            >
              Datenschutz
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {impressumOpen && <ImpressumModal key="impressum" onClose={() => setImpressumOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {datenschutzOpen && <DatenschutzModal key="datenschutz" onClose={() => setDatenschutzOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
