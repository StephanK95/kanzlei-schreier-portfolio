import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rechtsanwaltskanzlei Schreier & Kollegen – Dresden',
  description:
    'Ihre zuverlässige Rechtsanwaltskanzlei in Dresden – persönliche Beratung, fundiertes Fachwissen und engagierte Vertretung Ihrer Interessen.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
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
