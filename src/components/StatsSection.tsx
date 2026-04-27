'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/services';

function AnimatedCounter({ value }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const isDecimal = value % 1 !== 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(parseFloat((eased * value).toFixed(isDecimal ? 1 : 0)));
      if (step >= steps) {
        setDisplayed(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value % 1 !== 0 ? displayed.toFixed(1) : displayed.toLocaleString('tr-TR')}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section id="hakkimizda" className="relative py-24 overflow-hidden">
      {/* ─── Background image + strong dark gradient overlay ─── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=85&w=2000&auto=format&fit=crop"
          alt="Mekke Kabe gece"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* deep gradient — left-to-right + bottom dark pool */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-950/80 to-brand-900/70" />
        {/* extra vignette at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Section label + headline ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* FIX 3: Gold overline for maximum contrast */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 font-bold text-xs uppercase tracking-[0.2em] mb-5">
            ✦ Neden Biz?
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mt-2">
            33 Yıldır Güvenilenler Arasındayız
          </h2>
          <p className="text-white/65 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Rakamlar, verdiğimiz hizmetin kalitesini anlatıyor. Her yolculuk bir emanet,
            her misafirimiz bir aile üyesi.
          </p>
        </motion.div>

        {/* ─── Stats grid — glassmorphism card ─── FIX 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl px-6 py-10 mb-14"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-4 lg:py-0 lg:px-4 first:pt-0 last:pb-0 lg:first:pt-4 lg:last:pb-4"
              >
                <div className="inline-flex items-baseline gap-0.5 justify-center">
                  <span className="font-display text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="font-display text-2xl md:text-3xl font-bold text-gold-400 ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-white/70 text-sm font-semibold mt-2 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── About text + Image ─── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* FIX 1: Text block inside glass card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-5">
              Kılınç Turizm Hakkında
            </h3>
            <div className="space-y-4 text-white/75 text-sm leading-relaxed">
              <p>
                1993 yılında kurulan Kılınç Turizm, bugüne kadar 15.000&apos;den fazla misafirimize
                Hac, Umre ve kültür turu organizasyonları gerçekleştirmiştir. Firmamız,
                Diyanet İşleri Başkanlığı&apos;nın onaylı acenteleri arasında yer almakta;
                en yüksek kalite standartlarında hizmet sunmaktadır.
              </p>
              <p>
                Her programımız, başından sonuna kadar alanında uzman ekibimiz tarafından
                titizlikle planlanmaktadır. Harem-i Şerif&apos;e yakın 4 ve 5 yıldızlı otel
                konaklamalarımız, Türk mutfağından oluşan yemeklerimiz ve tecrübeli dini
                rehberlerimizle eşsiz bir ibadet deneyimi sunuyoruz.
              </p>
              <p>
                Sadece fiyat değil, kalite ve güvenilirlik önceliğimizdir. Misafirlerimizin
                %87&apos;si bizi çevrelerine tavsiye etmekte, %64&apos;ü ikinci kez bizimle
                yolculuğa çıkmaktadır.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-800 font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg"
              >
                Bize Ulaşın
              </a>
              <a
                href="#turlar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/50 transition-colors"
              >
                Turlarımızı İncele
              </a>
            </div>
          </motion.div>

          {/* FIX 2: Replaced broken image with a verified Unsplash URL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative pt-5"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative w-full h-80">
                <Image
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=900&auto=format&fit=crop"
                  alt="Mescid-i Haram gece manzarası"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* subtle inner overlay for image depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Award Badge */}
            <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">THY Ödülü</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">En Fazla Umreci Taşıyan Acente</p>
                <p className="text-xs text-slate-400">5 Yıl Üst Üste</p>
              </div>
            </div>

            {/* Decorative stat pill */}
            <div className="absolute -top-3 -right-3 bg-brand-700 rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-white font-bold text-sm leading-tight">4.9 / 5</p>
                <p className="text-brand-200 text-xs">780+ Yorum</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
