"use client";
import useFetch from '@/app/hooks/useFetch';
import { ICategoria } from '@/interfaces/categorias.interfaces';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

function AccionesCategoria({id} : {id: number}) {
   const {error, loading, fetchCS} = useFetch();
   const router = useRouter();
    const eliminarCategoria = async () => {

      Swal.fire({
         title: '¿Seguro quieres eliminar esta categoría?',
         showCancelButton: true,
         confirmButtonText: 'Eliminar',
         cancelButtonText: 'Cancelar',
         confirmButtonColor: 'rgb(220,38,38) '
       }).then(async (result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
            const res = await fetchCS<ICategoria>({
               url: `/categorias/${id}`,
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
       href={`/clientes/correo/categorias/${id}`}
    >
       Editar
    </Link>
    <button
       className="font-medium text-red-600 dark:text-red-500 hover:underline"
       onClick={eliminarCategoria}
    >
       Eliminar
    </button>
 </>
  )
}

export default AccionesCategoria