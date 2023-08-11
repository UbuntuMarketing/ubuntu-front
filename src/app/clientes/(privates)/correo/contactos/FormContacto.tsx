'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from "@/app/clientes/components/form/Input";
import Button from "@/app/clientes/components/Button";
import { IContacto, IFormNuevoContacto } from '@/interfaces/contactos.interfaces';
import { useRouter } from 'next/navigation';
import useFetch from '@/app/hooks/useFetch';
import ErrorMessage from '@/app/clientes/components/ErrorMessage';

function FormContacto({contacto} : {contacto?: IContacto}) {
    const [form, setForm] = useState<IFormNuevoContacto>(contacto?.attributes ?? { email: "", nombre: "" });
   const { email, nombre } = form;
   const router = useRouter();
   const {fetchCS, error, loading} = useFetch();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const method = contacto ? 'PUT' : 'POST';
      const url = contacto ? `/contactos/${contacto.id}` : '/contactos';
      const data = {email, nombre} //solo esto se envirá, agregar las demás propiedades si se requieren
      
      const res = await fetchCS<IContacto>({url, method, data});
      if(res){
         router.refresh();
         router.replace(`/clientes/correo/contactos`);
      }
      
   };
  return (
    <form className="mt-6" onSubmit={handleSubmit}>
            <Input
               label="Nombre"
               name="nombre"
               value={nombre}
               type="text"
               classContainer="mb-6"
               onChange={handleChange}
            />
            <Input
               label="Correo Electrónico"
               type="email"
               classContainer="mb-6"
               name="email"
               value={email}
               onChange={handleChange}
            />
            {error && <ErrorMessage className="mb-2" error={error} />}
            <Button label={contacto ? 'Editar ': 'Añadir'} className="w-full"  loading={loading}/>
         </form>
  )
}

export default FormContacto