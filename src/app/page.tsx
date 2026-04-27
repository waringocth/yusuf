import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TourCategories from '@/components/TourCategories';
import FeaturedTours from '@/components/FeaturedTours';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import StickyContact from '@/components/StickyContact';
import { getTours } from './actions/tour';

export default async function HomePage() {
  const tours = await getTours();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TourCategories />
        <FeaturedTours initialTours={tours as any} />
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
