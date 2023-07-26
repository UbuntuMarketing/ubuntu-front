import React from "react";
import Table from "@/app/clientes/components/Table";

function ListaContactos() {
   return (
      <div className="p-3">
         <h2 className="text-center text-3xl font-bold">Listas de Contactos</h2>
         <div className="p-12">
            <Table
               headers={["Nombre Lista", "Cantidad contactos"]}
               data={[
                  ["Lista 1", 6],
                  ["Lista 2", 2],
               ]}
            />
         </div>
      </div>
   );
}
export default ListaContactos;
