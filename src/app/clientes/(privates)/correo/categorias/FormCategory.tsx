"use client";
import Button from "@/app/clientes/components/Button";
import ErrorMessage from "@/app/clientes/components/ErrorMessage";
import SelectionTable from "@/app/clientes/components/SelectionTable";
import Input from "@/app/clientes/components/form/Input";
import useFetch from "@/app/hooks/useFetch";
import { ICategoria } from "@/interfaces/categorias.interfaces";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface IPropsFormAddCategory {
   contactos: IContacto[];
   categoria?: ICategoria;
}

function FormAddCategory({ contactos, categoria }: IPropsFormAddCategory) {
   const [nombre, setNombre] = useState(categoria? categoria.attributes.nombre : "");
   const [selectedContacts, setSelectedContacts] = useState<number[]>(
      categoria ? getIdContactInCategory(categoria) : []
   );
   const { fetchCS, error, loading, setError } = useFetch();
   const router = useRouter();
   const contactsData = contactos.map((c) => ({
      id: c.id,
      values: [c.attributes.email, c.attributes.nombre],
   }));

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (nombre.trim() === "") {
         setError("El nombre no puede estar vacio");
         return;
      }

      const url = categoria ? `/categorias/${categoria.id}` : "/categorias";
      const method = categoria ? "PUT" : "POST";
      const data = {
         nombre,
         contactos: {
            connect: selectedContacts,
         },
      };
      const res = await fetchCS<IContacto>({ url, method, data });
      if (res) {
         router.refresh();
         router.replace(`/clientes/correo/categorias`);
      }
   };

   return (
      <>
         <form className="my-5" onSubmit={handleSubmit}>
            <Input
               label="Nombre Categoría"
               value={nombre}
               onChange={(e) => setNombre(e.target.value)}
               classContainer="mb-5"
            />
            <SelectionTable
               headers={["Correo electrónico", "Nombre"]}
               selection={selectedContacts}
               setSelection={setSelectedContacts}
               data={contactsData}
            />

            <ErrorMessage error={error} className="mt-5" />
            <Button
               label={categoria ? 'Editar Categoría' : 'Crear Categoría'}
               className="mt-5 w-full"
               type="submit"
               loading={loading}
            />
         </form>
      </>
   );
}

const getIdContactInCategory = (category: ICategoria): number[] => {
   return category.attributes.contactos.data.map((c) => c.id);
};

export default FormAddCategory;
