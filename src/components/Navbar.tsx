'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'Hac & Umre',
    href: '#tur-kategorileri',
    dropdown: [
      { label: 'Umre Turları', href: '#turlar' },
      { label: 'Hac Programları', href: '#turlar' },
      { label: 'Ekonomik Paket', href: '#turlar' },
      { label: 'Gümüş Paket', href: '#turlar' },
      { label: 'Altın Paket', href: '#turlar' },
      { label: 'Platin Paket', href: '#turlar' },
    ],
  },
  {
    label: 'Turlar',
    href: '#turlar',
    dropdown: [
      { label: 'Yurtiçi Turlar', href: '#turlar' },
      { label: 'Yurtdışı Turlar', href: '#turlar' },
      { label: 'Balkan Turları', href: '#turlar' },
      { label: 'Kültür Turları', href: '#turlar' },
    ],
  },
  { label: 'Hizmetlerimiz', href: '#hizmetler' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'İletişim', href: '#iletisim' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/kılınç.png"
              alt="Kılınç Turizm"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    scrolled
                      ? 'text-slate-700 hover:text-brand-700 hover:bg-brand-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </a>
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden"
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+905001234567"
              className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? 'text-slate-700 hover:text-brand-700' : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>0500 123 45 67</span>
            </a>

            <a
              href="#iletisim"
              className={`btn-primary text-xs px-5 py-2.5 ${
                !scrolled ? 'bg-white text-brand-800 hover:bg-brand-50 shadow-lg' : ''
              }`}
            >
              Rezervasyon
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-80 max-w-full bg-white z-40 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <span className="font-display text-xl font-bold text-brand-900">Kılınç Turizm</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <div className="pl-4 mt-1 space-y-0.5">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 rounded-lg text-xs text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="p-5 border-t border-slate-100 space-y-3">
              <a href="tel:+905001234567" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 text-brand-800 font-semibold text-sm">
                <Phone className="w-4 h-4" />
                0500 123 45 67
              </a>
              <a href="#iletisim" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                Rezervasyon Yap
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
