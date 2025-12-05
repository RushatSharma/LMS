import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const MyCourses = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)
  const [courses, setCourses] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
  const [courseToDelete, setCourseToDelete] = useState(null); // State to store id of course to be deleted
  const navigate = useNavigate();

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })
      data.success && setCourses(data.courses)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to open the delete modal
  const openDeleteModal = (id) => {
      setCourseToDelete(id);
      setShowDeleteModal(true);
  }

  // Function to close the delete modal
  const closeDeleteModal = () => {
      setShowDeleteModal(false);
      setCourseToDelete(null);
  }

  // Function to handle the actual deletion
  const confirmDelete = async () => {
    if(!courseToDelete) return;

    try {
        const token = await getToken();
        const { data } = await axios.delete(backendUrl + `/api/educator/delete-course/${courseToDelete}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if(data.success) {
            toast.success(data.message);
            fetchEducatorCourses(); // Refresh list
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    } finally {
        closeDeleteModal(); // Close modal after action
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 relative z-10">
      <div className='w-full'>
        <h2 className="pb-6 text-3xl font-bold text-brand-dark dark:text-white font-outfit">My Courses</h2>
        
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-3xl bg-white dark:bg-card border border-gray-200 dark:border-white/10 shadow-lg">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 dark:text-gray-200 border-b border-gray-200 dark:border-white/10 text-sm text-left bg-gray-50/50 dark:bg-white/5">
              <tr>
                <th className="px-6 py-5 font-bold font-outfit truncate">All Courses</th>
                <th className="px-6 py-5 font-bold font-outfit truncate">Earnings</th>
                <th className="px-6 py-5 font-bold font-outfit truncate">Students</th>
                <th className="px-6 py-5 font-bold font-outfit truncate">Published On</th>
                <th className="px-6 py-5 font-bold font-outfit truncate text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500 dark:text-gray-400">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-brand-cream/60 dark:hover:bg-white/5 transition-colors duration-200">
                  <td className="md:px-6 pl-2 md:pl-4 py-5 flex items-center space-x-4 truncate align-middle">
                    <div className="relative group">
                        <img src={course.courseThumbnail} alt="Course" className="w-24 h-14 object-cover rounded-xl border border-gray-200 dark:border-white/10 shadow-sm group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="truncate hidden md:block text-gray-800 dark:text-gray-200 font-bold text-base hover:text-brand-green transition-colors">{course.courseTitle}</span>
                  </td>
                  <td className="px-6 py-5 font-semibold text-gray-700 dark:text-gray-300 align-middle">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                  <td className="px-6 py-5 align-middle">{course.enrolledStudents.length}</td>
                  <td className="px-6 py-5 text-xs text-gray-400 align-middle">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  {/* Action Buttons - Centered correctly */}
                  <td className="px-6 py-5 text-center align-middle">
                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={() => navigate('/educator/add-course?id=' + course._id)}
                            className="px-3 py-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-bold"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => openDeleteModal(course._id)} // Open modal instead of confirm()
                            className="px-3 py-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-bold"
                        >
                            Delete
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm" onClick={closeDeleteModal}>
            <div className="relative w-full max-w-md p-4 h-auto" onClick={e => e.stopPropagation()}>
                <div className="relative bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-200 dark:border-white/10">
                    <div className="p-6 text-center">
                        <br></br>
                        <h3 className="mb-5 text-xl font-bold text-brand-dark dark:text-white font-outfit">
                            Are you sure you want to delete this course?
                        </h3>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                            This action cannot be undone. All data associated with this course will be permanently removed.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={closeDeleteModal}
                                type="button" 
                                className="px-5 py-2.5 text-sm font-bold text-gray-500 bg-white dark:bg-transparent rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                            >
                                No, cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                type="button" 
                                className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-xl focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 transition-colors"
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                    {/* Close button in corner */}
                    <button type="button" onClick={closeDeleteModal} className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white transition-colors">
                        <img src={assets.cross_icon} className='w-4 dark:invert opacity-60' alt="Close" />
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  ) : <Loading />
};

export default MyCourses;