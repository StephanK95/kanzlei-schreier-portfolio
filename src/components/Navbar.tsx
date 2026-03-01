'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { label: 'Leistungen', href: 'leistungen' },
  { label: 'Über uns', href: 'ueber-uns' },
  { label: 'Kanzlei', href: 'kanzlei' },
  { label: 'Kontakt', href: 'kontakt' },
];

/** Smooth-scrolls to a section id, accounting for the fixed navbar height */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 72; // px — matches navbar padding
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* Highlight the active section as user scrolls */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <nav className="navbar-fixed">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <Image
            src="/logo_neu_web.png"
            alt="Kanzlei Schreier Logo"
            height={48}
            width={180}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="relative text-sm font-medium tracking-wide transition-colors duration-200 bg-transparent border-0 cursor-pointer pb-0.5"
                style={{ color: isActive ? '#1a5fb4' : '#1a2638' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1a5fb4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? '#1a5fb4' : '#1a2638')}
              >
                {link.label}
                {/* Active underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 rounded-full"
                  style={{ background: '#1a5fb4' }}
                  initial={false}
                  animate={{ width: isActive ? '100%' : '0%' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </button>
            );
          })}
          <button
            onClick={() => handleNav('kontakt')}
            className="inline-flex items-center text-sm font-semibold rounded px-5 py-2 transition-all duration-200 cursor-pointer border-0"
            style={{ background: '#1a5fb4', color: '#ffffff' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#134a8e';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(26,95,180,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#1a5fb4';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Beratungsgespräch
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ background: '#1a5fb4' }}
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ background: '#1a5fb4' }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ background: '#1a5fb4' }}
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div
              className="max-w-6xl mx-auto pt-4 pb-6 flex flex-col gap-3 mt-4"
              style={{ borderTop: '1px solid rgba(26,95,180,0.15)' }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm font-medium tracking-wide py-1 bg-transparent border-0 cursor-pointer transition-colors duration-150"
                  style={{ color: activeSection === link.href ? '#1a5fb4' : '#1a2638' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('kontakt')}
                className="inline-flex items-center justify-center text-sm font-semibold rounded px-5 py-2.5 mt-2 cursor-pointer border-0"
                style={{ background: '#1a5fb4', color: '#ffffff' }}
              >
                Beratungsgespräch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
