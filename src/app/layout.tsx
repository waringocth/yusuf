import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kılınç Turizm | 33 Yıllık Tecrübe ile Hac, Umre ve Kültür Turları',
    template: '%s | Kılınç Turizm',
  },
  description:
    'Kılınç Turizm, 33 yıllık deneyim ve Diyanet onaylı programlarıyla Hac, Umre, yurt içi ve yurt dışı kültür turlarında tam hizmet, tam ibadet sunuyor. Temmuz 2026 umre kayıtları başladı.',
  keywords: [
    'Umre', 'Hac', 'Kılınç Turizm', 'Temmuz Umre', 'Diyanet Onaylı Umre',
    'Umre Fiyatları', 'Kültür Turu', 'Balkan Turu', 'Hac Programı 2026',
  ],
  openGraph: {
    title: 'Kılınç Turizm | Hac, Umre ve Kültür Turları',
    description: '33 yıllık tecrübe ve Diyanet onayıyla kutsal topraklara güvenli yolculuk.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kılınç Turizm',
    description: '33 yıllık tecrübeyle Hac, Umre ve Kültür Turları.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
