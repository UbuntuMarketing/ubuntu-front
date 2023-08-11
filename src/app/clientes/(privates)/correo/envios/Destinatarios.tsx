import SelectionTable from "@/app/clientes/components/SelectionTable";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import React from "react";

interface IDestinatariosProps {
   contactos: IContacto[];
   listas: IListaContacto[];
   contactsSelection: number[];
   setContactsSelection: React.Dispatch<React.SetStateAction<number[]>>;
   listsSelection: number[];
   setListsSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

function Destinatarios({
   contactos,
   listas,
   contactsSelection,
   setContactsSelection,
   listsSelection,
   setListsSelection,
}: IDestinatariosProps) {
   const [optionType, setOptionType] = React.useState<"listas" | "contactos">(
      "listas"
   );

   return (
      <>
         <select
            className="mb-5"
            value={optionType}
            onChange={(e) => {
               setOptionType(e.target.value as "listas" | "contactos");
            }}
         >
            <option value="listas">Lista de Contactos</option>
            <option value="contactos">Contactos</option>
         </select>

         {optionType === "listas" ? (
            <div className="my-5">
               <SelectionTable
                  headers={["Nombre Lista", "Cantidad contactos"]}
                  data={listas.map((lista) => ({
                     id: lista.id,
                     values: [
                        lista.attributes.nombre,
                        lista.attributes.contactos?.data.length,
                     ],
                  }))}
                  selection={listsSelection}
                  setSelection={setListsSelection}
                  maxHeight={300}
               />
            </div>
         ) : (
            <div className="my-5">
               <SelectionTable
                  headers={["Correo electrónico", "Nombre"]}
                  data={contactos.map((contacto) => ({
                     id: contacto.id,
                     values: [
                        contacto.attributes.nombre,
                        contacto.attributes.email,
                     ],
                  }))}
                  selection={contactsSelection}
                  setSelection={setContactsSelection}
                  maxHeight={300}
               />
            </div>
         )}
      </>
   );
}

export default Destinatarios;
