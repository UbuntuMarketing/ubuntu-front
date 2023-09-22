import { API_HOST } from "@/config";
import strapiFetch from "@/helpers/fetcher";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const getCountContacts = async (token:string = '') : Promise<number>  => {
   const res = await fetch(`${API_HOST}/contactos/count`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       cache: 'no-cache'
   })
   const quantity = await res.json();
   return quantity;
}
const getCountCampanas = async (token:string = ''): Promise<number> => {
   const res = await fetch(`${API_HOST}/campanas/count`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       cache: 'no-cache'
   })
   const quantity = await res.json();
   return quantity;
}
const getCountLists = async (token:string = '') : Promise<number> => {
   const res = await fetch(`${API_HOST}/lista-contactos/count`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       cache: 'no-cache'
   })
   const quantity = await res.json();
   return quantity;
}

async function Correo() {
   const cookiesStorage = cookies();
   const token = cookiesStorage.get("jwt")?.value;
   const [quantityContacts,  quantityCampanas, quantityLists] = await Promise.all([getCountContacts(token), getCountCampanas(token), getCountLists(token)])
  
   return (
      <div>
         <h1 className="text-slate-900 text-4xl font-bold text-center mb-10">
            ¡Bienvenido!
         </h1>
         <div className="w-full grid justify-center md:grid-cols-3 gap-10">
            <StadisticCard quantity={quantityContacts} label="Contactos" href="/clientes/correo/contactos"/>
            <StadisticCard quantity={quantityLists} label="Listas de contactos" href="/clientes/correo/lista-contactos" />
            <StadisticCard quantity={quantityCampanas} label="Campañas" href="/clientes/correo/campanas" />
         </div>
      </div>
   );
}

const StadisticCard = ({
   quantity,
   label,
   href = '#',
}: {
   quantity: string | number;
   label: string;
    href? :string;
}) => {
   return (
      <Link href={href} className=" flex flex-col items-center justify-center h-48 w-64 md:w-full p-2 border-gray-200 border rounded-2xl shadow-lg select-none">
         <span className="text-6xl text-center font-extrabold text-slate-900">
            {quantity}
         </span>
         <h5 className="text-center translate-y-5 text-xl ">{label}</h5>
      </Link>
   );
};

export default Correo;
