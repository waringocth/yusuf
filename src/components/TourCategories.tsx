'use client';

import Image from 'next/image';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { tourCategories } from '../data/tours';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function TourCategories() {
  return (
    <section id="tur-kategorileri" className="py-20 bg-slate-50">
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
            Tur Kategorileri
          </p>
          <h2 className="section-title">Nereye Gitmek İstersiniz?</h2>
          <p className="section-subtitle mx-auto mt-4">
            Hac ve Umre&apos;den kültür turlarına, yurtiçinden yurtdışına — her ihtiyaca uygun programımız var.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tourCategories.map((cat) => (
            <motion.a
              key={cat.id}
              href="#turlar"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer block"
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-900/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                      {cat.count} tur mevcut
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1 leading-snug">
                      {cat.label}
                    </h3>
                    <p className="text-white/70 text-xs mt-1">{cat.fromPrice}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors mt-1">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-2">{cat.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
