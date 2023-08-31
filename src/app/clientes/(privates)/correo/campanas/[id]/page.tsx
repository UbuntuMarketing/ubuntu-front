import Table from "@/app/clientes/components/Table";
import Title from "@/app/clientes/components/Title";
import Input from "@/app/clientes/components/form/Input";
import strapiFetch from "@/helpers/fetcher";
import { ICampania } from "@/interfaces/campania.interfaces";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { cookies } from "next/headers";
import React from "react";

const getCampania = async (id: number): Promise<StrapiResponse<ICampania>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({
      url: `/campanas/${id}?populate=destinatarios`,
      token,
      cache: "no-store",
   });
};

async function page({
   params,
}: {
   params: {
      id: number;
   };
}) {
   const {
      data: { attributes },
   } = await getCampania(params.id);
   const {
      asunto,
      correoRemitente,
      nombreRemitente,
      destinatarios,
      finished,
      createdAt,
   } = attributes;

   const dataTable = destinatarios.data.map((d) => [
      d.attributes.nombre,
      d.attributes.email,
   ]);

   return (
      <>
         <Title title="Campaña" />
         <Input
            label="Asunto"
            classContainer="my-4"
            name="asunto"
            value={asunto}
            disabled={true}
         />
         <Input
            label="Nombre Remitente"
            classContainer="my-4"
            value={nombreRemitente}
            name="nombreRemitente"
            disabled={true}
         />

<h3 className="text-lg my-5">Correo Remitente</h3>
         <div className="grid grid-cols-3 items-center">
            <div className="col-span-2 grid grid-cols-2 items-center">
               <Input
                  label="Correo electrónico remitente:"
                  name="correoRemitente"
                  classContainer=""
                  value={correoRemitente}
                  disabled={true}
               />
            </div>
         </div>

         <h3 className="text-lg my-5">Información</h3>
         <div className="grid grid-cols-2 gap-6">
            <Input
               label="Creada"
               name="creada"
               classContainer=""
               value={createdAt}
               disabled={true}
            />
            <Input
               label="Estado"
               name="status"
               classContainer=""
               value={finished ? "Finalizada" : "En proceso"}
               disabled={true}
            />
         </div>

      
         <div className="mb-6">
            <h3 className="text-lg my-5">Destinatarios</h3>
            <Table
               headers={["Nombre", "Correo electrónico"]}
               data={dataTable}
            />
         </div>
      </>
   );
}

export default page;
