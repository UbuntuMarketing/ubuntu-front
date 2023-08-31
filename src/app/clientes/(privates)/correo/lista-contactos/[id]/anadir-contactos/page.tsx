import Title from "@/app/clientes/components/Title";
import strapiFetch from "@/helpers/fetcher";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { cookies } from "next/headers";
import AnadirContacto from "./AnadirContacto";

const getContactos = async (
   idLista: string
): Promise<StrapiResponse<IContacto[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({
      url: `/contactos?populate=lista_contactos`,
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
   const { data } = await getContactos(params.id);
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
