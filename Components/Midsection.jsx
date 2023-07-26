import Image from "next/image"
import './Midsection.css'
export default function Midsection () {
    return (
        <div className="mid">
<Image
src='/midwinepic.jpeg'
height={300}
width={420}
/>
<div className="midtext">
    <h2>Welcome</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsum quia, a necessitatibus eius pariatur tempora, illum at amet nemo quasi quos est recusandae consequatur architecto libero voluptates quod animi.</p>
</div>
        </div>
    )
}