import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const StudentsEnrolled = () => {

  const { backendUrl, getToken, isEducator } = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse())
      } else {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents()
    }
  }, [isEducator])

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 relative z-10">
      <div className='w-full'>
        <h2 className="pb-6 text-3xl font-bold text-brand-dark dark:text-white font-outfit">Students Enrolled</h2>
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-3xl bg-white dark:bg-card border border-gray-200 dark:border-white/10 shadow-lg">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead className="text-gray-900 dark:text-gray-200 border-b border-gray-200 dark:border-white/10 text-sm text-left bg-gray-50/50 dark:bg-white/5">
                <tr>
                <th className="px-6 py-5 font-bold font-outfit text-center hidden sm:table-cell">#</th>
                <th className="px-6 py-5 font-bold font-outfit">Student Name</th>
                <th className="px-6 py-5 font-bold font-outfit">Course Title</th>
                <th className="px-6 py-5 font-bold font-outfit hidden sm:table-cell">Date</th>
                </tr>
            </thead>
            <tbody className="text-sm text-gray-500 dark:text-gray-400">
                {enrolledStudents.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-white/5 hover:bg-brand-cream/60 dark:hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-5 text-center hidden sm:table-cell font-medium">{index + 1}</td>
                    <td className="md:px-6 px-4 py-5 flex items-center space-x-4">
                    <img
                        src={item.student.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                    />
                    <span className="truncate text-brand-dark dark:text-white font-semibold">{item.student.name}</span>
                    </td>
                    <td className="px-6 py-5 truncate">{item.courseTitle}</td>
                    <td className="px-6 py-5 hidden sm:table-cell text-xs">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  ) : <Loading />
};

export default StudentsEnrolled;