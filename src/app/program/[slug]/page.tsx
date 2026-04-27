import { getTourBySlug } from '@/app/actions/tour';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import { ArrowLeft, ArrowRight, Star, Clock, Calendar, Users, Flame, CheckCircle, XCircle, MapPin, Info } from 'lucide-react';
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

  // Cast JSON arrays to known types
  const tour = {
    ...tourResponse,
    highlights: tourResponse.highlights as string[] || [],
    itinerary: tourResponse.itinerary as any[] || [],
    hotels: tourResponse.hotels as any[] || [],
    included: tourResponse.included as string[] || [],
    excluded: tourResponse.excluded as string[] || [],
    importantNotes: tourResponse.importantNotes as string[] || [],
    reviewCount: (tourResponse as any).reviewCount || 120 // Fallback since it's not in schema yet
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-slate-900">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link 
              href="/#turlar" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Turlara Dön
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {tour.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold bg-brand-600">
                  <Flame className="w-3.5 h-3.5" />
                  {tour.badge}
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                {tour.category === 'hac' ? 'Hac' : tour.category === 'umre' ? 'Umre' : tour.category}
              </span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {tour.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
               <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-400" />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-400" />
                  {tour.date}
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Program Özeti */}
            <section className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Program Özeti</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {tour.description}
              </p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                    <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />
                    <span className="text-slate-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gün Gün Program */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Gün Gün Program</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                          <span className="text-brand-700 font-bold text-lg">{item.day}</span>
                        </div>
                        {idx !== tour.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-brand-50 mt-2"></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          <span className="text-brand-600 mr-2">Gün {item.day}:</span> 
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Konaklama Bilgileri */}
            {tour.hotels && tour.hotels.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Konaklama Bilgileri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.hotels.map((hotel, idx) => (
                    <div key={idx} className="border border-slate-100 bg-slate-50 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                            {hotel.location}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: hotel.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                        <MapPin className="w-4 h-4 text-brand-500" />
                        Hareme Uzaklık: <span className="text-slate-900">{hotel.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Dahil Olanlar & Olmayanlar */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  Dahil Olanlar
                </h3>
                <ul className="space-y-4">
                  {tour.included?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-rose-500" />
                  Dahil Olmayanlar
                </h3>
                <ul className="space-y-4">
                  {tour.excluded?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600">
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Önemli Notlar */}
            {tour.importantNotes && tour.importantNotes.length > 0 && (
              <section className="bg-slate-100/50 border border-slate-200 p-8 rounded-[2rem]">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-brand-600" />
                  Önemli Notlar
                </h3>
                <ul className="space-y-3">
                  {tour.importantNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="mb-6">
                <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">Kişi Başı Fiyat</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-display font-bold text-brand-700">{tour.currency}{tour.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-brand-500" />
                    <span className="text-slate-600 font-medium">Kontenjan</span>
                  </div>
                  <span className="font-bold text-slate-900">{tour.seats} Kişi Kaldı</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-brand-500" />
                    <span className="text-slate-600 font-medium">Değerlendirme</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{tour.rating}</span>
                    <span className="text-slate-400 text-sm">({tour.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 -mx-8 -mb-8 px-8 pb-8">
                <InquiryForm tourId={tour.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
