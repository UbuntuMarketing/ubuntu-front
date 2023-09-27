import SelectionTable from "@/app/clientes/components/SelectionTable";
import Select from "react-select";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import React, { useEffect, useState } from "react";
import { Contactos, ICategoria } from "@/interfaces/categorias.interfaces";
import { list } from "postcss";

interface IDestinatariosProps {
   contactos: IContacto[];
   listas: IListaContacto[];
   contactsSelection: number[];
   categorias: ICategoria[];
   setContactsSelection: React.Dispatch<React.SetStateAction<number[]>>;
   listsSelection: number[];
   setListsSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

interface ISelectOption {
   value: number;
   label: string;
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
   const [contactosToShow, setContactsToShow] =
      React.useState<IContacto[]>(contactos);
   const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
      []
   );
   const [selectedListId, setSelectedListId] = useState<number>(0);
   //Filtering
   useEffect(() => {
      const contactList: IContacto[] =
         selectedListId
            ? filterContactsByList(contactos, selectedListId)
            : contactos;
      if(!selectedCategoriesIds.length){
         setContactsToShow(contactList);
         return;
      }
      const filtered = contactList.filter((contact) => {
         const categoriesOfContact = contact.attributes.categorias?.data.map(
            (c) => c.id
         );
         return selectedCategoriesIds?.every((category) =>
         categoriesOfContact?.includes(category)
         );
      });
      setContactsToShow(filtered);

   }, [contactos, listas, selectedCategoriesIds, selectedListId]);
  

   const handleSelectCategories = (opt: ISelectOption[]) => {
      const categories = opt.map((o) => o.value);
      setSelectedCategoriesIds(categories);
   };

   return (
      <>
         <div className="flex justify-between">
            <div>
               <label className="mb-2 block">Seleccionar en:</label>
               <Select
                  placeholder="Seleccionar Lista"
                  defaultValue={{ value: 0, label: "Todos" }}
                  options={[
                     { value: 0, label: "Todos" },
                     ...listas.map((l) => ({
                        value: l.id,
                        label: l.attributes.nombre,
                     })),
                  ]}
                  onChange={(opt) => opt && setSelectedListId(opt.value)}
                  className="min-w-[300px]"
               />
            </div>
            <div>
               <label className="mb-2 block">Categorias:</label>
               <Select
                  placeholder="Seleccionar categorías"
                  options={categorias.map((c) => ({
                     value: c.id,
                     label: c.attributes.nombre,
                  }))}
                  onChange={(opt) =>
                     opt && handleSelectCategories(opt as ISelectOption[])
                  }
                  className="min-w-[300px]"
                  isMulti
               />
            </div>
         </div>

         <div className="my-5">
            <SelectionTable
               headers={[ "Nombre", "Correo electrónico"]}
               data={contactosToShow.map((contacto) => ({
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
      </>
   );
}

const filterContactsByList = (contacts: IContacto[], listId: number) => {
   return contacts.filter( c => { 
      const listsCurrentContact = c.attributes.lista_contactos?.data.map( l => l.id)
      return  listsCurrentContact?.includes(listId);
   })
}

export default Destinatarios;
