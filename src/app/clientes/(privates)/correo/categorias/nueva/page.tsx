import Title from '@/app/clientes/components/Title'
import React from 'react'
import FormAddCategory from '../FormCategory'
import { cookies } from 'next/headers';
import { StrapiResponse } from '@/interfaces/strapi.interface';
import { IContacto } from '@/interfaces/contactos.interfaces';
import strapiFetch from '@/helpers/fetcher';

const getContactos = async (): Promise<StrapiResponse<IContacto[]>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/contactos?pagination[pageSize]=10000`, token, cache: "no-store" });
 };
 
async function page() {
    const {data : contactos } = await getContactos();

  return (
    <>
         <Title title="Nueva Categoria" />
         <FormAddCategory
            contactos={contactos}
         />
      </>
  )
}

export default page