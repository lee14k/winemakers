'use client'
import './Headbanner.css'
import Image from 'next/image'
export default function Headbanner () {
    return (
        <div className="banner">
            <Image
                src='/whitelogowinemaker.png'
                width={630}
                height={500}
            />
            <button>Join us Now</button>
        </div>
    )
}