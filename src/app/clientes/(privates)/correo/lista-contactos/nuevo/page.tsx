import Title from "@/app/clientes/components/Title";
import FormLista from "../FormLista";
import { getContactos } from "@/app/services/contactos";

async function Page() {
   const { data: contactos } = await getContactos({queries: 'pagination[pageSize]=10000'});
   return (
      <>
         <Title title="Nueva Lista" />
         <FormLista contactos={contactos}/>
      </>
   );
}

export default Page;
