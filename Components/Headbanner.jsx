'use client'
import './Headbanner.css'
import Image from 'next/image'
export default function Headbanner () {
    return (
        <div className="banner">
            <Image
                src='/winelogo2.png'
                width={500}
                height={500}
            />
            <button>Join us Now</button>
        </div>
    )
}