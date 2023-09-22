import React from 'react'
import strapiFetch from "@/helpers/fetcher";
import { ICategoria } from '@/interfaces/categorias.interfaces';
import { cookies } from "next/headers";
import { StrapiResponse } from '@/interfaces/strapi.interface';
import Title from '@/app/clientes/components/Title';
import LinkButton from '@/app/clientes/components/LinkButton';
import Table from '@/app/clientes/components/Table';
import AccionesCategoria from './AccionesCategoria';


const getCategorias = async (): Promise<StrapiResponse<ICategoria[]>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/categorias?pagination[pageSize]=10000`, token, cache: "no-store" });
 };
 
async function page() {
    const res = await getCategorias();
    const {data} = res;
    const categorias = data.map( categoria => [
        categoria.attributes.nombre.toLowerCase(),
        <AccionesCategoria id={categoria.id} key={categoria.id}/>
    ])
    
  return (
    <>
    <Title title="Categorias" />
    <div className="my-5 flex justify-end">
       <LinkButton
          href="/clientes/correo/categorias/nueva"
          label="Añadir"
          buttonType="green"
       />
    </div>
    <div className="mb-5">
    <Table
          headers={["Nombre", "Acciones"]}
          data={categorias}
       />
    </div>
      
 </>
  )
}

export default page