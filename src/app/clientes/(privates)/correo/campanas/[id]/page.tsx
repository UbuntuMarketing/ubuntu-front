import strapiFetch from '@/helpers/fetcher';
import { ICampania } from '@/interfaces/campania.interfaces';
import { StrapiResponse } from '@/interfaces/strapi.interface';
import { cookies } from 'next/headers';
import React from 'react'

const getCampania = async (): Promise<StrapiResponse<ICampania>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/campanas`, token, cache: "no-store" });
 };

async function page() {
    

  return (
    <div>page</div>
  )
}

export default page