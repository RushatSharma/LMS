import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <div className="py-16 px-8 md:px-36 bg-brand-cream dark:bg-background transition-colors duration-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-2">Why choose Edulink</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          We offer a comprehensive learning experience with tailored courses, expert guidance, and a supportive community to help you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Card 1 - Courses (Fresh Sky Blue) */}
        <div className="md:col-span-7 bg-[#D4EBF8] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[260px] 
            hover:-translate-y-1 transition-transform duration-300 shadow-sm
            dark:bg-gradient-to-br dark:from-[#ca0b32] dark:to-[#8a051f] dark:border-none">
          <div className="z-10 flex flex-col items-center w-full max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Over 100+ courses <br/> tailored for your success.
            </h3>
            <p className="text-gray-700 dark:text-white/90 text-xs md:text-sm mb-6 leading-relaxed font-medium">
              Dive into a vast library designed to take you from beginner to pro.
            </p>
            <Link to="/course-list" className="bg-white/60 dark:bg-white/20 dark:backdrop-blur-sm text-gray-900 dark:text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-white dark:hover:bg-white/30 transition-colors shadow-sm">
              View all courses
            </Link>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-24 bg-white/40 dark:bg-white/10 rounded-lg shadow-sm flex items-center justify-center transform rotate-6 backdrop-blur-sm">
            <div className="w-9 h-9 bg-yellow-100 dark:bg-white/20 rounded-full flex items-center justify-center shadow-inner">
              <span className="text-lg">💎</span>
            </div>
          </div>
        </div>

        {/* Card 2 - Instructors (Soft Lavender) */}
        <div className="md:col-span-5 bg-[#E9D5FF] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[260px]
            hover:-translate-y-1 transition-transform duration-300 shadow-sm
            dark:bg-gradient-to-br dark:from-[#1e3a8a] dark:to-[#1e1b4b] dark:border-none">
           <div className="z-10 flex flex-col items-center w-full max-w-xs">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Meet our expert team</h3>
            <p className="text-gray-700 dark:text-white/90 text-xs md:text-sm mb-6 leading-relaxed font-medium">
              Get mentored by the best. Our instructors are industry veterans.
            </p>
            <button className="bg-brand-dark text-white dark:bg-white/20 dark:backdrop-blur-sm text-sm px-6 py-2 rounded-full hover:bg-opacity-90 dark:hover:bg-white/30 transition-colors shadow-sm">
              Meet the team
            </button>
           </div>
           <div className="flex -space-x-3 absolute bottom-5 right-5">
              <img className="w-9 h-9 rounded-full border-2 border-white dark:border-blue-900/50 object-cover shadow-sm" src={assets.profile_img_1} alt=""/>
              <img className="w-9 h-9 rounded-full border-2 border-white dark:border-blue-900/50 object-cover shadow-sm" src={assets.profile_img_2} alt=""/>
              <img className="w-9 h-9 rounded-full border-2 border-white dark:border-blue-900/50 object-cover shadow-sm" src={assets.profile_img_3} alt=""/>
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-blue-900/50 bg-white dark:bg-blue-800 flex items-center justify-center text-[10px] font-bold text-brand-dark dark:text-white shadow-sm">+20</div>
           </div>
        </div>

        {/* Card 3 - Community (Warm Champagne/Yellow) */}
        <div className="md:col-span-5 bg-[#FFDEDE] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[260px]
            hover:-translate-y-1 transition-transform duration-300 shadow-sm
            dark:bg-gradient-to-br dark:from-[#064e3b] dark:to-[#022c22] dark:border-none">
           <div className="z-10 flex flex-col items-center w-full max-w-xs">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Online Meet and get pals!</h3>
            <p className="text-gray-800 dark:text-white/90 text-xs md:text-sm mb-6 leading-relaxed font-medium">
              Join a vibrant community of learners to collaborate on projects.
            </p>
            <button className="bg-brand-dark text-white dark:bg-white/20 dark:backdrop-blur-sm text-sm px-6 py-2 rounded-full hover:bg-opacity-90 dark:hover:bg-white/30 transition-colors shadow-sm">
              Join community
            </button>
           </div>
           <div className="absolute -bottom-4 -right-4 opacity-40 pointer-events-none dark:opacity-30">
             <img src={assets.sketch} className="w-20 h-20 mix-blend-multiply dark:invert dark:mix-blend-normal" alt="" />
           </div>
        </div>

        {/* Card 4 - Categories (Deep Indigo for strong contrast) */}
        <div className="md:col-span-7 bg-[#312E81] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[260px]
            hover:-translate-y-1 transition-transform duration-300 shadow-lg
            dark:bg-[#121212] dark:border dark:border-white/10">
           <div className="z-10 flex flex-col items-center w-full max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">More than 10 categories</h3>
            <p className="text-indigo-100 dark:text-gray-400 text-xs md:text-sm mb-6 leading-relaxed">
              Explore diverse categories to find your true passion.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
                {['UI/UX Design', 'Development', 'Marketing', 'Data Science'].map((tag, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium 
                      bg-white/10 text-white backdrop-blur-sm border border-white/10
                      hover:bg-white/20 transition-all cursor-default shadow-sm`}>
                      {tag}
                    </span>
                ))}
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#312E81] shadow-sm">
                  +4 more
                </span>
            </div>
           </div>
           {/* Decorative circle */}
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;