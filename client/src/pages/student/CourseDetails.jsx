import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import { useUser } from '@clerk/clerk-react';
import humanizeDuration from 'humanize-duration';
import axios from 'axios'; // Imported Axios
import { toast } from 'react-toastify'; // Imported Toast

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerUrl, setPlayerUrl] = useState('');

  // Added backendUrl to destructuring
  const { calculateRating, currency, addToCart, enrolledCourses, backendUrl } = useContext(AppContext);
  const { user } = useUser();

  const fetchCourseData = async () => {
    try {
      // OPTIMAL FIX: Fetching detailed data from the specific API endpoint
      const { data } = await axios.get(backendUrl + '/api/course/' + id);
      
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]); // Dependency updated to just 'id'

  useEffect(() => {
    if (user && courseData && enrolledCourses?.length > 0) {
      setIsAlreadyEnrolled(enrolledCourses.some((course) => course.courseId === courseData._id));
    }
  }, [enrolledCourses, courseData, user]);

  const getRating = (course) => {
    if (!course?.courseRatings || course.courseRatings.length === 0) return 0;
    return calculateRating(course);
  };

  const calculateChapterTime = (chapter) => {
    if (!chapter || !chapter.chapterContent) return '0m';
    const totalMinutes = chapter.chapterContent.reduce((acc, lecture) => acc + (lecture.lectureDuration || 0), 0);
    return humanizeDuration(totalMinutes * 60 * 1000, { units: ["h", "m"] });
  };

  // Loading State
  if (!courseData) {
    return <Loading />;
  }

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left bg-brand-cream dark:bg-background text-brand-dark dark:text-white transition-colors duration-300 font-jakarta min-h-screen">
      
      {/* Background Blobs */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-brand-peach/30 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20'></div>

      <div className="max-w-[700px] z-10 text-gray-900 dark:text-gray-300">
        
        {/* Title */}
        <h1 className="md:text-4xl text-2xl font-bold text-brand-dark dark:text-white font-outfit leading-tight">
          {courseData.courseTitle}
        </h1>
        
        {/* Description Snippet */}
        <div 
          className="pt-4 md:text-lg text-base font-medium leading-relaxed text-gray-600 dark:text-gray-300" 
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
        ></div>

        {/* Ratings Bar */}
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
           <p className='font-bold text-amber-500 text-lg'>{getRating(courseData).toFixed(1)}</p>
           <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(getRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-4 h-4' />
              ))}
           </div>
           <span className='text-gray-500 dark:text-gray-400'>({courseData.courseRatings.length} ratings)</span>
           <span className='hidden md:block text-gray-500 dark:text-gray-400'>|</span>
           <span className='hidden md:block text-gray-500 dark:text-gray-400'>{courseData.enrolledStudents.length} students enrolled</span>
        </div>

        <p className='text-base text-gray-600 dark:text-gray-400 mb-8 mt-2'>Created by <span className='text-brand-dark dark:text-white font-bold underline'>GreatStack</span></p>

        {/* --- Course Structure (Native Details/Summary) --- */}
        <div className="pt-4 border-t border-gray-200 dark:border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white font-outfit mb-6 mt-6">Course Content</h2>
          
          <div className="space-y-4">
            {courseData.courseContent.map((chapter, index) => (
              <details key={index} className="group border border-gray-300 dark:border-white/10 bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 open:pb-2">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <img className="w-3 transform transition-transform group-open:rotate-180 dark:invert opacity-70" src={assets.down_arrow_icon} alt="" />
                    <p className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
                        {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                  </p>
                </summary>

                <ul className="px-4 py-2 space-y-2 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-transparent animate-in fade-in slide-in-from-top-2 duration-300">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li key={i} className="flex items-start gap-3 py-2 text-sm text-gray-800 dark:text-gray-300">
                      <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1 opacity-80 dark:invert" />
                      <div className="flex items-center justify-between w-full">
                        <p className='font-medium'>{lecture.lectureTitle}</p>
                        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400 items-center">
                          {lecture.isPreviewFree && (
                            <span 
                                className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline" 
                                onClick={() => setPlayerUrl(lecture.lectureUrl)}
                            >
                                Preview
                            </span>
                          )}
                          <span>{humanizeDuration((lecture.lectureDuration || 0) * 60 * 1000, { units: ["h", "m"] })}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
        
        {/* --- Description --- */}
        <div className="py-10">
          <h3 className="text-2xl font-bold text-brand-dark dark:text-white font-outfit mb-3">Description</h3>
          <div 
             className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-300 text-base md:text-lg leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
          ></div>
        </div>
      </div>
      
      {/* --- Right Column: Sticky Player/Card --- */}
       <div className="max-w-[400px] z-10 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-card border border-gray-200 dark:border-white/10 min-w-[300px] sm:min-w-[380px] md:sticky md:top-24">
         
         {playerUrl ? (
            <div className='aspect-video bg-black'>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={playerUrl.includes('youtube') ? `https://www.youtube.com/embed/${playerUrl.split('/').pop()}` : playerUrl}
                  title="Course Preview" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
            </div>
         ) : (
            <div className='relative'>
              <img src={courseData.courseThumbnail} alt="" className="w-full object-cover" />
              <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                <img onClick={() => setPlayerUrl(courseData.courseContent[0]?.chapterContent[0]?.lectureUrl)} src={assets.play_icon} alt="" className="w-16 h-16 bg-white rounded-full p-5 cursor-pointer hover:scale-110 transition-transform shadow-lg" />
              </div>
            </div>
         )}

         <div className="p-6">
           <div className="flex items-center gap-3 mb-4">
              <p className="text-4xl font-bold text-brand-dark dark:text-white font-outfit">
                 {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)}
              </p>
              <p className="text-xl text-gray-500 line-through">
                 {currency}{courseData.coursePrice}
              </p>
              <span className="text-sm font-bold text-red-600 bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-full">
                 {courseData.discount}% off
              </span>
           </div>

           <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 mb-8 font-medium">
             <div className="flex items-center gap-3">
                <img src={assets.star} alt="" className="w-5 dark:invert opacity-80" />
                <p>Lifetime access with updates</p>
             </div>
             <div className="flex items-center gap-3">
                <img src={assets.time_clock_icon} alt="" className="w-5 dark:invert opacity-80" />
                <p>{calculateChapterTime({chapterContent: courseData.courseContent.flatMap(c => c.chapterContent)})} total content</p>
             </div>
             <div className="flex items-center gap-3">
                <img src={assets.lesson_icon} alt="" className="w-5 dark:invert opacity-80" />
                <p>{courseData.courseContent.length} chapters</p>
             </div>
           </div>

           <button 
             onClick={() => isAlreadyEnrolled ? null : addToCart(courseData)} 
             className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all hover:shadow-xl hover:scale-[1.02] ${isAlreadyEnrolled ? 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 cursor-default' : 'bg-brand-dark dark:bg-white text-white dark:text-black'}`}
           >
             {isAlreadyEnrolled ? 'Already Enrolled' : 'Add to Cart'}
           </button>
           
           {!isAlreadyEnrolled && (
             <p className="text-xs text-center text-gray-500 mt-4 font-medium">30-Day Money-Back Guarantee</p>
           )}
         </div>
       </div>

    </div>
  );
};

export default CourseDetails;