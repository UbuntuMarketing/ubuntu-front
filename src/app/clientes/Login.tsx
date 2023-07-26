"use client";
import { ILoginReponse } from "@/interfaces/auth.interfaces";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "./components/form/Input";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

function Login() {
   const [form, setForm] = useState({ identifier: "", password: "" });
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const { identifier, password } = form;
   const router = useRouter();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try{
         const res = await fetch("/api/auth", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
         });      
         const data = await res.json();
         if (!res.ok) {
            console.log(data.error.message);
            setError(data.error.message);
            return;
         }
         router.push('/clientes/correo');
      }catch(error: any){
         setError(error.message);
      }finally{
         setLoading(false);
      }
     
   };

   return (
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
         {error && <p className="text-center mb-5 text-red-500">{error}</p>}
         <Button
            label={loading ? "iniciando" : "Iniciar sesión"}
            className="w-full"
         />
      </form>
   );
}

export default Login;
