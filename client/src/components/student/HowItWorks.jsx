import React from 'react';
import { assets } from '../../assets/assets';

const HowItWorks = () => {
  return (
    <div className="py-16 px-8 md:px-36 bg-background relative overflow-hidden transition-colors duration-300">
      
      {/* Background Blobs */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-brand-peach/30 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20'></div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white font-outfit mb-4">
          How it works in 4 simple steps
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We have streamlined the learning process to ensure you can focus on what matters most gaining new skills. 
          From selecting your perfect course to earning a recognized certification, our platform guides you through a 
          seamless, engaging, and rewarding educational journey designed for modern learners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 max-w-7xl mx-auto">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-20 h-20 rounded-full bg-[#C9E2D3] flex items-center justify-center text-2xl font-bold text-gray-900 mb-6 border-[6px] border-white dark:border-gray-800 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            01
          </div>
          <h3 className="font-bold text-xl text-brand-dark dark:text-white mb-3">Browse our courses</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
            Explore our extensive library of professionally curated courses. Filter by category, difficulty level, or instructor to find the perfect match for your career goals.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center md:mt-16 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-20 h-20 rounded-full bg-[#FFF4C3] flex items-center justify-center text-2xl font-bold text-gray-900 mb-6 border-[6px] border-white dark:border-gray-800 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            02
          </div>
          <h3 className="font-bold text-xl text-brand-dark dark:text-white mb-3">Purchase securely</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
            Enjoy a hassle free checkout experience. Our secure payment gateway ensures your data is safe, granting you instant lifetime access to your learning materials.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-20 h-20 rounded-full bg-[#E3E3F5] flex items-center justify-center text-2xl font-bold text-gray-900 mb-6 border-[6px] border-white dark:border-gray-800 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            03
          </div>
          <h3 className="font-bold text-xl text-brand-dark dark:text-white mb-3">Learn & Assess</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
            Engage with high definition video lectures, interactive quizzes, and hands-on projects. Track your progress in real-time as you master new concepts.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center md:mt-16 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-20 h-20 rounded-full bg-[#FFE3E3] flex items-center justify-center text-2xl font-bold text-gray-900 mb-6 border-[6px] border-white dark:border-gray-800 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            04
          </div>
          <h3 className="font-bold text-xl text-brand-dark dark:text-white mb-3">Get Certified</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
            Upon completion, receive a verifiable industry recognized certificate. Share your achievement on LinkedIn and boost your professional portfolio.
          </p>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute top-[40%] left-0 w-full -z-0 pointer-events-none hidden md:block">
         <svg width="100%" height="150" viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 75 C 200 75, 300 140, 500 75 S 800 10, 1100 75 S 1500 75, 1600 75" className="stroke-primary opacity-40 dark:opacity-60" strokeWidth="2" strokeDasharray="12 12"/>
         </svg>
      </div>

      {/* CTA Box */}
      <div className="mt-24 flex justify-center relative z-10">
        <div className="bg-white dark:bg-[#FFFBF5] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl w-full border border-gray-100/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-gray-900 mb-2">Ready to start your journey?</h2>
              <p className="text-gray-500 dark:text-gray-700">Join over 1,000 satisfied learners today and boost your skills.</p>
            </div>
            {/* FIXED: Explicitly set bg-gray-900 (Black) so it contrasts against the Cream card in dark mode */}
            <button className="bg-gray-900 text-white text-base px-10 py-4 rounded-full hover:bg-black hover:shadow-xl transition-all duration-300 font-bold shadow-lg transform hover:-translate-y-1">
                Signup Today
            </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;