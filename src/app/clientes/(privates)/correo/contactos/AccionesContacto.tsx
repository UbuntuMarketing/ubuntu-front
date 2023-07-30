"use client";
import useFetch from "@/app/hooks/useFetch";
import { IContacto } from "@/interfaces/contactos.interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccionesContacto = ({ id }: { id: number | string }) => {
   const router = useRouter();
   const { fetchCS, loading } = useFetch();

   const eliminarContacto = async () => {
      const res = await fetchCS<IContacto>({
         url: `/contactos/${id}`,
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
            href={`/clientes/correo/contactos/${id}`}
         >
            Editar
         </Link>
         <button
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
            onClick={eliminarContacto}
         >
            Eliminar
         </button>
      </>
   );
};

export default AccionesContacto;
