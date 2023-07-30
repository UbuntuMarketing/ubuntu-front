"use client";
import useFetch from "@/app/hooks/useFetch";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccionesLista = ({ id }: { id: number | string }) => {
   const router = useRouter();
   const { fetchCS, loading } = useFetch();

   const eliminarLista= async () => {
      const res = await fetchCS<IListaContacto>({
         url: `/lista-contactos/${id}`,
         method: "DELETE",
      });
      if (res) {
         router.refresh();
      }
   };
   return (
      <>
         <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
            href={`/clientes/correo/lista-contactos/${id}`}
         >
            Ver
         </Link>
         <button
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
            onClick={eliminarLista}
         >
            Eliminar
         </button>
      </>
   );
};

export default AccionesLista;
