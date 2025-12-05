import React from 'react';
import { assets } from '../../assets/assets';

const MentorsSection = () => {
  const mentors = [
    { name: "Samuel Bishop", role: "Associate professor", img: assets.profile_img_1, bg: "bg-blue-100" },
    { name: "Joan Wallace", role: "Assistant professor", img: assets.profile_img_2, bg: "bg-amber-100" },
    { name: "Billy Vasquez", role: "Instructor", img: assets.profile_img_3, bg: "bg-pink-100" },
    { name: "Jacqueline Miller", role: "Lecturer", img: assets.profile_img_1, bg: "bg-teal-100" },
    { name: "Louis Crawford", role: "Academic professional", img: assets.profile_img_2, bg: "bg-orange-100" },
  ];

  return (
    <div className="py-16 px-8 md:px-36 bg-brand-cream dark:bg-background transition-colors duration-300 relative">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white font-outfit leading-tight">
          Our experience & <br /> professional mentors
        </h2>
        
        {/* FIXED: Added dark:text-gray-900 so text is black on the white button in dark mode */}
        <button className="bg-brand-dark text-white dark:text-gray-900 px-8 py-3 rounded-full text-base hover:bg-opacity-90 transition-all mt-6 md:mt-0 shadow-lg">
          View all instructors
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mentors.map((mentor, index) => (
          <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
            <div className={`w-full aspect-square ${mentor.bg} rounded-2xl mb-4 overflow-hidden relative shadow-sm hover:shadow-md transition-all duration-300`}>
                <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover object-top mix-blend-multiply filter grayscale group-hover:grayscale-0 transition-all duration-500"/>
            </div>
            <h3 className="font-bold text-lg text-brand-dark dark:text-white mb-1">{mentor.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.role}</p>
          </div>
        ))}
      </div>
      
      <div className="absolute left-10 -bottom-10 hidden lg:flex items-center justify-center w-24 h-24 bg-brand-green rounded-full border-4 border-brand-cream dark:border-background z-10 animate-spin-slow">
         <div className='text-center text-white'>
            <p className='text-[10px] font-medium uppercase tracking-wide'>Years of</p>
            <p className='text-xl font-bold'>15+</p>
            <p className='text-[10px] font-medium uppercase tracking-wide'>Teaching</p>
         </div>
      </div>
    </div>
  );
};

export default MentorsSection;