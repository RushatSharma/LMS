import React from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    // Changed py-16 to pt-5 pb-16 to pull the content up closer to the navbar
    <div className="flex flex-col md:flex-row items-center justify-between w-full pt-16 pb-16 px-8 md:px-36 gap-14 bg-brand-cream relative overflow-hidden">
      
      {/* 1. Background Blobs for Depth */}
      <div className='absolute top-0 -left-20 w-96 h-96 bg-brand-peach/40 rounded-full blur-[80px] pointer-events-none'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-brand-green/20 rounded-full blur-[80px] pointer-events-none'></div>

      {/* 2. Left Side: Content */}
      <div className="flex flex-col items-start text-left gap-6 md:w-1/2 z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">New Courses Live</p>
        </div>

        <h1 className="md:text-6xl text-4xl font-bold text-brand-dark leading-[1.1] font-outfit relative">
          Giving you best <br/> 
          <span className="relative inline-block text-brand-dark">
            Education
            {/* Vector Underline Decoration */}
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-green" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99996C32.9998 1.99996 99.0003 2.99996 198.001 7.49996" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </span> is our <br/>
          passion
        </h1>
        
        <p className="md:text-lg text-gray-500 max-w-lg leading-relaxed">
          We bring together world-class instructors, interactive content, and a supportive community to help you achieve your professional goals.
        </p>

        {/* Premium Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-xl w-full max-w-lg overflow-hidden p-2 mt-4 border border-gray-100/50 group focus-within:ring-2 focus-within:ring-brand-green/20 transition-all">
          <input 
            type="text" 
            placeholder="What do you want to learn today?" 
            className="flex-1 outline-none px-4 text-gray-600 bg-transparent placeholder:text-gray-400"
          />
          <button 
            onClick={() => navigate('/course-list')}
            className="bg-brand-green p-3.5 rounded-full hover:bg-brand-dark hover:scale-105 transition-all duration-300 shadow-md"
          >
            <img src={assets.search_icon} alt="Search" className="w-5 h-5 invert brightness-0" />
          </button>
        </div>

        {/* Social Proof / Stats */}
        <div className="flex items-center gap-4 mt-4">
           <div className='flex -space-x-3'>
              <img src={assets.profile_img_1} className='w-10 h-10 rounded-full border-2 border-white shadow-sm' alt=""/>
              <img src={assets.profile_img_2} className='w-10 h-10 rounded-full border-2 border-white shadow-sm' alt=""/>
              <img src={assets.profile_img_3} className='w-10 h-10 rounded-full border-2 border-white shadow-sm' alt=""/>
              <div className='w-10 h-10 rounded-full border-2 border-white bg-brand-dark text-white flex items-center justify-center text-xs font-bold'>+5k</div>
           </div>
           <div>
             <p className='font-bold text-brand-dark text-lg leading-none'>55k+</p>
             <p className='text-sm text-gray-500'>Active Students</p>
           </div>
        </div>
      </div>

      {/* 3. Right Side: Hero Image Composition */}
      <div className="md:w-1/2 relative flex justify-center z-10">
        
        {/* Background Pattern/Blob behind image */}
        <div className="absolute top-10 right-10 w-[90%] h-[90%] bg-brand-green rounded-[40px] rotate-3 -z-10 opacity-20"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-peach rounded-full blur-xl -z-10"></div>

        {/* Main Hero Image */}
        <img 
          src={assets.header_img || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
          alt="Happy Student" 
          className="w-full max-w-md object-cover rounded-[30px] shadow-2xl z-10 border-4 border-white" 
        />
        
        {/* Floating Card 1: Total Students */}
        <div className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 z-20 flex items-center gap-3 animate-bounce [animation-duration:3s]">
            <div className='bg-brand-green p-2.5 rounded-xl'>
                <img src={assets.course_1_thumbnail} className='w-6 h-6 rounded-full object-cover' alt=""/>
            </div>
            <div>
                <p className='font-bold text-sm text-brand-dark'>100k+ Students</p>
                <p className='text-xs text-gray-500'>Trust our platform</p>
            </div>
        </div>

        {/* Floating Card 2: Rating (Top Right) */}
        <div className="absolute top-8 -right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20 flex flex-col items-center gap-1 animate-pulse [animation-duration:4s]">
            <span className='text-2xl'>⭐</span>
            <p className='font-bold text-sm text-brand-dark'>4.9/5</p>
            <p className='text-[10px] text-gray-400 uppercase tracking-wide'>Rating</p>
        </div>

      </div>
    </div>
  );
};

export default Hero;