import Title from "@/app/clientes/components/Title";
import Link from "next/link";
import FormTemplate from "./FormTemplate";

function page({
    params,
 }: {
    params: {
       id: string;
    };
 }) {

   return (
      <div>
         <Title title="Cargar contactos desde archivo" />
         <div className="my-6">
            <span>
               Puede subir contactos de manera masiva desde un archivo excel,
               para conseguirlo es necesario que descargue el{" "}
               <Link href="/templateContactos.xlsx" className=" text-blue-500 underline ">template</Link>, lo complete y lo suba en el
               siguiente formulario:
            </span>
         </div>

         <FormTemplate listId={params.id}/>
      </div>
   );
}

export default page;
