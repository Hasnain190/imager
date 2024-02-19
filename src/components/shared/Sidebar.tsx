'use client'

import { SignIn, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { navLinks } from '../../../constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

function Sidebar() {

    const pathname = usePathname()
    return (
        <aside className='siderbar'>
            <div className="flex size-full flex-col gap-4">
                <Link href='/' className='sidebar-logo'>
                    <Image src={'/assets/images/logo-text.svg'} alt='logo' width={180} height={180} />
                </Link>

                <div className="siderbar-nav">
                    <SignedIn >

                        <ul className="siderbar-nar_elements">
                            {navLinks.slice(0, 6).map((link) => {

                                const isActive = link.route === pathname

                                return (
                                    <li key={link.route}
                                        className={`sidebar-nav_element
                                        ${isActive ? 'bg-purple-gradient text-white ' : 'text-gray-700'}
                                        `}

                                    >


                                        <Link href={link.route} className='sidebar-link'>
                                            <Image src={link.icon} alt={link.label} width={24} height={24}
                                                className={`${isActive && 'brightness-200'}`}

                                            />
                                            {link.label}</Link>
                                    </li>

                                )
                            })}
                        </ul>
                        <ul className="siderbar-nar_elements">
                            {navLinks.slice(6).map((link) => {

                                const isActive = link.route === pathname

                                return (
                                    <li key={link.route}
                                        className={`sidebar-nav_element
        ${isActive ? 'bg-purple-gradient text-white ' : 'text-gray-700'}
        `}

                                    >


                                        <Link href={link.route} className='sidebar-link'>
                                            <Image src={link.icon} alt={link.label} width={24} height={24}
                                                className={`${isActive && 'brightness-200'}`}

                                            />
                                            {link.label}</Link>
                                    </li>

                                )
                            })}
                            <li className=' gap-2 cursor-pointer p-4'><UserButton afterSignOutUrl='/' showName /> </li>
                        </ul>


                    </SignedIn>

                    <SignedOut>
                        <Button asChild
                            className='bg-purple-gradient bg-cover'
                        >
                            <Link href='/sign-in' className='sidebar-link'>Sign In</Link>
                        </Button>

                    </SignedOut>


                </div>
            </div>

        </aside >
    )
}

export default Sidebar