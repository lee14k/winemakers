'use client'
import Search from "../../../Components/Search";
import Navbar from "../../../Components/Navbar";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


export default function Members() { return (
  <div>
    <Navbar />
    <Search />
  </div>
)}
