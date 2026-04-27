'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/services';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);

  const visibleTestimonials = testimonials.slice(
    current * perPage,
    current * perPage + perPage
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Misafir Yorumları
          </p>
          <h2 className="section-title">Onlar Ne Diyor?</h2>
          <p className="section-subtitle mx-auto mt-4">
            Tüm yorumlar Google üzerinden alınmıştır. Gerçek deneyimler, gerçek insanlar.
          </p>
          {/* Overall rating */}
          <div className="inline-flex items-center gap-2 mt-5 bg-amber-50 border border-amber-100 rounded-full px-5 py-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-800 text-sm">4.9</span>
            <span className="text-slate-400 text-sm">/ 5 · 780+ değerlendirme</span>
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10"
          >
            {visibleTestimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:border-brand-100 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-brand-200 mb-4 shrink-0" />

                {/* Review text */}
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.city} · {t.date}</p>
                  </div>
                  {/* Google G */}
                  <div className="ml-auto w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-blue-600">
                    G
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-400 hover:text-brand-600 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === current ? 'bg-brand-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((p) => Math.min(totalPages - 1, p + 1))}
              disabled={current === totalPages - 1}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-400 hover:text-brand-600 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
