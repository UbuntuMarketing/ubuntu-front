import React from "react";
import Table from "@/app/clientes/components/Table";
import Button from "@/app/clientes/components/Button";
import { getContactos } from "@/services/contactos.services";
import { cookies } from 'next/headers'

async function Contactos() {
   // const {data} = await getContactos();
   const cookieStore = cookies()
   const token = cookieStore.get('token')?.value
   console.log(token)
   return (
      <div className="py-3 px-12">
         <h2 className="text-center text-3xl font-bold">Contactos</h2>
         <div className="my-5 flex justify-end">
            <Button label='Añadir' buttonType="green"/>
         </div>
         <div className="">
            <Table
               headers={["Correo electrónico", "Nombre"]}
               data={[["fedeolivalr2@gmail.com","fede"]]}
              
            />
         </div>
      </div>
   );
}

export default Contactos;
