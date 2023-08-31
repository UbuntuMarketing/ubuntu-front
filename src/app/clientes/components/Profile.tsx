'use client'
import useFetch from "@/app/hooks/useFetch";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const {fetchCS} = useFetch();
    const router = useRouter();

    const logout = async () => {
      await fetch('/api/auth/logout');
      router.refresh();
    }
 
    return (
       <div className="relative">
          <div className="w-10 h-10 rounded-full cursor-pointer bg-transparent" onClick={() => setOpen(!open)}>
             <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                   className="absolute w-12 h-12 text-gray-400 -left-1"
                   fill="currentColor"
                   viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg"
                >
                   <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                   ></path>
                </svg>
             </div>
          </div>
 
          <div
             id="userDropdown"
             className={`z-10 ${open? 'block': 'hidden'} absolute -translate-x-3/4  translate-y-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
             {/* <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
             </div> */}
             {/* <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
             >
                <li>
                   <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                      Dashboard
                   </a>
                </li>
                <li>
                   <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                      Settings
                   </a>
                </li>
                <li>
                   <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                      Earnings
                   </a>
                </li>
             </ul> */}
             <div className="py-1">
                <button
                   onClick={() => logout()}
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                   Cerrar Sesión
                </button>
             </div>
          </div>
       </div>
    );
 };

 export default Profile;