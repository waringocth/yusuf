'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { Search, ChevronDown, MapPin, Calendar, Users, ArrowRight, ShieldCheck, Star, Award } from 'lucide-react';

import { useRouter } from 'next/navigation';

const destinations = [
  'Mekke & Medine (Umre)',
  'Mekke & Medine (Hac)',
  'İstanbul & Çevresi',
  'Kapadokya',
  'Balkanlar',
  'Endülüs & İspanya',
  'Fas Kültür Turu',
  'Ortadoğu Turu',
];

const destinationMap: Record<string, string> = {
  'Mekke & Medine (Umre)': 'umre',
  'Mekke & Medine (Hac)': 'hac',
  'İstanbul & Çevresi': 'yurtici',
  'Kapadokya': 'yurtici',
  'Balkanlar': 'balkan',
  'Endülüs & İspanya': 'yurtdisi',
  'Fas Kültür Turu': 'kultur',
  'Ortadoğu Turu': 'yurtdisi',
};

const months = [
  'Nisan 2026', 'Mayıs 2026', 'Haziran 2026', 'Temmuz 2026',
  'Ağustos 2026', 'Eylül 2026', 'Ekim 2026', 'Kasım 2026',
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Diyanet Onaylı', color: 'text-emerald-600' },
  { icon: Star, label: '4.9/5 Müşteri Memnuniyeti', color: 'text-amber-500' },
  { icon: Award, label: '33 Yıllık Deneyim', color: 'text-blue-600' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [persons, setPersons] = useState('');

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (destination && destinationMap[destination]) {
      params.set('category', destinationMap[destination]);
    }
    if (month) {
      params.set('date', month);
    }
    if (persons) {
      params.set('pax', persons);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/?${queryString}#turlar` : '/#turlar';
    router.push(url);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=85&w=2000&auto=format&fit=crop"
          alt="Mekke'deki Kabe"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-900/60 to-brand-950/80" />
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Temmuz 2026 Kayıtları Başladı — Sınırlı Kontenjan!
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Kutsal Topraklara{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
              Güvenli Yolculuk
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            33 yıllık deneyim ve Diyanet onayıyla; Hac, Umre ve Kültür turlarında tam hizmet, tam ibadet.
            Her yolculuk özenle planlanır, her anınız bereketli geçer.
          </motion.p>

          {/* Trust badges row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-10"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2">
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-white/90 text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Search Module */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl"
          >
            {/* Destination */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Destinasyon</p>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-sm font-medium text-slate-700 bg-transparent appearance-none outline-none cursor-pointer pr-4"
                  >
                    <option value="">Tur seçin...</option>
                    {destinations.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px bg-slate-200 self-stretch" />

            {/* Month */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Tarih</p>
                <div className="relative">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full text-sm font-medium text-slate-700 bg-transparent appearance-none outline-none cursor-pointer pr-4"
                  >
                    <option value="">Ay seçin...</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px bg-slate-200 self-stretch" />

            {/* Persons */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <Users className="w-5 h-5 text-brand-500 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Kişi Sayısı</p>
                <div className="relative">
                  <select
                    value={persons}
                    onChange={(e) => setPersons(e.target.value)}
                    className="text-sm font-medium text-slate-700 bg-transparent appearance-none outline-none cursor-pointer pr-4"
                  >
                    <option value="">Kişi...</option>
                    {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                      <option key={n} value={n}>{n} Kişi</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search button */}
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-brand-700 text-white font-bold text-sm hover:bg-brand-800 transition-colors shadow-lg cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Ara</span>
            </motion.button>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
            {['Umre Turları', 'Hac Programı', 'Balkan Turları', 'Kültür Turları'].map((tag) => (
              <a
                key={tag}
                href="#turlar"
                className="flex items-center gap-1.5 text-white/75 text-sm hover:text-white transition-colors group"
              >
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                {tag}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Keşfet</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
