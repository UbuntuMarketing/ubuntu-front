import Link from "next/link";
import React from "react";

function LayoutCorreo({ children }: { children: React.ReactNode }) {
   return (
      <div className="h-full flex">
         <aside className="fixed col-span-1 h-[calc(100vh-56px)] w-56 bg-slate-700">
            <nav className="bg-slate-700 h-full w-full">
            <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo"
               >
                  Inicio
               </Link>
               <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo/contactos"
               >
                  Contactos
               </Link>
               <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo/lista-contactos"
               >
                  Lista de Contactos
               </Link>
               <Link
                  className="w-full h-14 border-b-2 border-slate-800 text-white flex items-center justify-center"
                  href="/clientes/correo/envios"
               >
                  Crear Campaña
               </Link>
            </nav>
         </aside>
         <div className="col-span-4 ml-[224px] w-full">
            <div className="py-3 px-12">
               {children}
            </div>
         </div>
      </div>
   );
}

export default LayoutCorreo;
