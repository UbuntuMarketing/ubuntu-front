import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Profile from "../components/Profile";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "../components/Navbar";

const getAuth = () => {
   const cookieStore = cookies();

   if (!cookieStore.get("jwt")?.value) {
      redirect("/clientes");
   }
};

async function Layout({ children }: { children: React.ReactNode }) {
   getAuth();

   return (
      <div className="min-h-screen flex flex-col relative">
         <Navbar/>
         <div className="h-full">{children}</div>
      </div>
   );
}

export default Layout;
