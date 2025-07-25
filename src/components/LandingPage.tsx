import React from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import DidYouKnowSection from './sections/DidYouKnowSection';
import SolutionsSection from './sections/SolutionsSection';
import TestimonialsCTAFooter from './sections/TestimonialsCTAFooter';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <DidYouKnowSection />
      <SolutionsSection />
      <TestimonialsCTAFooter />
    </>
  );
};

export { LandingPage };
export default LandingPage;
