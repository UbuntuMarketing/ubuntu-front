import React from "react";
import Table from "@/app/clientes/components/Table";
import AccionesLista from "./AccionesLista";
import {BiListPlus} from 'react-icons/bi'
import Title from "@/app/clientes/components/Title";
import LinkButton from "@/app/clientes/components/LinkButton";
import { getListas } from "@/app/services/listasContactos";


async function ListaContactos() {
   const { data } = await getListas({queries: 'populate=contactos'});
   const listas = data.map((lista) => [
      lista.attributes.nombre,
      lista.attributes.contactos?.data.length,
      <AccionesLista id={lista.id} key={lista.id}/>
   ]);

   return (
      <>
         <Title title="Listas de Contactos"/>
         <div className="my-5 flex justify-end">
            <LinkButton
               href="/clientes/correo/lista-contactos/nuevo"
               label="Crear"
               buttonType="green"
               icon={<BiListPlus/>}
            />
         </div>
         <div>
            <Table
               headers={["Nombre Lista", "Cantidad contactos", "Acciones"]}
               data={[...listas]}
            />
         </div>
      </>
   );
}
export default ListaContactos;
