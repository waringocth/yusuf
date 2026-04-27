import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/app/actions/settings';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Record<string, string> = {};
  try {
    settings = await getSettings();
  } catch {
    // Settings table may not exist yet (before db push), fail silently
  }

  const gtmId = settings.gtm_id;
  const metaPixelId = settings.meta_pixel_id;

  return (
    <html lang="tr">
      <head>
        {/* Google Tag Manager */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}

        {/* Meta Pixel */}
        {metaPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`,
            }}
          />
        )}
      </head>
      <body>
        {/* GTM NoScript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
