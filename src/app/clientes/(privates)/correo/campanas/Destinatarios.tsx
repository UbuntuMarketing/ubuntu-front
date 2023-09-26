import SelectionTable from "@/app/clientes/components/SelectionTable";
import Select from "react-select";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import React from "react";
import { ICategoria } from "@/interfaces/categorias.interfaces";

interface IDestinatariosProps {
   contactos: IContacto[];
   listas: IListaContacto[];
   contactsSelection: number[];
   categorias: ICategoria[]
   setContactsSelection: React.Dispatch<React.SetStateAction<number[]>>;
   listsSelection: number[];
   setListsSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

function Destinatarios({
   contactos,
   listas,
   categorias,
   contactsSelection,
   setContactsSelection,
   listsSelection,
   setListsSelection,
}: IDestinatariosProps) {
   const [optionType, setOptionType] = React.useState<{value: "listas" | "contactos", label: string}>(
      {value: 'listas', label: 'Listas de contactos'}
   );

   return (
      <>
         <div className="flex justify-between">
            <div>
               <label className="mb-2 block">Seleccionar en:</label>
               <Select
                  value={optionType}
                  options={[
                     {value: 'listas', label: 'Listas de contactos'},
                     {value: 'contactos', label: 'Contactos'}
                  ]}
                  onChange={(opt) => {
                     if(opt){
                        setOptionType(opt)
                     }
                  }}
                  className="min-w-[300px]"
               />
            </div>
            <div>
               <label className="mb-2 block">Categorias:</label>
               <Select
                  placeholder='Seleccionar categorías'
                  options={categorias.map( c => ({value: c.id, label: c.attributes.nombre}))}
                  className="min-w-[300px]"
                  isMulti
               />
            </div>
         </div>

         {optionType.value === "listas" ? (
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
