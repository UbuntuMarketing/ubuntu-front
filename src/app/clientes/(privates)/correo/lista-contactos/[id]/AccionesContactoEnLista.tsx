'use client'
import useFetch from "@/app/hooks/useFetch";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import { useRouter } from "next/navigation";
import React from "react";

function AccionesContactoEnLista({
   idContacto,
   idLista,
}: {
   idContacto: number | string;
   idLista: number | string;
}) {
   const router = useRouter();
   const { fetchCS, loading } = useFetch();

   const eliminarContactoDeLista = async () => {
      const res = await fetchCS<IListaContacto>({
         url: `/lista-contactos/${idLista}`,
         method: "PUT",
         data: {
            contactos: { disconnect: [idContacto] },
         },
      });
      if (res) {
         router.refresh();
      }
   };
   return (
      <>
         <button
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
            onClick={eliminarContactoDeLista}
         >
            Quitar
         </button>
      </>
   );
}

export default AccionesContactoEnLista;
