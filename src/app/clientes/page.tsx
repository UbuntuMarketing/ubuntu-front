"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import Input from "./components/form/Input";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./components/Spinner";
import { addToken } from "../actions";
import { ILoginReponse } from "@/interfaces/auth.interfaces";

function Page() {
   const [form, setForm] = useState({ identifier: "", password: "" });
   const { user, login, loading, error } = useAuth();
   const { identifier, password } = form;
   const { replace } = useRouter();

   useEffect(() => {
      if (user) {
         replace("/clientes/correo");
      }
   }, [user, replace]);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await login(form) as ILoginReponse;
      addToken(res?.jwt);
   };

   if (loading || user) {
      return (
         <div className="min-w-screen min-h-screen flex justify-center items-center">
            <Spinner />
         </div>
      );
   }

   return (
      <div className="w-full min-h-screen bg-slate-700">
         <div className="container min-h-screen m-auto flex items-center">
            <form
               className="shadow-lg bg-white p-8 w-[400px] m-auto my-5"
               onSubmit={handleSubmit}
            >
               <h1 className="py-8 text-xl font-bold text-center">
                  ¡Iniciar Sesión!
               </h1>
               <Input
                  label="Correo Electrónico"
                  type="email"
                  name="identifier"
                  value={identifier}
                  onChange={handleChange}
               />
               <Input
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
               />
               {error && (
                  <p className="text-center mb-5 text-red-500">{error}</p>
               )}
               <Button
                  label={loading ? "iniciando" : "Iniciar sesión"}
                  className="w-full"
               />
            </form>
         </div>
      </div>
   );
}

export default Page;
