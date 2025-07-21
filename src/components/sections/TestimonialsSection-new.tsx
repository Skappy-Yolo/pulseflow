import React from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { TestimonialCard } from '../ui/TestimonialCard';
import { images } from '../../assets/images';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Samuel",
      company: "Miska Inc",
      role: "Remote Systems Lead",
      avatar: images.profile1,
      quote: "PulseFlow has been a game changer for our remote team. We can now track all our projects and client health in one dashboard without switching between 5 different tools."
    },
    {
      name: "Sarah Chen",
      company: "TechFlow Solutions",
      role: "Operations Director",
      avatar: images.profile2,
      quote: "Finally, a tool that gives us real-time insights across all our client touchpoints. Our team productivity has increased by 40% since implementing PulseFlow."
    },
    {
      name: "Michael Rodriguez",
      company: "Growth Partners",
      role: "Senior Consultant",
      avatar: images.profile3,
      quote: "The unified reporting has eliminated hours of manual data gathering. Now I can focus on strategy instead of chasing down numbers from different systems."
    }
  ];

  return (
    <Section background="white">
      <SectionHeader
        title="Join the league of Satisfied Customers"
        subtitle="See how we've transformed businesses across different industries and geographies just like yours"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            {...testimonial}
          />
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;
