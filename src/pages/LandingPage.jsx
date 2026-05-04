import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import NewHero from '../components/landing/NewHero';
import SolutionsSection from '../components/landing/SolutionsSection';
import InnovationSection from '../components/landing/InnovationSection';
import ODDSection from '../components/landing/ODDSection';
import DurabilitySection from '../components/landing/DurabilitySection';
import ImpactSection from '../components/landing/ImpactSection';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <NewHero />
        <SolutionsSection />
        <InnovationSection />
        <ODDSection />
        <DurabilitySection />
        <ImpactSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
