import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Fixed Crimson Red background for both light and dark modes
    <footer className="bg-[#000000] text-white/90 w-full mt-auto">
      
      {/* --- Top Section: Newsletter & Brand --- */}
      <div className="container mx-auto px-8 md:px-36 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/20 pb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
               {/* Using brightness-0 invert to ensure logo is white on red bg */}
               <img src={assets.logo} alt="Edulink Logo" className="w-28 brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed text-white/80 max-w-sm">
              Empowering learners worldwide with accessible, high-quality education. Join our community and start your journey today.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#ca0b32] transition-all duration-300 group">
                    <img src={assets.facebook_icon} className='w-4 h-4 brightness-0 invert group-hover:filter-none group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-[320deg] group-hover:saturate-[500%]' alt="Facebook"/>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#ca0b32] transition-all duration-300 group">
                    <img src={assets.twitter_icon} className='w-4 h-4 brightness-0 invert group-hover:filter-none group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-[320deg] group-hover:saturate-[500%]' alt="Twitter"/>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#ca0b32] transition-all duration-300 group">
                    <img src={assets.instagram_icon} className='w-4 h-4 brightness-0 invert group-hover:filter-none group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-[320deg] group-hover:saturate-[500%]' alt="Instagram"/>
                </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white/100 hover:underline transition-all">Home</Link></li>
              <li><Link to="/about" className="hover:text-white/100 hover:underline transition-all">About us</Link></li>
              <li><Link to="/contact" className="hover:text-white/100 hover:underline transition-all">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-white/100 hover:underline transition-all">Careers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-white mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/course-list" className="hover:text-white/100 hover:underline transition-all">All Courses</Link></li>
              <li><Link to="/blog" className="hover:text-white/100 hover:underline transition-all">Blog</Link></li>
              <li><Link to="/help" className="hover:text-white/100 hover:underline transition-all">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-white/100 hover:underline transition-all">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-white mb-6">Stay Updated</h3>
            <p className="text-xs text-white/80 mb-4">
              Get the latest course updates and career tips directly in your inbox.
            </p>
            <div className="flex flex-col gap-3">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:bg-white/20 placeholder:text-white/50 transition-colors w-full"
                />
                {/* Button changed to White for contrast on Red background */}
                <button className="bg-white text-[#] hover:bg-gray-100 font-bold text-sm px-4 py-3 rounded-lg transition-all duration-300 shadow-md">
                    Subscribe
                </button>
            </div>
          </div>

        </div>
      </div>

      {/* --- Bottom Copyright Section (Darker Red) --- */}
      <div className="border-t border-white/20 bg-[#000000]">
        <div className="container mx-auto px-8 md:px-36 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">
            <p>Copyright 2025 © Edulink. All Right Reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;