import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-card py-4 transition-colors duration-300">
      <div className='flex items-center gap-4'>
        <img className='hidden md:block w-20 dark:invert' src={assets.logo} alt="logo" />
        <div className='hidden md:block h-7 w-px bg-gray-500/60 dark:bg-white/20'></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Copyright 2025 © GreatStack. All Right Reserved.
        </p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
          <img src={assets.facebook_icon} alt="facebook_icon" className="dark:invert" />
        </a>
        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
          <img src={assets.twitter_icon} alt="twitter_icon" className="dark:invert" />
        </a>
        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
          <img src={assets.instagram_icon} alt="instagram_icon" className="dark:invert" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;