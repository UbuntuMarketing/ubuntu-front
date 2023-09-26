"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "@/app/clientes/components/form/Input";
import Button from "@/app/clientes/components/Button";
import {
   IContacto,
   IFormNuevoContacto,
} from "@/interfaces/contactos.interfaces";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";
import ErrorMessage from "@/app/clientes/components/ErrorMessage";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import { ICategoria } from "@/interfaces/categorias.interfaces";
import SelectionTable from "@/app/clientes/components/SelectionTable";

interface IPropsFormContacto {
   contacto?: IContacto;
   listaContactos: IListaContacto[];
   categorias: ICategoria[];
}

function FormContacto({
   contacto,
   listaContactos,
   categorias,
}: IPropsFormContacto) {
   const [form, setForm] = useState<IFormNuevoContacto>(
      contacto?.attributes ?? { email: "", nombre: "" }
   );
   const [listsSelection, setListsSelection] = useState<number[]>(
     contacto?  getListsFromContact(contacto) : []
   );
   const [categoriesSelection, setCategoriesSelection] = useState<number[]>(
      contacto ? getCategoriesFromContact(contacto) : []
   );
   const { email, nombre } = form;
   const router = useRouter();
   const { fetchCS, error, loading, setError } = useFetch();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const method = contacto ? "PUT" : "POST";
      const url = contacto ? `/contactos/${contacto.id}` : "/contactos";
      const data = {
         email,
         nombre,
         lista_contactos: {
            connect: listsSelection,
            disconnect: getListsFromContact(contacto).filter( id => !listsSelection.includes(id))
         },
         categorias: {
            connect: categoriesSelection,
            disconnect:  getCategoriesFromContact(contacto).filter( id =>  !categoriesSelection.includes(id) )
         }
      }; //solo esto se envirá, agregar las demás propiedades si se requieren

      if (nombre.trim() === "") {
         setError("El nombre es un campo obligatorio");
         return;
      }
      if (email.trim() === "") {
         setError("El correo electrónico es un campo obligatorio");
         return;
      }

      const res = await fetchCS<IContacto>({ url, method, data });
      if (res) {
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
         <div className="grid grid-cols-2 gap-10 mb-7">
            <SelectionTable
               headers={["Lista de Contactos"]}
               data={listaContactos.map((l) => ({
                  id: l.id,
                  values: [l.attributes.nombre],
               }))}
               selection={listsSelection}
               setSelection={setListsSelection}
               maxHeight={400}
            />
            <SelectionTable
               headers={["Categorías"]}
               data={categorias.map((c) => ({
                  id: c.id,
                  values: [c.attributes.nombre],
               }))}
               selection={categoriesSelection}
               setSelection={setCategoriesSelection}
               maxHeight={400}
            />
         </div>
         {error && <ErrorMessage className="mb-2" error={error} />}
         <Button
            label={contacto ? "Editar " : "Añadir"}
            className="w-full"
            loading={loading}
         />
      </form>
   );
}

const getListsFromContact = (contact: IContacto | undefined) : number[] =>{
   return contact?.attributes.lista_contactos?.data.map( l => l.id) || [];
}

const getCategoriesFromContact = (contact: IContacto | undefined) : number[] =>{
   return contact?.attributes.categorias?.data.map( c => c.id) || [];
}


export default FormContacto;
