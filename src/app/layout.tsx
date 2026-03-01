import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rechtsanwaltskanzlei Schreier & Kollegen – Dresden',
  description:
    'Ihre zuverlässige Rechtsanwaltskanzlei in Dresden – persönliche Beratung, fundiertes Fachwissen und engagierte Vertretung Ihrer Interessen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
