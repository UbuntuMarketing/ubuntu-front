import Title from '@/app/clientes/components/Title';
import React from 'react'
import FormContacto from '../FormContacto';
import { cookies } from 'next/headers';
import { StrapiResponse } from '@/interfaces/strapi.interface';
import { IContacto } from '@/interfaces/contactos.interfaces';
import strapiFetch from '@/helpers/fetcher';

const getContacto = async (id:string | number): Promise<StrapiResponse<IContacto>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/contactos/${id}`, token, cache: "no-store" });
 };

async function page({
    params,
 }: {
    params: {
       id: string;
    };
 }) {
    const res = await getContacto(params.id);
    const contacto = res.data;
    
  return (
    <>
    <Title title="Editar Contacto" />
    <FormContacto contacto={contacto}/>
 </>
  )
}

export default page