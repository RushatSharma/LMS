import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

// Accept 'index' prop to determine specific color
const CourseCard = ({ course, index }) => {

    const { currency, calculateRating } = useContext(AppContext)

    if (!course) return null;

    // Defined a palette of vibrant border colors to cycle through
    const borderColors = [
        'border-[#FF6636]', // Orange
        'border-[#8844FF]', // Purple
        'border-[#FF4081]', // Pink
        'border-[#00C853]'  // Emerald
    ];
    
    // Select color based on index (0, 1, 2, 3...)
    const borderColor = borderColors[index % borderColors.length];

    // UPDATED: "Light Darker" Backgrounds (More saturated than previous pastels)
    const bgColors = [
         // Warm Apricot
        'bg-[#A5D6A7]', // Fresh Mint
        'bg-[#90CAF9]', // Soft Sky Blue
        'bg-[#CE93D8]', // Muted Lavender
        'bg-[#F48FB1]'  // Blossom Pink
    ];
    const randomBg = bgColors[(index) % bgColors.length];

    return (
        <Link 
            onClick={() => scrollTo(0, 0)} 
            to={'/course/' + course._id} 
            // Applied border-2 and the dynamic borderColor class here
            className={`group block bg-white dark:bg-card dark:border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${borderColor}`}
        >
            <div className={`h-52 ${randomBg} relative flex items-center justify-center p-6 overflow-hidden`}>
                <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-10'>
                    <p className='text-[10px] font-bold text-gray-900 flex items-center gap-1'>
                        <span className='w-1.5 h-1.5 rounded-full bg-brand-green inline-block'></span>
                        {course.courseContent?.length || 0} Lessons
                    </p>
                </div>
                <img 
                    className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" 
                    src={course.courseThumbnail} 
                    alt={course.courseTitle} 
                />
            </div>

            <div className="p-5 relative">
                <div className='flex items-center justify-between mb-3'>
                    <span className='px-2.5 py-0.5 bg-brand-cream border border-brand-peach text-[10px] font-bold text-gray-900 uppercase tracking-wider rounded-md'>
                        Design
                    </span>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-100">
                        <img src={assets.star} className='w-3' alt="Star" />
                        <p className='text-xs font-bold text-yellow-600'>{calculateRating(course)}</p>
                    </div>
                </div>
                
                <h3 className="text-lg font-bold text-brand-dark line-clamp-2 mb-3 leading-tight group-hover:text-brand-green transition-colors">
                    {course.courseTitle}
                </h3>
                
                <div className='h-px w-full bg-gray-100 dark:bg-white/10 mb-3'></div>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-full bg-gray-100 p-0.5 border border-gray-200 overflow-hidden'>
                             <img 
                                src={course.educator?.imageUrl || assets.profile_img} 
                                alt="" 
                                className='w-full h-full object-cover'
                             />
                        </div>
                        <div className='flex flex-col'>
                            <p className="text-[10px] text-gray-400 font-medium">Instructor</p>
                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate max-w-[90px]">
                                {course.educator?.name || 'Instructor'}
                            </p>
                        </div>
                    </div>
                    
                    <div className='flex flex-col items-end'>
                        { (course.discount > 0) && 
                            <p className='text-[10px] text-gray-400 line-through'>
                                {currency}{course.coursePrice}
                            </p>
                        }
                        <p className="text-lg font-bold text-brand-green leading-none">
                            {currency}{((course.coursePrice || 0) - (course.discount || 0) * (course.coursePrice || 0) / 100).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard