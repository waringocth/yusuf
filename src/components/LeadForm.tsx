'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const tourOptions = [
  'Ekonomik Umre Paketi','Gümüş Umre Paketi','Altın Umre Paketi','Platin Umre Paketi',
  'Hac Programı 2026','Yurtiçi Tur','Yurtdışı Tur','Balkan Turu','Kültür Turu','Butik / Kurumsal Umre',
];

const contactInfo = [
  { icon: Phone, title: 'Telefon', value: '0500 123 45 67', sub: 'Hafta içi 09:00 – 18:00', href: 'tel:+905001234567', color: 'bg-brand-50 text-brand-600' },
  { icon: Mail, title: 'E-posta', value: 'info@kilincturizm.com', sub: 'En geç 24 saatte yanıt', href: 'mailto:info@kilincturizm.com', color: 'bg-emerald-50 text-emerald-600' },
  { icon: MapPin, title: 'Adres', value: 'Bağcılar / İstanbul', sub: 'Randevu için arayın', href: '#', color: 'bg-rose-50 text-rose-600' },
  { icon: Clock, title: 'Çalışma Saatleri', value: 'Pazartesi – Cumartesi', sub: '09:00 – 18:30', href: '#', color: 'bg-amber-50 text-amber-600' },
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <section id="iletisim" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Hızlı Rezervasyon</p>
          <h2 className="section-title">Size Özel Teklif Alın</h2>
          <p className="section-subtitle mx-auto mt-4">Formu doldurun, uzman ekibimiz 24 saat içinde size ulaşsın. WhatsApp üzerinden anlık destek de mevcuttur.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-2 space-y-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.title} href={item.href} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all duration-200 group">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{item.title}</p>
                    <p className="font-semibold text-slate-900 text-sm mt-0.5">{item.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </a>
              );
            })}
            <a href="https://wa.me/905001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#25D366] rounded-2xl p-5 text-white font-semibold hover:bg-[#20b957] transition-colors shadow-md">
              <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp ile Yazın</span>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Talebiniz Alındı!</h3>
                <p className="text-slate-500 text-sm max-w-sm">Uzman ekibimiz en kısa sürede sizinle iletişime geçecek.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 btn-outline">Yeni Talep Oluştur</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Ad Soyad *</label>
                    <input type="text" required placeholder="Adınız ve soyadınız" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all placeholder:text-slate-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Telefon *</label>
                    <input type="tel" required placeholder="05XX XXX XX XX" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all placeholder:text-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">E-posta</label>
                  <input type="email" placeholder="ornek@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all placeholder:text-slate-300" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Tur Tercihi</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 outline-none text-sm text-slate-700">
                      <option value="">Seçiniz...</option>
                      {tourOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Planlanan Tarih</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 outline-none text-sm text-slate-700">
                      <option value="">Ay seçin...</option>
                      {['Nisan 2026','Mayıs 2026','Haziran 2026','Temmuz 2026','Ağustos 2026','Eylül 2026','Ekim 2026'].map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Mesajınız</label>
                  <textarea rows={4} placeholder="Eklemek istediğiniz detaylar, kişi sayısı, özel istekleriniz..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 outline-none text-sm placeholder:text-slate-300 resize-none" />
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-700 text-white font-semibold hover:bg-brand-800 transition-colors shadow-lg disabled:opacity-70">
                  {loading ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Gönderiliyor...</>) : (<><Send className="w-4 h-4" />Teklif Talep Et</>)}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
