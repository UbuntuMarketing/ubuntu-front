"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

function Layout({ children }: { children: React.ReactNode }) {
   const { user, loading } = useAuth();
   const {replace} = useRouter();

   useEffect(() => {
      if (!user && !loading) {
         replace("/clientes"); // redirect to login page
      }
   }, [user, replace, loading]);

   if (loading || !user) {
      return (
         <div className="min-w-screen min-h-screen flex justify-center items-center">
            <Spinner />
         </div>
      );
   }

   return (
      <div className="min-h-screen flex flex-col relative">
         <nav className="sticky top-0 w-full bg-slate-900 h-14">
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
