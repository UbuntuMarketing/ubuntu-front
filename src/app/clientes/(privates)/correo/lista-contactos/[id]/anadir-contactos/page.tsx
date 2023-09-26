import Title from "@/app/clientes/components/Title";
import AnadirContacto from "./AnadirContacto";
import { getContactos } from "@/app/services/contactos";

async function page({
   params,
}: {
   params: {
      id: string;
   };
}) {
   const { data } = await getContactos({queries: 'pagination[pageSize]=10000&populate=lista_contactos'});
   const contactosNotOnList = data.filter((contacto) =>
      contacto.attributes.lista_contactos?.data.every(
         (lista) => lista.id.toString() != params.id
      )
   ); 

   return (
      <>
         <Title title="Añadir contactos a lista" />
         <AnadirContacto contactosNotOnList={contactosNotOnList} idTable={params.id}/>   
      </>
   );
}

export default page;
