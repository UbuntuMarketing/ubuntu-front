import Title from "@/app/clientes/components/Title";
import { cookies } from "next/headers";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import strapiFetch from "@/helpers/fetcher";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import Table from "@/app/clientes/components/Table";
import { IContacto } from "@/interfaces/contactos.interfaces";
import AccionesContactoEnLista from "./AccionesContactoEnLista";
import {RiFileExcel2Line} from 'react-icons/ri'
import {BsPersonFillAdd, BsFillPencilFill} from 'react-icons/bs'
import LinkButton from "@/app/clientes/components/LinkButton";

const getLista = async (
   id: string | number
): Promise<StrapiResponse<IListaContacto>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({
      url: `/lista-contactos/${id}?populate=contactos`,
      token,
      cache: "no-store",
   });
};

async function page({
   params,
}: {
   params: {
      id: string;
   };
}) {
   const { data } = await getLista(params.id);
   const contactos = data.attributes.contactos?.data as IContacto[];
   const contactosEnLista = contactos.map((contacto) => [
      contacto.attributes.nombre,
      contacto.attributes.email,
      <AccionesContactoEnLista
         idContacto={contacto.id}
         idLista={params.id}
         key={contacto.id}
      />,
   ]);

   return (
      <>
         <Title title={data.attributes.nombre} />
         <div className="my-6 flex justify-between">
            <div className="flex">
               <LinkButton
                  label="Añadir Contactos"
                  href={`./${params.id}/anadir-contactos`}
                  icon={<BsPersonFillAdd/>}
               />
               <LinkButton
                  label="Contactos Desde Archivo"
                  href={`./${params.id}/archivo`}
                  icon={<RiFileExcel2Line />}
               />
            </div>
            <LinkButton
               label="Editar"
               href={`/clientes/correo/lista-contactos/editar/${params.id}`}
               className="bg-green-600"
               icon={<BsFillPencilFill/>}
               iconClass="text-sm"
               
            />
         </div>
         <div className="my-6">
            <Table
               headers={["Nombre", "Correo", "Acciones"]}
               data={contactosEnLista}
            />
         </div>
      </>
   );
}

export default page;
