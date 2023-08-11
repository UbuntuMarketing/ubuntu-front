"use client";
import useFetch from "@/app/hooks/useFetch";
import { IContacto } from "@/interfaces/contactos.interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AccionesContacto = ({ id }: { id: number | string }) => {
   const router = useRouter();
   const { fetchCS, loading } = useFetch();

   const eliminarContacto = async () => {

      Swal.fire({
         title: '¿Seguro quieres eliminar este contacto?',
         showCancelButton: true,
         confirmButtonText: 'Eliminar',
         cancelButtonText: 'Cancelar',
         confirmButtonColor: 'rgb(220,38,38) '
       }).then(async (result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
            const res = await fetchCS<IContacto>({
               url: `/contactos/${id}`,
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
