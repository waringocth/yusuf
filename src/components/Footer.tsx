import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  hizmetler: [
    { label: 'Umre Turları', href: '#turlar' },
    { label: 'Hac Programları', href: '#turlar' },
    { label: 'Yurtiçi Turlar', href: '#turlar' },
    { label: 'Yurtdışı Turlar', href: '#turlar' },
    { label: 'Balkan Turları', href: '#turlar' },
    { label: 'Kültür Turları', href: '#turlar' },
  ],
  paketler: [
    { label: 'Ekonomik Umre Paketi', href: '#' },
    { label: 'Gümüş Umre Paketi', href: '#' },
    { label: 'Altın Umre Paketi', href: '#' },
    { label: 'Platin Umre Paketi', href: '#' },
    { label: 'Butik Umre', href: '#' },
    { label: 'Kurumsal Umre', href: '#' },
  ],
  kurumsal: [
    { label: 'Hakkımızda', href: '#hakkimizda' },
    { label: 'SSS', href: '#' },
    { label: 'KVKK Politikamız', href: '#' },
    { label: 'Umre Nedir?', href: '#' },
    { label: 'Hac Nedir?', href: '#' },
    { label: 'Online Ödeme', href: '#' },
  ],
};

// Server Component — no 'use client' needed (pure JSX, no hooks/interactivity)
export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="xl:col-span-2">
            <div className="mb-5">
              <Image
                src="/kılınç.png"
                alt="Kılınç Turizm"
                width={160}
                height={56}
                className="h-14 w-auto object-contain brightness-0 invert opacity-90"
                style={{ width: 'auto' }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              1993&apos;ten bu yana Hac, Umre ve kültür turlarında tam hizmet, tam ibadet.
              Diyanet onaylı programlarımızla güvenilir rehberiniz.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+905001234567" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />0500 123 45 67
              </a>
              <a href="mailto:info@kilincturizm.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />info@kilincturizm.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Bağcılar Mah. Atatürk Cad. No:12, Bağcılar / İstanbul</span>
              </div>
            </div>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-pink-400 transition-colors">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Hizmetlerimiz</h3>
            <ul className="space-y-2.5">
              {footerLinks.hizmetler.map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Paketlerimiz</h3>
            <ul className="space-y-2.5">
              {footerLinks.paketler.map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Kurumsal</h3>
            <ul className="space-y-2.5">
              {footerLinks.kurumsal.map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <span className="text-lg">🕌</span>
              <div>
                <p className="text-xs text-white font-semibold">Diyanet Onaylı</p>
                <p className="text-[10px] text-slate-500">Ruhsatlı Acente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kılınç Turizm. Tüm hakları saklıdır.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-slate-300 transition-colors">KVKK</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
