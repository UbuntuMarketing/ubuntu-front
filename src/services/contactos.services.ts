import { StrapiResponse } from "@/interfaces/strapi.interface";
import fetcher from "./fetcher"
import { IContacto } from "@/interfaces/contactos.interfaces";

export const getContactos = async () : Promise<StrapiResponse<IContacto[]>> => {
    const res = await fetcher.get('/contactos');
    return res;
}