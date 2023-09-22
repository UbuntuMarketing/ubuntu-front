"use client";

import Button from "@/app/clientes/components/Button";
import ErrorMessage from "@/app/clientes/components/ErrorMessage";
import { API_HOST } from "@/config";
import { ILoginReponse } from "@/interfaces/auth.interfaces";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

function FormTemplate() {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [request, setRequest] = useState({
      loading: false,
      error: "",
   });
   const router = useRouter();
   const { loading, error } = request;
   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files[0];
         setSelectedFile(file);
      }
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setRequest({ ...request, error: "" });
      if (selectedFile) {
         const formData = new FormData();
         formData.append("file", selectedFile);

         try {
            setRequest({ ...request, loading: true });
            const auth: ILoginReponse = JSON.parse(
               localStorage.getItem("auth") || ""
            );
            const response = await fetch(`${API_HOST}/contactos/from-file`, {
               method: "POST",
               body: formData,
               headers: {
                  // 'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.jwt}`,
               },
            });

            if (!response.ok) {
               // El archivo se ha subido con éxito
               setRequest({ ...request, error: "Error al subir el archivo." });
            }else{
               const res = await response.json();
               await Swal.fire({
                  icon: "success",
                  title: "Archivo subido exitosamente",
                  html: `Contactos Añadidos: ${res.added}<br/>
               Contactos Rechazados: ${res.failed}`,
               });
               router.refresh();
               router.push(`/clientes/correo/contactos`);
            }            
         } catch (error) {
            setRequest({
               ...request,
               error: "Error de red al subir el archivo:",
            });
         } finally {
            setRequest((prev) => ({ ...prev, loading: false }));
            setSelectedFile(null);
         }
      } else {
         setRequest({
            ...request,
            error: "No se ha seleccionado ningún archivo.",
         });
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="relative border p-7">
            <h3 className="absolute top-0 -translate-y-1/2 bg-white px-3">
               Cargar Template
            </h3>
            <input
               type="file"
               className="cursor-pointer"
               onChange={handleFileChange}
            />
         </div>
         <ErrorMessage error={error} className="mt-3" />
         <Button
            label="Subir Template"
            className="w-full mt-5"
            type="submit"
            loading={loading}
         />
         <span className="text-xs text-gray-500 text-right">
            Si un contacto ya se encuentra en su lista, el mismo no será añadido
         </span>
      </form>
   );
}

export default FormTemplate;
