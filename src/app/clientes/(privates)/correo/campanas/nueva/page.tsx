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
import { IUserMe } from "@/interfaces/auth.interfaces";
import { getContactos } from "@/app/services/contactos";
import { getListas } from "@/app/services/listasContactos";
import { getCategorias } from "@/app/services/categorias";

const getUser = async (): Promise<IUserMe> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({
      url: `/users/me`,
      token,
      cache: "no-store",
   }) as unknown as Promise<IUserMe>;
};

async function page() {
   const contactos = getContactos({ queries: "pagination[pageSize]=10000" });
   const listas = getListas({ queries: "populate=contactos" });
   const categorias = getCategorias({});
   const user = getUser();

   const [
      { data: contactosData },
      { data: listasData },
      userData,
      { data: categoriasData },
   ] = await Promise.all([contactos, listas, user, categorias]);

   return (
      <>
         <Title title="Crear campaña" />
         <FormEnvio
            contactos={contactosData}
            listas={listasData}
            user={userData}
            categorias={categoriasData}
         />
      </>
   );
}

export default page;
