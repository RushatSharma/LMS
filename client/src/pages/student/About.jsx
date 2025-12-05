import React from 'react';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const About = () => {
  return (
    <div className="text-default min-h-screen bg-brand-cream dark:bg-background w-full transition-colors duration-300 font-jakarta overflow-x-hidden">
      
      {/* --- 1. Compact Cinema Hero Section --- */}
      <div className="pt-20 pb-16 px-8 md:px-20 relative overflow-hidden">
        
        {/* Animated Background Gradients */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-gradient-to-b from-brand-peach/40 via-transparent to-transparent dark:from-primary/10 dark:to-transparent pointer-events-none -z-10 blur-3xl animate-pulse'></div>

        <div className="text-center max-w-4xl mx-auto mb-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark dark:text-white leading-tight font-outfit mb-6">
            Revolutionizing the way <br/> the world learns.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are bridging the gap between ambition and achievement. Edulink isn't just a platform; it's a global movement to democratize education and empower the next generation of creators.
          </p>
        </div>

        {/* Hero Image & Floating Stats */}
        <div className="relative max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 relative z-10 group">
                <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop" 
                    alt="Global Learning Community" 
                    // Reduced height for better first-screen visibility
                    className="w-full h-[200px] md:h-[350px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Image Overlay Text */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white hidden md:block">
                    <p className="font-bold text-xl">Global Community</p>
                    <p className="text-white/80 text-sm">Learners from 120+ countries</p>
                </div>
            </div>

            {/* Floating Stats Bar */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] bg-white dark:bg-card border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl py-6 px-4 md:px-10 z-20 flex flex-wrap md:flex-row items-center justify-between gap-4 md:gap-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-center flex-1 min-w-[100px] md:border-r border-gray-200 dark:border-white/10">
                    <p className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-outfit">5k+</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-1">Active Learners</p>
                </div>
                <div className="text-center flex-1 min-w-[100px] md:border-r border-gray-200 dark:border-white/10">
                    <p className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-outfit">100+</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-1">Expert Courses</p>
                </div>
                <div className="text-center flex-1 min-w-[100px] md:border-r border-gray-200 dark:border-white/10">
                    <p className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-outfit">15+</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-1">Countries</p>
                </div>
                <div className="text-center flex-1 min-w-[100px]">
                    <p className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-outfit">4.9</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-1">User Rating</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- 2. Enhanced Story Section --- */}
      <div className="pt-32 pb-24 px-8 md:px-36 bg-white dark:bg-background border-t border-gray-100 dark:border-white/5 space-y-24">
        
        {/* Story 1: Origin */}
        <div className="grid md:grid-cols-2 gap-16 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className='order-2 md:order-1 space-y-6'>
                <span className="text-primary font-bold uppercase tracking-widest text-sm block">Our Origin</span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white leading-tight">Born from a passion <br/> for sharing knowledge.</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    It started in 2023 with a simple observation: Talent is universal, but opportunity is not. We saw brilliant minds held back by geography, cost, and outdated educational models.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    Edulink was created to break down those barriers. We curated a platform where industry experts could share their real-world experience directly with eager learners, bypassing traditional gatekeepers.
                </p>
            </div>
            <div className="relative order-1 md:order-2 group">
                <div className="absolute -right-4 -bottom-4 w-full h-full bg-brand-green/20 rounded-3xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" 
                    alt="Our start" 
                    className="rounded-3xl shadow-xl w-full h-[350px] object-cover" 
                />
            </div>
        </div>

        {/* Story 2: Vision */}
        <div className="grid md:grid-cols-2 gap-16 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="relative group">
                <div className="absolute -left-4 -top-4 w-full h-full bg-brand-peach/50 dark:bg-primary/20 rounded-3xl -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
                <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop" 
                    alt="Our future" 
                    className="rounded-3xl shadow-xl w-full h-[350px] object-cover" 
                />
            </div>
            <div className='space-y-6'>
                <span className="text-primary font-bold uppercase tracking-widest text-sm block">Our Vision</span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white leading-tight">Building the future <br/> of digital learning.</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    We aren't just hosting courses; we are building ecosystems. From interactive coding environments to peer-to-peer review systems, we are constantly innovating to make online learning as immersive as possible.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    Our goal is to create a world where your skills define your opportunities, not your background. We envision a future where anyone, anywhere can become an expert in anything.
                </p>
            </div>
        </div>

        {/* Story 3: Impact */}
        <div className="grid md:grid-cols-2 gap-16 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className='order-2 md:order-1 space-y-6'>
                <span className="text-primary font-bold uppercase tracking-widest text-sm block">Global Impact</span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white leading-tight">Empowering careers <br/> across the globe.</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    From career switchers landing their first tech jobs to seasoned professionals upskilling for leadership roles, our community's success stories fuel our passion.
                </p>
                <div className="flex gap-4 pt-2">
                    <div className="pl-4 border-l-4 border-brand-green">
                        <p className="text-2xl font-bold text-brand-dark dark:text-white">92%</p>
                        <p className="text-sm text-gray-500">Completion Rate</p>
                    </div>
                    <div className="pl-4 border-l-4 border-brand-peach">
                        <p className="text-2xl font-bold text-brand-dark dark:text-white">85%</p>
                        <p className="text-sm text-gray-500">Career Growth</p>
                    </div>
                </div>
            </div>
            <div className="relative order-1 md:order-2 group">
                <div className="absolute -right-4 -bottom-4 w-full h-full bg-[#E3E3F5] dark:bg-white/10 rounded-3xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop" 
                    alt="Team Collaboration" 
                    className="rounded-3xl shadow-xl w-full h-[350px] object-cover" 
                />
            </div>
        </div>
      </div>

      {/* --- 3. Expanded Values Grid --- */}
      <div className="py-24 px-8 md:px-20 bg-brand-cream dark:bg-card border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white mb-4 font-outfit">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide every decision we make, from code to curriculum.</p>
        </div>

        {/* Updated Grid Logic: auto-rows-auto for mobile flexibility, fixed rows only on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto auto-rows-auto md:auto-rows-[250px]">
            {/* Large Card - Innovation First */}
            <div className="md:col-span-2 row-span-1 md:row-span-2 rounded-[2.5rem] p-10 bg-white dark:bg-[#003049] border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center group">
                <h3 className="text-3xl font-bold text-brand-dark dark:text-white mb-5">Innovation First</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  We don't just follow trends; we set them. We are constantly experimenting with new AI-driven tools, interactive formats, and personalized learning paths to create the most engaging educational environment possible.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Our commitment to cutting-edge technology ensures that our learners are always ahead of the curve. From virtual labs to adaptive assessments, we provide a learning experience that mirrors the future of work.
                </p>
            </div>

            {/* Medium Card */}
            <div className="md:col-span-2 rounded-[2.5rem] p-10 bg-[#C9E2D3] dark:bg-[#064e3b] border border-transparent dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-3">Learner Obsessed</h3>
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                  Every feature we build starts with one question: "Does this help the learner succeed?" We prioritize your growth over everything else, obsessing over user feedback to create the most intuitive and effective learning experience possible.
                </p>
            </div>

            {/* Small Card */}
            <div className="md:col-span-1 rounded-[2.5rem] p-8 bg-[#FFE3E3] dark:bg-[#881337] border border-transparent dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">Integrity</h3>
                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Honest education. Transparent pricing. No hidden fees. We believe in building trust through total transparency.
                </p>
            </div>

            {/* Small Card */}
            <div className="md:col-span-1 rounded-[2.5rem] p-8 bg-[#E3E3F5] dark:bg-[#c1121f] border border-transparent dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">Community</h3>
                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Growth happens together. We build supportive environments where learners connect, collaborate, and succeed as one.
                </p>
            </div>
        </div>
      </div>

      {/* --- 4. New "Join Us" CTA Section --- */}
      <div className="py-24 px-8 text-center bg-white dark:bg-background transition-colors duration-300">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-dark dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-8">
            Be part of the revolution
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Join thousands of learners and instructors who are reshaping the future of education. Your journey starts here.
        </p>
        <button className="bg-brand-dark text-white dark:bg-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
            Start Learning Now
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default About;