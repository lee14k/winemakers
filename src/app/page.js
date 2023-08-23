import Headbanner from "../../Components/Headbanner"
import Homeevents from "../../Components/Homeevents"
import Footer from "../../Components/Footer"
import Navbar from "../../Components/Navbar"
import Middsex from "../../Components/Midsex"
import { UserProvider } from '@auth0/nextjs-auth0';
export default function Home() {
  return (
   <>

    <Navbar/>
<Headbanner/>  
<Middsex/>

<Homeevents/>
<Footer/>
   </>
  )
}
