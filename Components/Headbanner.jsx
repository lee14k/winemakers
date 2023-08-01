'use client'
import './Headbanner.css'
import Image from 'next/image'
export default function Headbanner () {
    return (
        <div className="banner">
            <Image
                src='/winelogov3.png'
                width={600}
                height={600}
            />
            <button className='join'>Learn More</button>
        </div>
    )
}