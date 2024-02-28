import Image from 'next/image'
import React from 'react'

function Footer() {
    return (
        <div className='footer flex flex-row  gap-4    w-full h-8 justify-center items-center p-4 text-sm sm:text-[10px]'>
            Made by

            <a href="http://www.realenlight.com">
                realenlight.com
            </a>
            Thank you Sir Adrian Hajdin!
        </div>
    )
}

export default Footer