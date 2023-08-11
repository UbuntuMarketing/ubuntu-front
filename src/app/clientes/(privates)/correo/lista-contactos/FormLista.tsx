"use client";
import Button from "@/app/clientes/components/Button";
import SelectionTable from "@/app/clientes/components/SelectionTable";
import Input from "@/app/clientes/components/form/Input";
import useFetch from "@/app/hooks/useFetch";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

function FormLista({
   lista,
   contactos,
}: {
   lista?: IListaContacto;
   contactos?: IContacto[];
}) {
   const [form, setForm] = useState(lista?.attributes ?? { nombre: "" });
   const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
   const { nombre } = form;
   const router = useRouter();
   const { fetchCS, error, loading } = useFetch();

   let dataContactos: { id: number; values: any[] }[] = [];
   if (contactos) {
      dataContactos = contactos.map((contacto) => ({
         id: contacto.id,
         values: [contacto.attributes.email, contacto.attributes.nombre],
      }));
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const method = lista ? "PUT" : "POST";
      const url = lista ? `/lista-contactos/${lista.id}` : "/lista-contactos";
      const data =
         method === "PUT"
            ? { nombre }
            : {
                 nombre,
                 contactos: {
                    connect: selectedContacts,
                 },
              }; //solo esto se enviará, agregar las demás propiedades si se requieren

      const res = await fetchCS<IListaContacto>({ url, method, data });
      const redirect = method === 'PUT' ? `/clientes/correo/lista-contactos/${lista?.id}` : '/clientes/correo/lista-contactos'
      if (res) {
         router.refresh();
         router.replace(redirect);
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
         {contactos && (
            <SelectionTable
               headers={["Correo electrónico", "Nombre"]}
               data={dataContactos}
               setSelection={setSelectedContacts}
               selection={selectedContacts}
            />
         )}

         <Button
            label={lista ? "Guardar " : "Añadir"}
            className="w-full my-5"
            loading={loading}
         />
      </form>
   );
}

export default FormLista;
