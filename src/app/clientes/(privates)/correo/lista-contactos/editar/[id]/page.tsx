import Title from '@/app/clientes/components/Title';
import React from 'react'
import { cookies } from 'next/headers';
import { StrapiResponse } from '@/interfaces/strapi.interface';
import strapiFetch from '@/helpers/fetcher';
import FormLista from '../../FormLista';
import { IListaContacto } from '@/interfaces/listaContactos.interfaces';
import { IContacto } from '@/interfaces/contactos.interfaces';

const getLista = async (id:string | number): Promise<StrapiResponse<IListaContacto>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/lista-contactos/${id}`, token, cache: "no-store" });
 };

async function page({
    params,
 }: {
    params: {
       id: string;
    };
 }) {
    const res = await getLista(params.id);
    const lista = res.data;

  return (
    <>
    <Title title="Editar Lista Contactos" />
    <FormLista lista={lista}/>
 </>
  )
}

export default page