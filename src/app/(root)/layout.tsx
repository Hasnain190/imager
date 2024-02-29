import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import Footer from '@/components/shared/Footer'
import { Toaster } from '@/components/ui/toaster'

import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='root'>
                <MobileNav />
                {/* sidebar */}
                <Sidebar />




                <div className="root-container">
                    <div className="wrapper">

                        {children}
                    </div>
                </div>
                <Toaster /
                >

            </main>
            <Footer />
        </>
    )
}

export default Layout