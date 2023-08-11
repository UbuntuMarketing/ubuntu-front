"use client";
import useFetch from "@/app/hooks/useFetch";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AccionesLista = ({ id }: { id: number | string }) => {
   const router = useRouter();
   const { fetchCS, loading } = useFetch();

   const eliminarLista= async () => {

      Swal.fire({
         title: '¿Seguro quieres eliminar esta lista??',
         showCancelButton: true,
         confirmButtonText: 'Eliminar',
         cancelButtonText: 'Cancelar',
         confirmButtonColor: 'rgb(220,38,38) '
       }).then(async (result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
            const res = await fetchCS<IListaContacto>({
               url: `/lista-contactos/${id}`,
               method: "DELETE",
            });
            if (res) {
               router.refresh();
            }
         } 
       })


      
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
