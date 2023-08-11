import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { API_HOST } from "@/config";

const getAuth = () => {
   const cookieStore = cookies();
   
   if(!cookieStore.get('jwt')?.value){
      redirect('/clientes');
   }
}


async function Layout({ children }: { children: React.ReactNode }) {
   getAuth();

   return (
      <div className="min-h-screen flex flex-col relative">
         <nav className="sticky top-0 w-full bg-slate-900 h-14 z-50">
            <div className="container mx-auto flex items-center h-full">
               <Link className="text-white" href="clientes/correo">
                  Correos
               </Link>
            </div>
         </nav>
         <div className="h-full">{children}</div>
         {/* <footer className="w-full bg-slate-900 h-14">

         </footer> */}
      </div>
   );
}

export default Layout;
