import React from "react";
import Table from "@/app/clientes/components/Table";
import { cookies } from "next/headers";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { IContacto } from "@/interfaces/contactos.interfaces";
import Title from "@/app/clientes/components/Title";
import LinkButton from "@/app/clientes/components/LinkButton";
import strapiFetch from "@/helpers/fetcher";
import AccionesContacto from "./AccionesContacto";
import {RiFileExcel2Line} from 'react-icons/ri'
import {BsPersonFillAdd} from 'react-icons/bs'

const getContactos = async (): Promise<StrapiResponse<IContacto[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({ url: `/contactos?pagination[pageSize]=10000`, token, cache: "no-store" });
};

async function Contactos() {
   const res = await getContactos();
   const {data} = res;
   const contactos = data.map((contacto) => [
      contacto.attributes.email,
      contacto.attributes.nombre,
      <AccionesContacto id={contacto.id} key={contacto.id}/>
   ]);

   return (
      <>
         <Title title="Contactos" />
         <div className="my-5 flex justify-end">
            <LinkButton
               href="/clientes/correo/contactos/nuevo"
               label="Añadir"
               buttonType="green"
               icon={<BsPersonFillAdd/>}
            />
              <LinkButton
               href="/clientes/correo/contactos/archivo"
               label="Cargar Archivo"
               icon={<RiFileExcel2Line />}
               buttonType="green"
            />
         </div>
         <div className="mb-5">
         <Table
               headers={["Correo electrónico", "Nombre", "Acciones"]}
               data={contactos}
            />
         </div>
           
      </>
   );
}



export default Contactos;
