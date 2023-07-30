"use client";
import Button from "@/app/clientes/components/Button";
import Table from "@/app/clientes/components/Table";
import { IContacto } from "@/interfaces/contactos.interfaces";
import React from "react";
import CheckboxSelection from "./CheckboxSelection";
import useFetch from "@/app/hooks/useFetch";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import router, { useRouter } from "next/navigation";

interface ITableToSelectionProps {
   contactos: IContacto[];
   idTable: string;
}

function TableToSelection({ contactos, idTable }: ITableToSelectionProps) {
   const [selectedContacts, setSelectedContacts] = React.useState<number[]>([]);
   const {fetchCS, loading} = useFetch();
   const router = useRouter();

   const contactosForTable = contactos.map((contacto) => [
      <CheckboxSelection
         selection={selectedContacts}
         id={contacto.id}
         key={contacto.id}
         handleSelection={setSelectedContacts}
      />,
      contacto.attributes.email,
      contacto.attributes.nombre,
   ]);

    const handleAddSelection = async () => {
        const res = await fetchCS<IListaContacto>({
            url: `/lista-contactos/${idTable}`,
            method: "PUT",
            data: {
                "contactos": {
                    "connect": selectedContacts
                }
            }
        });
        if (res) {
            router.refresh();
            router.push(`/clientes/correo/lista-contactos/${idTable}`);
        }
   }

   return (
      <>
         <div className="flex justify-end">
            <Button label="Añadir selección" className="my-6" onClick={handleAddSelection}/>
         </div>

         <Table
            headers={["#", "Correo Electrónico", "Nombre"]}
            data={contactosForTable}
         />
      </>
   );
}

export default TableToSelection;
