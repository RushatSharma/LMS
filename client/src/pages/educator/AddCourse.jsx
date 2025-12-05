import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Quill from 'quill';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useSearchParams } from 'react-router-dom'; // Import this

const AddCourse = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, getToken } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id'); // Get ID from URL

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  // Load Course Data if in Edit Mode
  useEffect(() => {
    if (courseId) {
        const fetchCourseData = async () => {
            try {
                // Fetch public course data to pre-fill
                const { data } = await axios.get(backendUrl + '/api/course/' + courseId);
                if (data.success) {
                    const course = data.courseData;
                    setCourseTitle(course.courseTitle);
                    setCoursePrice(course.coursePrice);
                    setDiscount(course.discount);
                    setChapters(course.courseContent);
                    
                    // Pre-fill Quill Editor
                    if (quillRef.current) {
                        quillRef.current.root.innerHTML = course.courseDescription;
                    }

                    // Note: We can't pre-set the 'image' file object because of browser security.
                    // But we can assume if they don't upload a new one, the old one stays (backend logic).
                }
            } catch (error) {
                toast.error("Failed to load course data");
            }
        };
        fetchCourseData();
    }
  }, [courseId, backendUrl]);

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: crypto.randomUUID(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: crypto.randomUUID()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      // In Edit Mode, Image is optional (we keep the old one). In Add Mode, it's required.
      if (!image && !courseId) {
        toast.error('Thumbnail Not Selected');
        return;
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      }

      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      if (image) {
          formData.append('image', image)
      }

      const token = await getToken()
      
      let response;
      if (courseId) {
          // UPDATE MODE
          formData.append('courseId', courseId);
          response = await axios.post(backendUrl + '/api/educator/update-course', formData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
      } else {
          // ADD MODE
          response = await axios.post(backendUrl + '/api/educator/add-course', formData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
      }

      if (response.data.success) {
        toast.success(response.data.message)
        // Only clear if adding new. If editing, maybe stay on page or navigate back? 
        // For now, we clear to keep it simple.
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ""
        // Optional: Redirect back to my courses after update
        // navigate('/educator/my-courses'); 
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 z-10 relative'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 max-w-3xl w-full text-gray-500 dark:text-gray-400 pb-20'>
        
        {/* Dynamic Title */}
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-brand-dark dark:text-white font-outfit">
                {courseId ? 'Edit Course' : 'Add New Course'}
            </h1>
        </div>

        <div className='flex flex-col gap-1'>
          <p className="font-bold text-lg text-brand-dark dark:text-white font-outfit">Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder='e.g. Advanced Web Development' 
            className='outline-none md:py-3 py-2 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card text-brand-dark dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p className="font-bold text-lg text-brand-dark dark:text-white font-outfit">Course Description</p>
          <div className="bg-white dark:bg-card rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
             <div ref={editorRef} className="dark:text-white/90 min-h-[150px]"></div>
          </div>
        </div>

        <div className='flex items-center justify-between flex-wrap gap-6'>
          <div className='flex flex-col gap-1'>
            <p className="font-bold text-lg text-brand-dark dark:text-white font-outfit">Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' 
                className='outline-none md:py-3 py-2 w-32 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card text-brand-dark dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm' required />
          </div>

          <div className='flex flex-col gap-1'>
            <p className="font-bold text-lg text-brand-dark dark:text-white font-outfit">Discount %</p>
            <input onChange={e => setDiscount(e.target.value)} value={discount} type="number" placeholder='0' min={0} max={100} 
                className='outline-none md:py-3 py-2 w-32 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card text-brand-dark dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm' required />
          </div>

          <div className='flex flex-col gap-1 flex-1'>
            <p className="font-bold text-lg text-brand-dark dark:text-white font-outfit">Thumbnail</p>
            <label htmlFor='thumbnailImage' className='flex items-center gap-3 cursor-pointer bg-white dark:bg-card border border-gray-200 dark:border-white/10 p-2.5 rounded-xl hover:border-primary transition-all shadow-sm'>
              <img src={assets.file_upload_icon} alt="" className='w-8 p-1.5 bg-brand-cream dark:bg-white/10 rounded-lg text-primary' />
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept="image/*" hidden />
              <span className='text-sm text-gray-500 dark:text-gray-400 font-medium'>{image ? image.name : 'Click to browse'}</span>
              {image && <img className='h-8 w-12 object-cover ml-auto rounded' src={URL.createObjectURL(image)} alt="" />}
            </label>
          </div>
        </div>

        {/* Chapters Section - same as before */}
        <div className='space-y-4'>
          <p className="font-bold text-xl text-brand-dark dark:text-white font-outfit">Course Content</p>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-white/10 transition-colors" onClick={() => handleChapter('toggle', chapter.chapterId)}>
                <div className="flex items-center gap-3">
                  <img className={`w-3 transition-transform duration-300 ${chapter.collapsed ? "-rotate-90" : "rotate-0"} dark:invert opacity-70`} src={assets.dropdown_icon} alt="" />
                  <span className="font-bold text-brand-dark dark:text-white font-outfit text-lg">Chapter {chapterIndex + 1}: {chapter.chapterTitle}</span>
                </div>
                <div className='flex items-center gap-4'>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{chapter.chapterContent.length} Lectures</span>
                    <button type="button" onClick={(e) => {e.stopPropagation(); handleChapter('remove', chapter.chapterId)}} className='p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors group'>
                        <img src={assets.cross_icon} alt="" className='w-3 opacity-50 group-hover:opacity-100 dark:invert' />
                    </button>
                </div>
              </div>
              {!chapter.collapsed && (
                <div className="p-4 space-y-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex justify-between items-center bg-brand-cream/30 dark:bg-background/30 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                      <div className='flex flex-col'>
                          <span className='font-semibold text-brand-dark dark:text-white text-sm'>{lectureIndex + 1}. {lecture.lectureTitle}</span>
                          <span className='text-xs text-gray-500 mt-0.5'>{lecture.lectureDuration} mins • <span className={`font-medium ${lecture.isPreviewFree ? 'text-green-500' : 'text-blue-500'}`}>{lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span></span>
                      </div>
                      <button type="button" onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} className='p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-60 hover:opacity-100'>
                        <img src={assets.cross_icon} alt="" className='w-3 dark:invert' />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="flex items-center gap-2 bg-brand-dark/5 dark:bg-white/5 text-brand-dark dark:text-white text-sm font-medium px-4 py-2 rounded-lg mt-2 hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-colors" onClick={() => handleLecture('add', chapter.chapterId)}>
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="button" className="w-full flex justify-center items-center bg-white dark:bg-card border-2 border-dashed border-gray-300 dark:border-gray-700 py-4 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-gray-500 hover:text-primary font-bold" onClick={() => handleChapter('add')}>
            + Add New Chapter
          </button>

          {/* Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
              <div className="bg-white dark:bg-card p-8 rounded-3xl w-full max-w-md border border-gray-200 dark:border-white/10 shadow-2xl relative">
                <h2 className="text-2xl font-bold text-brand-dark dark:text-white font-outfit mb-6">Add Lecture</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Lecture Title</p>
                    <input type="text" className="w-full border border-gray-300 dark:border-white/20 rounded-xl py-2.5 px-4 text-sm bg-transparent dark:text-white focus:border-primary outline-none transition-colors"
                      value={lectureDetails.lectureTitle} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Duration (minutes)</p>
                    <input type="number" className="w-full border border-gray-300 dark:border-white/20 rounded-xl py-2.5 px-4 text-sm bg-transparent dark:text-white focus:border-primary outline-none transition-colors"
                      value={lectureDetails.lectureDuration} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Lecture URL</p>
                    <input type="text" className="w-full border border-gray-300 dark:border-white/20 rounded-xl py-2.5 px-4 text-sm bg-transparent dark:text-white focus:border-primary outline-none transition-colors"
                      value={lectureDetails.lectureUrl} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="free-preview" className='accent-primary w-5 h-5 rounded cursor-pointer' checked={lectureDetails.isPreviewFree} onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
                    <label htmlFor="free-preview" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">Make this lecture free for preview</label>
                  </div>
                </div>
                <button type='button' className="w-full bg-brand-dark dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl mt-8 hover:opacity-90 transition-opacity" onClick={addLecture}>Add Lecture</button>
                <button type='button' onClick={() => setShowPopup(false)} className='absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors'>
                    <img src={assets.cross_icon} className='w-4 dark:invert' alt="Close" />
                </button>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className='bg-brand-dark dark:bg-primary text-white font-bold text-lg w-max py-3 px-12 rounded-full hover:scale-105 transition-transform shadow-xl mb-10'>
          {courseId ? 'UPDATE COURSE' : 'PUBLISH COURSE'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;