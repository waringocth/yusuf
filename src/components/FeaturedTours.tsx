'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Calendar, Users, ArrowRight, Flame, X, Search } from 'lucide-react';
import { Tour } from '../data/tours';
import { useSearchParams, useRouter } from 'next/navigation';

type FilterKey = 'tumu' | 'umre' | 'hac' | 'yurtici' | 'yurtdisi' | 'balkan';

const filterTabs: { key: FilterKey; label: string }[] = [
  { key: 'tumu', label: 'Tümü' },
  { key: 'umre', label: 'Umre' },
  { key: 'hac', label: 'Hac' },
  { key: 'yurtici', label: 'Yurtiçi' },
  { key: 'yurtdisi', label: 'Yurtdışı' },
  { key: 'balkan', label: 'Balkan' },
];

const badgeColor: Record<string, string> = {
  'Çok Satan': 'bg-rose-500',
  'Önerilen': 'bg-brand-600',
  'VIP': 'bg-amber-500',
  'Yeni': 'bg-emerald-500',
  'Popüler': 'bg-violet-500',
};

export default function FeaturedTours({ initialTours = [] }: { initialTours?: Tour[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('tumu');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const urlCategory = searchParams.get('category');
  const urlDate = searchParams.get('date');
  const urlPax = searchParams.get('pax');

  const isFilterActive = urlCategory || urlDate || urlPax;

  let filtered = initialTours;

  // 1. URL parameters have highest priority for category
  if (urlCategory) {
    filtered = filtered.filter((t) => t.category === urlCategory);
  } 
  // 2. Otherwise use local filter tab
  else if (activeFilter !== 'tumu') {
    filtered = filtered.filter((t) => t.category === activeFilter);
  }

  // Filter by date (simple includes check)
  if (urlDate) {
    filtered = filtered.filter((t) => t.date.includes(urlDate));
  }

  // Filter by quota (seats)
  if (urlPax) {
    const paxNum = parseInt(urlPax, 10);
    filtered = filtered.filter((t) => t.seats >= paxNum);
  }

  const clearFilters = () => {
    router.push('/#turlar');
  };

  return (
    <section id="turlar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-4 mb-2">
              <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest">
                Öne Çıkan Turlar
              </p>
              {isFilterActive && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs font-semibold bg-rose-50 text-rose-600 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Filtreleri Temizle
                </button>
              )}
            </div>
            <h2 className="section-title">Popüler Programlarımız</h2>
          </div>
          <a href="#iletisim" className="btn-outline shrink-0">
            Tüm Turları Gör
          </a>
        </motion.div>

        {/* Filter Tabs */}
        {!isFilterActive && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === tab.key
                    ? 'bg-brand-700 text-white shadow-md shadow-brand-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Tours Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"
            >
              {filtered.map((tour, i) => (
                <motion.article
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="card group flex flex-col overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Badge */}
                    {tour.badge && (
                      <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-bold ${badgeColor[tour.badge] ?? 'bg-brand-600'}`}>
                        <Flame className="w-3 h-3" />
                        {tour.badge}
                      </span>
                    )}

                    {/* Category tag */}
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {tour.category === 'hac' ? 'Hac' : tour.category === 'umre' ? 'Umre' : tour.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-display text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-brand-700 transition-colors">
                      {tour.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand-400" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-400" />
                        {tour.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-brand-400" />
                        {tour.seats} yer kaldı
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${idx < Math.floor(tour.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{tour.rating}</span>
                      <span className="text-xs text-slate-400">({tour.reviewCount} değerlendirme)</span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tour.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-md font-medium">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-xs text-slate-400">Kişi başı başlangıç fiyatı</span>
                        <p className="text-2xl font-bold text-brand-700 leading-none mt-0.5">
                          {tour.currency}{tour.price}
                        </p>
                      </div>
                      <Link href={`/program/${tour.slug}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Bilgi Al
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100"
            >
              <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Program Bulunamadı</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8">
                Seçtiğiniz kriterlere uygun program bulunamadı. Lütfen farklı tarihler veya destinasyonlar deneyin.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Filtreleri Temizle
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
