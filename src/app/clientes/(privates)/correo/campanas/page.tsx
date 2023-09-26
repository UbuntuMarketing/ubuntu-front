import LinkButton from "@/app/clientes/components/LinkButton";
import Table from "@/app/clientes/components/Table";
import Title from "@/app/clientes/components/Title";
import strapiFetch from "@/helpers/fetcher";
import { ICampania } from "@/interfaces/campania.interfaces";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import {BiMailSend} from 'react-icons/bi'

const getCampanias = async (): Promise<StrapiResponse<ICampania[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({ url: `/campanas`, token, cache: "no-store" });
};

async function page() {
   const { data } = await getCampanias();
   const dataCampanias = data.map((c) => [
      c.attributes.asunto,
      c.attributes.nombreRemitente,
      c.attributes.correoRemitente,
      format(new Date(c.attributes.createdAt), "dd-MM-yyyy"),
      <Link
         className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
         href={`/clientes/correo/campanas/${c.id}`}
         key={c.id}
      >
         Ver
      </Link>,
   ]);

   return (
      <>
         <Title title="Campañas" />
         <div className="flex justify-end my-5">
            <LinkButton href="/clientes/correo/campanas/nueva" label="Crear Campaña" buttonType="green" icon={<BiMailSend/>}/>
         </div>
         <div className="mb-5">
            <Table
               headers={[
                  "Asunto",
                  "Nombre remitente",
                  "Correo remitente",
                  "Creada",
                  "Acciones",
               ]}
               data={dataCampanias}
            />
         </div>
      </>
   );
}

export default page;
