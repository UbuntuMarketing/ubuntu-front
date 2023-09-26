import Title from '@/app/clientes/components/Title';
import React from 'react'
import FormContacto from '../FormContacto';
import {getContacto} from '@/app/services/contactos';
import { getCategorias } from '@/app/services/categorias';
import { getListas } from '@/app/services/listasContactos';


async function page({
    params,
 }: {
    params: {
       id: string;
    };
 }) {
    const [{data: categorias}, {data: listas}, {data: contacto}] = await Promise.all([getCategorias({}), getListas({}), getContacto({id: params.id, queries:'populate=categorias&populate=lista_contactos'})])
    
  return (
    <>
    <Title title="Editar Contacto" />
    <FormContacto contacto={contacto} listaContactos={listas} categorias={categorias}/>
 </>
  )
}

export default page