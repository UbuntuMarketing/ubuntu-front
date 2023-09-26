import strapiFetch from "@/helpers/fetcher";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import { getOneService, getService } from "@/interfaces/services";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { cookies } from "next/headers";

/** Service Server Components */

export const getLista = async ({id,queries = ''} : getOneService): Promise<StrapiResponse<IListaContacto>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({
       url: `/lista-contactos/${id}?${queries}`,
       token,
       cache: "no-store",
    });
 };

 export const getListas = async ({queries = ''}: getService): Promise<StrapiResponse<IListaContacto[]>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({
       url: `/lista-contactos?${queries}`,
       token,
       cache: "no-store",
    });
 };