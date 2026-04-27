import { getTourBySlug, getTours } from '@/app/actions/tour';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import TourItinerary from '@/components/TourItinerary';
import StickyBookingBar from '@/components/StickyBookingBar';
import {
  ArrowLeft, Star, Clock, Calendar, Users, Flame,
  CheckCircle, XCircle, MapPin, Info, ChevronRight, Hotel
} from 'lucide-react';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: 'Tur Bulunamadı | Kılınç Turizm',
      description: 'Aradığınız tur programı bulunamadı.',
    };
  }

  return {
    title: `${tour.title} | Kılınç Turizm`,
    description: tour.description.substring(0, 160),
    openGraph: {
      title: `${tour.title} | Kılınç Turizm`,
      description: tour.description.substring(0, 160),
      images: [tour.image],
    },
  };
}

export default async function ProgramDetail({ params }: PageProps) {
  const { slug } = await params;
  const tourResponse = await getTourBySlug(slug);

  if (!tourResponse) {
    notFound();
  }

  const tour = {
    ...tourResponse,
    highlights: tourResponse.highlights as string[] || [],
    itinerary: tourResponse.itinerary as any[] || [],
    hotels: tourResponse.hotels as any[] || [],
    included: tourResponse.included as string[] || [],
    excluded: tourResponse.excluded as string[] || [],
    importantNotes: tourResponse.importantNotes as string[] || [],
    reviewCount: (tourResponse as any).reviewCount || 120
  };

  // Fetch related tours (same category, different slug, limit 3)
  const allTours = await getTours();
  const relatedTours = allTours
    .filter((t) => t.category === tour.category && t.slug !== tour.slug)
    .slice(0, 3);

  const categoryLabel = tour.category === 'hac' ? 'Hac Turları' : tour.category === 'umre' ? 'Umre Turları' : tour.category;

  return (
    <main className="min-h-screen bg-slate-50 pb-32 lg:pb-20">
      {/* Sticky mobile booking bar */}
      <StickyBookingBar price={tour.price} currency={tour.currency} title={tour.title} />

      {/* Hero Section */}
      <div className="relative h-[65vh] min-h-[480px] w-full bg-slate-900">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/60 text-xs font-medium mb-5">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/#turlar" className="hover:text-white transition-colors">{categoryLabel}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/90 truncate max-w-[200px]">{tour.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              {tour.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold bg-brand-600">
                  <Flame className="w-3.5 h-3.5" />
                  {tour.badge}
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                {categoryLabel}
              </span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight max-w-4xl tracking-tight">
              {tour.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-400" />
                {tour.date}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-400" />
                {tour.seats} kontenjan kaldı
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {tour.rating} ({tour.reviewCount} değerlendirme)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Program Özeti */}
            <section className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-5 tracking-tight">Program Özeti</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {tour.description}
              </p>
              
              {tour.highlights.length > 0 && (
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-brand-50 p-3.5 rounded-2xl">
                      <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />
                      <span className="text-slate-700 font-medium text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Gün Gün Program — Accordion */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-7 tracking-tight">Tur Programı</h2>
                <TourItinerary itinerary={tour.itinerary} />
              </section>
            )}

            {/* Dahil Olanlar & Olmayanlar */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </span>
                  Fiyata Dahil
                </h3>
                <ul className="space-y-3">
                  {tour.included?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </span>
                  Dahil Değil
                </h3>
                <ul className="space-y-3">
                  {tour.excluded?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Konaklama */}
            {tour.hotels && tour.hotels.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-7 tracking-tight flex items-center gap-3">
                  <Hotel className="w-7 h-7 text-brand-500" />
                  Konaklama Detayları
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {tour.hotels.map((hotel, idx) => (
                    <div key={idx} className="border border-slate-100 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                            {hotel.location}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">{hotel.name}</h3>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: hotel.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-brand-400" />
                        Hareme Uzaklık: <span className="text-slate-800 font-semibold">{hotel.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Önemli Notlar — alert style */}
            {tour.importantNotes && tour.importantNotes.length > 0 && (
              <section className="bg-amber-50 border border-amber-200 p-7 rounded-[2rem]">
                <h3 className="font-display text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-amber-600" />
                  Önemli Notlar
                </h3>
                <ul className="space-y-3">
                  {tour.importantNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-amber-800 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                <div className="mb-6">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Kişi Başı Fiyat</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-display font-bold text-brand-700">{tour.currency}{tour.price}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-brand-500" />
                      <span className="text-slate-600 font-medium text-sm">Kontenjan</span>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{tour.seats} Kişi Kaldı</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brand-500" />
                      <span className="text-slate-600 font-medium text-sm">Süre</span>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{tour.duration}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <Star className="w-4 h-4 text-brand-500" />
                      <span className="text-slate-600 font-medium text-sm">Puan</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{tour.rating}</span>
                      <span className="text-slate-400 text-xs">({tour.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="-mx-8 -mb-8 px-8 pb-8">
                  <InquiryForm tourId={tour.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 tracking-tight">Benzer Programlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTours.map((related) => (
                <Link key={related.id} href={`/program/${related.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 bg-slate-200">
                    <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {related.badge && (
                      <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3" /> {related.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-slate-900 text-lg mb-2 leading-tight group-hover:text-brand-700 transition-colors">{related.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <Clock className="w-3.5 h-3.5" /> {related.duration}
                      </div>
                      <span className="font-display font-bold text-brand-700">{related.currency}{related.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
