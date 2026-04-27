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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TourCategories />
        <FeaturedTours />
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
