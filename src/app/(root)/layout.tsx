import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'

import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MobileNav />
            <main className='root'>
                {/* sidebar */}
                <Sidebar />




                <div className="root-container"><div className="wrapper">

                    {children}
                </div></div>
                <Toaster />
            </main>
        </>
    )
}

export default Layout