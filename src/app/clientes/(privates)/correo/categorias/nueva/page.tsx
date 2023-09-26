import Title from '@/app/clientes/components/Title'
import React from 'react'
import FormAddCategory from '../FormCategory'
import { getContactos } from '@/app/services/contactos';
 
async function page() {
    const {data : contactos } = await getContactos({queries: 'pagination[pageSize]=10000'});

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