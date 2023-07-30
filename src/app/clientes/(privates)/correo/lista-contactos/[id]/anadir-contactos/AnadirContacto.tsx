'use client'

import Button from "@/app/clientes/components/Button";
import SelectionTable from "@/app/clientes/components/SelectionTable";
import useFetch from "@/app/hooks/useFetch";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import { useRouter } from "next/navigation";
import React from "react";

interface IAnadirContactoProps {
   idTable: string;
   contactosNotOnList: IContacto[];
}

function AnadirContacto({ idTable, contactosNotOnList }: IAnadirContactoProps) {
   const [selectedContacts, setSelectedContacts] = React.useState<number[]>([]);
   const { fetchCS, loading } = useFetch();
   const router = useRouter();

   const data = contactosNotOnList.map((contacto) => ({
      id: contacto.id,
      values: [contacto.attributes.email, contacto.attributes.nombre] as any[],
   }));

   const handleAddSelection = async () => {
      const res = await fetchCS<IListaContacto>({
         url: `/lista-contactos/${idTable}`,
         method: "PUT",
         data: {
            contactos: {
               connect: selectedContacts,
            },
         },
      });
      if (res) {
         router.refresh();
         router.push(`/clientes/correo/lista-contactos/${idTable}`);
      }
   };
   return (
    <>
        <Button label="Añadir selección" className="my-6" onClick={handleAddSelection}/>
      <SelectionTable
         headers={["Correo electrónico", "Nombre"]}
         data={data}
         selection={selectedContacts}
         handleSelection={setSelectedContacts}
      />
    </>
   );
}

export default AnadirContacto;
