import React from 'react';
import Footer from '../../components/student/Footer';
import Hero from '../../components/student/Hero';
import Companies from '../../components/student/Companies';
import CoursesSection from '../../components/student/CoursesSection';
import TestimonialsSection from '../../components/student/TestimonialsSection';
import FeaturesSection from '../../components/student/FeaturesSection';
import HowItWorks from '../../components/student/HowItWorks'; 
import MentorsSection from '../../components/student/MentorsSection'; 


const Home = () => {

  return (
    <div className="flex flex-col items-center space-y-0 text-center bg-brand-cream min-h-screen w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* 2. Companies Logos */}
      <div className="w-full">
        <Companies />
      </div>

      {/* 3. Why Choose Us (Bento Grid) */}
      <div className="w-full">
        <FeaturesSection />
      </div>

      {/* 4. Popular Courses */}
      <div className="w-full">
        <CoursesSection />
      </div>
      
      {/* 5. How It Works (Steps) */}
      <div className='w-full'>
        <HowItWorks />
      </div>

      {/* 6. Mentors Section */}
      <div className="w-full">
        <MentorsSection />
      </div>

      {/* 7. Testimonials (White Background for contrast) */}
      <div className="w-full">
        <TestimonialsSection />
      </div>

      {/* 8. Footer (Includes 'Unlock Potential' CTA) */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;