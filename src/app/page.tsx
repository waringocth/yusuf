import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Hero from '@/components/Hero';
import TourCategories from '@/components/TourCategories';
import FeaturedTours from '@/components/FeaturedTours';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import StickyContact from '@/components/StickyContact';
import { getTours } from '@/app/actions/tour';
import { getAnnouncement } from '@/app/actions/announcement';
import { Suspense } from 'react';

export default async function HomePage() {
  const [tours, announcement] = await Promise.all([
    getTours(),
    getAnnouncement(),
  ]);

  const hasAnnouncement = !!(announcement?.isActive && announcement?.text);

  return (
    <>
      {/* Announcement Bar — renders above navbar, pushes it down */}
      {hasAnnouncement && (
        <AnnouncementBar
          text={announcement!.text}
          bgColor={announcement!.bgColor}
          textColor={announcement!.textColor}
        />
      )}

      <Navbar hasAnnouncement={hasAnnouncement} />

      <main>
        <Hero />
        <TourCategories />
        <Suspense fallback={<div className="py-20 text-center">Turlar yükleniyor...</div>}>
          <FeaturedTours initialTours={tours as any} />
        </Suspense>
        <ServicesSection />
        <StatsSection />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
      <StickyContact />
    </>
  );
}
