"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaHome, FaUserFriends, FaListUl, FaEnvelope } from "react-icons/fa";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

function LayoutCorreo({ children }: { children: React.ReactNode }) {
   const [asideOpen, setAsideOpen] = useState(false);

   return (
      <div className="h-full flex">
         <aside
            className={`z-50 fixed w-3/4 md:fixed h-[calc(100vh-56px)] md:left-0 ${
               asideOpen ? "" : "-left-3/4"
            } bg-slate-900 md:block md:col-span-1 md:w-56 transition-all duration-300`}
         >
            <div
               onClick={() => setAsideOpen(!asideOpen)}
               className="absolute md:hidden right-0 translate-x-1/2 -translate-y-1/2 p-3 bg-slate-900 border-2 border-slate-800 text-white text-2xl cursor-pointer"
               style={{ borderRadius: "50%", top: "calc(50vh - 56px)" }}
            >
               {asideOpen ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
            </div>
            <nav className="bg-slate-900 h-full w-full border-slate-800 border-t-2">
               <Link
                  className="w-full h-14 border-b-2  border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo"
               >
                  <div className="mr-1">
                     <FaHome />
                  </div>
                  Inicio
               </Link>
               <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo/contactos"
               >
                  <div className="mr-1">
                     <FaUserFriends />
                  </div>
                  Contactos
               </Link>
               <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo/lista-contactos"
               >
                  <div className="mr-1">
                     <FaListUl />
                  </div>
                  Lista de Contactos
               </Link>
               <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo/campanas"
               >
                  <div className="mr-1">
                     <FaEnvelope />
                  </div>
                  Campañas
               </Link>
            </nav>
         </aside>
         <div className="md:col-span-4 md:ml-[224px] w-full">
            <div className="py-3 px-12">{children}</div>
         </div>
      </div>
   );
}

export default LayoutCorreo;
