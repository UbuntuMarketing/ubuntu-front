import Title from "@/app/clientes/components/Title";
import FormContacto from "../FormContacto";
import { getListas } from "@/app/services/listasContactos";
import { getCategorias } from "@/app/services/categorias";

async function Page() {
   const [{data: categorias}, {data: listas}] = await Promise.all([getCategorias({}), getListas({})])
   return (
      <>
         <Title title="Nuevo Contacto" />
         <FormContacto categorias={categorias} listaContactos={listas}/>
      </>
   );
}

export default Page;
