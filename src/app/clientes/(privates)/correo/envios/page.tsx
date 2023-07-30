import Table from "@/app/clientes/components/Table";
import Title from "@/app/clientes/components/Title";
import Input from "@/app/clientes/components/form/Input";
import React from "react";

function page() {
   return (
      <>
         <Title title="Crear campaña" />
         <form className="mt-5">
            <h3 className="text-lg">Información</h3>
            <Input label="Asunto" classContainer="my-4" />
            <Input label="Nombre Remitente" classContainer="my-4" />

            <h3 className="text-lg mb-5">Correos</h3>
            <div className="grid grid-cols-3 items-center">
               <div className="col-span-2 grid grid-cols-2 items-center">                    
                    <Input label="Correo electrónico" classContainer="" />
                    <p className="t translate-y-3 ml-2">@dominio.com</p>                   
               </div>
               <div className="h-full flex flex-col justify-end">
                <div>
                  <input type="radio" name="tipoCorreo" id="dominio" className='mr-2' />
                    <label>Usar Dominio</label>
                </div>
                <div>
                  <input type="radio" name="tipoCorreo" id="correo"  className='mr-2'/>
                    <label>Usar Correo Electrónico</label>
                </div>
               </div>
            </div>

            <h3 className="text-lg my-5">Destinatarios</h3>
            <select className="mb-5">
                <option value="1">Lista de Contactos</option>
                <option value="2">Contactos</option>
            </select>
            <Table
               headers={["Nombre Lista", "Cantidad contactos"]}
               data={[['.','.']]}
            />
         </form>
      </>
   );
}

export default page;
