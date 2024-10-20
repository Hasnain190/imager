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
              <a href="https://www.termsfeed.com/live/d67c378c-31b8-4223-8daa-53c7d05468bb">
                Privacy Policy
            </a>
        </div>
    )
}

export default Footer