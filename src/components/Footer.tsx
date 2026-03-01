import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid rgba(26,95,180,0.15)', background: '#ffffff' }} className="py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'rgba(26,38,56,0.45)' }}>
        <Image
          src="/logo_neu_web.png"
          alt="Kanzlei Logo"
          height={36}
          width={140}
          className="h-8 w-auto object-contain opacity-70"
        />
        <p>© {year} Kanzlei Schreier &amp; Kollegen. Alle Rechte vorbehalten.</p>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-[#1a5fb4]">Impressum</a>
          <a href="#" className="transition-colors hover:text-[#1a5fb4]">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}
