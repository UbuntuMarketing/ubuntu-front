import Table from "@/app/clientes/components/Table";
import Title from "@/app/clientes/components/Title";
import Input from "@/app/clientes/components/form/Input";
import React from "react";
import FormEnvio from "../FormEnvio";
import { cookies } from "next/headers";
import strapiFetch from "@/helpers/fetcher";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import { IContacto } from "@/interfaces/contactos.interfaces";

const getContactos = async (): Promise<StrapiResponse<IContacto[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({ url: `/contactos`, token, cache: "no-store" });
};
const getListas = async (): Promise<StrapiResponse<IListaContacto[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({
      url: `/lista-contactos?populate=contactos`,
      token,
      cache: "no-store",
   });
};


async function page() {
   const contactos = getContactos();
   const listas = getListas();
   const [{data: contactosData}, {data: listasData}] = await Promise.all([contactos, listas]);

   return (
      <>
         <Title title="Crear campaña" />
         <FormEnvio contactos={contactosData} listas={listasData} />
      </>
   );
}

export default page;
