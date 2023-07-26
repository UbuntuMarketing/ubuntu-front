import React from "react";
import Table from "@/app/clientes/components/Table";
import Button from "@/app/clientes/components/Button";
// import { getContactos } from "@/services/contactos.services";
import { cookies } from 'next/headers'
import { API_HOST } from "@/config";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { IContacto } from "@/interfaces/contactos.interfaces";

const getContactos = async () : Promise<StrapiResponse<IContacto[]>>=> {
   const cookieStore = cookies()
   const token = cookieStore.get('jwt')?.value
   const res = await fetch(`${API_HOST}/contactos`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });
   const data = await res.json();
   return data;
}

async function Contactos() {
   const {data} = await getContactos();
   const contactos = data.map((contacto) => [contacto.attributes.email, contacto.attributes.nombre])
   
   return (
      <div className="py-3 px-12">
         <h2 className="text-center text-3xl font-bold">Contactos</h2>
         <div className="my-5 flex justify-end">
            <Button label='Añadir' buttonType="green"/>
         </div>
         <div className="">
            <Table
               headers={["Correo electrónico", "Nombre"]}
               data={[...contactos]}

            />
         </div>
      </div>
   );
}

export default Contactos;
