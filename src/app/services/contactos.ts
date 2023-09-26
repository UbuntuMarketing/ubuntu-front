import strapiFetch from "@/helpers/fetcher";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { getOneService, getService } from "@/interfaces/services";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { cookies } from "next/headers";


/** Services Server Components */
export const getContacto = async ({id, queries = ''}: getOneService): Promise<StrapiResponse<IContacto>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/contactos/${id}?${queries}`, token, cache: "no-store" });
};

export const getContactos = async ({queries= ''} : getService): Promise<StrapiResponse<IContacto[]>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({ url: `/contactos?${queries}`, token, cache: "no-store" });
 };
 