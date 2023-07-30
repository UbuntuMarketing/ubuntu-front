import React from "react";
import Table from "@/app/clientes/components/Table";
import { cookies } from "next/headers";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import strapiFetch from "@/helpers/fetcher";
import AccionesLista from "./AccionesLista";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import Title from "@/app/clientes/components/Title";
import LinkButton from "@/app/clientes/components/LinkButton";


const getListas = async (): Promise<StrapiResponse<IListaContacto[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({ url: `/lista-contactos?populate=contactos`, token, cache: "no-store" });
};

async function ListaContactos() {
   const { data } = await getListas();
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
