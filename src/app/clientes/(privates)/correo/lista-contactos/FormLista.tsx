'use client'
import Button from '@/app/clientes/components/Button'
import Input from '@/app/clientes/components/form/Input'
import useFetch from '@/app/hooks/useFetch';
import { IListaContacto } from '@/interfaces/listaContactos.interfaces'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'

function FormLista({lista}: {lista?: IListaContacto}) {

    const [form, setForm] = useState(lista?.attributes ?? { nombre: "" });
   const { nombre } = form;
   const router = useRouter();
   const {fetchCS, error, loading} = useFetch();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const method = lista ? 'PUT' : 'POST';
      const url = lista ? `/lista-contactos/${lista.id}` : '/lista-contactos';
      const data = {nombre} //solo esto se envirá, agregar las demás propiedades si se requieren
      
      const res = await fetchCS<IListaContacto>({url, method, data});
      if(res){
         router.refresh();
         router.replace(`/clientes/correo/lista-contactos`);
      }
      
   };
  return (
    <form className='mt-6' onSubmit={handleSubmit}>
         <Input
               label="Nombre"
               name="nombre"
               value={nombre}
               type="text"
               classContainer="mb-6"
               onChange={handleChange}
            />
         <Button label={lista ? 'Guardar ': 'Añadir'} className="w-full"  loading={loading}/>
    </form>
  )
}

export default FormLista