import Title from "@/app/clientes/components/Title";
import FormLista from "../FormLista";
import { cookies } from "next/headers";
import strapiFetch from "@/helpers/fetcher";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { IContacto } from "@/interfaces/contactos.interfaces";
const getContactos = async (): Promise<StrapiResponse<IContacto[]>> => {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   return strapiFetch({ url: `/contactos`, token, cache: "no-store" });
};
async function Page() {
   const { data: contactos } = await getContactos();
   return (
      <>
         <Title title="Nueva Lista" />
         <FormLista contactos={contactos}/>
      </>
   );
}

export default Page;
