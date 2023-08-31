import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Profile from "./Profile";
import { FaEnvelope, FaHome, FaListUl, FaUserFriends } from "react-icons/fa";
import Link from "next/link";

function Navbar() {
   return (
      <nav className="sticky px-5 md:px-0 top-0 w-full bg-slate-900 h-14 z-40">
         <div className="container mx-auto flex justify-between items-center h-full">
            <div className="text-white text-2xl font-extrabold flex items-center">
               <FaEnvelope />
               <span className="ml-1">UM</span>
            </div>
            <Profile />
         </div>
      </nav>
   );
}

export default Navbar;
