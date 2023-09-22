import Title from '@/app/clientes/components/Title';
import strapiFetch from '@/helpers/fetcher';
import { ICategoria } from '@/interfaces/categorias.interfaces';
import { IContacto } from '@/interfaces/contactos.interfaces';
import { StrapiResponse } from '@/interfaces/strapi.interface';
import { cookies } from 'next/headers';
import React from 'react'
import FormCategory from '../FormCategory';

const getContactos = async (): Promise<StrapiResponse<IContacto[]>> => {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get("jwt")?.value;
  return strapiFetch({ url: `/contactos?pagination[pageSize]=10000`, token, cache: "no-store" });
};

const getCategoria = async (id: number | string): Promise<StrapiResponse<ICategoria>> => {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get("jwt")?.value;
  return strapiFetch({ url: `/categorias/${id}?populate=contactos`, token, cache: "no-store" });
}

async function page({
  params,
}: {
  params: {
     id: string;
  };
}) {
  const [{data: contactos}, {data: categoria}] = await Promise.all([getContactos(), getCategoria(params.id)]); 

  return (
    <>
      <Title title='Editar Categoría'/>
      <FormCategory contactos={contactos} categoria={categoria}/>
    </>
  )
}

export default page