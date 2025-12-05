import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/educator/SideBar'
import Navbar from '../../components/student/Navbar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
    return (
        <div className="text-default min-h-screen bg-brand-cream dark:bg-background text-brand-dark dark:text-white transition-colors duration-300 font-jakarta">
            <Navbar />
            <div className='flex'>
                <SideBar />
                <div className='flex-1 overflow-x-hidden relative'>
                    {/* Background Blobs for consistency across all Educator pages */}
                    <div className='absolute top-0 left-0 w-96 h-96 bg-brand-peach/30 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20'></div>
                    <div className='absolute bottom-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20'></div>
                    
                    {<Outlet />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Educator