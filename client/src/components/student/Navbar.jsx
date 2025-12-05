import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const location = useLocation();
  const isCoursesListPage = location.pathname.includes('/course-list');
  
  // Destructure theme and toggleTheme
  const { backendUrl, isEducator, setIsEducator, navigate, getToken, theme, toggleTheme } = useContext(AppContext);
  
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator');
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        toast.success(data.message);
        setIsEducator(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 bg-background border-b border-border transition-colors duration-300`}> 
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="w-32 lg:w-36 cursor-pointer dark:invert" />
      
      {/* Desktop Menu */}
      <div className="md:flex hidden items-center gap-10 text-foreground text-lg font-medium">
        <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
        <Link to='/course-list' className='hover:text-primary transition-colors'>Courses</Link>
        <Link to='/about' className='hover:text-primary transition-colors'>About Us</Link>
        
        <div className="flex items-center gap-6">
          {user && (
            <>
              <button onClick={becomeEducator} className="text-base hover:text-primary transition-colors">
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <Link to='/my-enrollments' className="text-base hover:text-primary transition-colors">My Enrollments</Link>
            </>
          )}
        </div>
        
        {/* Theme Toggle Button */}
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground focus:outline-none"
            title="Toggle Theme"
        >
            {theme === 'dark' ? (
                // Sun Icon (for Dark Mode)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ) : (
                // Moon Icon (for Light Mode)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            )}
        </button>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="bg-primary text-primary-foreground px-9 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 text-base shadow-lg">
            Sign Up
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className='md:hidden flex items-center gap-4 text-foreground'>
        {/* Mobile Theme Toggle */}
        <button onClick={toggleTheme} className="focus:outline-none">
            {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            )}
        </button>

        {user ? <UserButton /> : <button onClick={() => openSignIn()}><img src={assets.user_icon} alt="" className="dark:invert" /></button>}
      </div>
    </div>
  );
};

export default Navbar;