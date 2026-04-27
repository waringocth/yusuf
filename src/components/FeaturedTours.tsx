'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Calendar, Users, ArrowRight, Flame } from 'lucide-react';
import { tours } from '../data/tours';

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

export default function FeaturedTours() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('tumu');

  const filtered = activeFilter === 'tumu'
    ? tours
    : tours.filter((t) => t.category === activeFilter);

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
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Öne Çıkan Turlar
            </p>
            <h2 className="section-title">Popüler Programlarımız</h2>
          </div>
          <a href="#iletisim" className="btn-outline shrink-0">
            Tüm Turları Gör
          </a>
        </motion.div>

        {/* Filter Tabs */}
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

        {/* Tours Grid */}
        <AnimatePresence mode="popLayout">
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
                    {tour.categoryLabel}
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
                    <motion.a
                      href="#iletisim"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      Bilgi Al
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium">Bu kategoride şu an tur bulunmamaktadır.</p>
            <button
              onClick={() => setActiveFilter('tumu')}
              className="mt-4 btn-outline"
            >
              Tüm Turlara Dön
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
