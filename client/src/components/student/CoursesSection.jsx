import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext)

  return (
    <div className="py-8 md:px-36 px-8 bg-brand-cream dark:bg-background transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-brand-peach/30 rounded-full blur-[100px] pointer-events-none'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none'></div>

      <div className='relative z-10 text-center'>
        <span className='inline-block px-4 py-1.5 rounded-full border border-brand-dark/10 bg-white dark:bg-white/10 dark:text-white text-xs font-bold tracking-widest text-brand-dark uppercase mb-2 shadow-sm'>
            Top Class Courses
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-3 font-outfit">Browse our popular courses</h2>
        
        <p className="md:text-base text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Discover our top-rated courses across various categories. From coding and design to business and wellness.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 text-left">
          {allCourses.slice(0, 4).map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>

        <Link 
          to={'/course-list'} 
          onClick={() => scrollTo(0, 0)} 
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-3 rounded-full hover:bg-brand-green hover:text-white transition-all duration-300 font-bold shadow-lg hover:shadow-brand-green/30 group text-sm dark:bg-primary dark:text-white dark:hover:bg-[#FFFBF5] dark:hover:text-gray-900"
        >
          Show all courses
          <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;