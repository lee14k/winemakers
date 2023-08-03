import Headbanner from "../../Components/Headbanner"
import Homeevents from "../../Components/Homeevents"
import Midsection from "../../Components/Midsection"
import Footer from "../../Components/Footer"
import Navbar from "../../Components/Navbar"
export default function Home() {
  return (
   <div className="pagewrap">
    <Navbar/>
<Headbanner/>  
<Midsection/>  
<Homeevents/>
<Footer/>
   </div>
  )
}
