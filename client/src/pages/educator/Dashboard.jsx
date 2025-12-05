import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const Dashboard = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0 relative z-10'>
      <div className='space-y-5 w-full'>
        
        {/* Title & Welcome */}
        <div className="flex flex-wrap gap-5 items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-brand-dark dark:text-white font-outfit">Overview</h1>
                <p className="text-gray-500 dark:text-gray-400">Track your courses, students, and earnings.</p>
            </div>
        </div>

        {/* Stats Cards - Gradient Style */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          
          {/* Card 1: Enrolments (Blue Gradient) */}
          <div className='flex items-center gap-4 rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border border-blue-100 dark:border-blue-500/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
            <div className="w-14 h-14 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <img src={assets.patients_icon} alt="icon" className="w-7 opacity-80 dark:invert dark:opacity-100" />
            </div>
            <div>
              <p className='text-4xl font-bold text-blue-600 dark:text-blue-400 font-outfit'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300 font-medium tracking-wide'>Total Enrolments</p>
            </div>
          </div>

          {/* Card 2: Courses (Green Gradient) */}
          <div className='flex items-center gap-4 rounded-3xl p-8 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 border border-green-100 dark:border-green-500/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
            <div className="w-14 h-14 bg-green-500/10 dark:bg-green-500/20 rounded-2xl flex items-center justify-center">
                <img src={assets.appointments_icon} alt="icon" className="w-7 opacity-80 dark:invert dark:opacity-100" />
            </div>
            <div>
              <p className='text-4xl font-bold text-green-600 dark:text-green-400 font-outfit'>{dashboardData.totalCourses}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300 font-medium tracking-wide'>Active Courses</p>
            </div>
          </div>

          {/* Card 3: Earnings (Crimson Gradient) */}
          <div className='flex items-center gap-4 rounded-3xl p-8 bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-900 border border-red-100 dark:border-red-500/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
            <div className="w-14 h-14 bg-red-500/10 dark:bg-red-500/20 rounded-2xl flex items-center justify-center">
                <img src={assets.earning_icon} alt="icon" className="w-7 opacity-80 dark:invert dark:opacity-100" />
            </div>
            <div>
              <p className='text-4xl font-bold text-red-600 dark:text-red-400 font-outfit'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300 font-medium tracking-wide'>Total Earnings</p>
            </div>
          </div>

        </div>

        {/* Latest Enrolments Section */}
        <div className="pt-8 pb-10">
          <h2 className="pb-4 text-xl font-bold text-brand-dark dark:text-white font-outfit">Latest Enrolments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-3xl bg-white dark:bg-card border border-gray-200 dark:border-white/10 shadow-lg">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 dark:text-gray-200 border-b border-gray-200 dark:border-white/10 text-sm text-left bg-gray-50/50 dark:bg-white/5">
                <tr>
                  <th className="px-6 py-5 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-6 py-5 font-semibold">Student Name</th>
                  <th className="px-6 py-5 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500 dark:text-gray-400">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-white/5 hover:bg-brand-cream/60 dark:hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-5 text-center hidden sm:table-cell font-medium">{index + 1}</td>
                    <td className="md:px-6 px-4 py-5 flex items-center space-x-4">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                      />
                      <span className="truncate text-gray-800 dark:text-gray-200 font-semibold">{item.student.name}</span>
                    </td>
                    <td className="px-6 py-5 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard