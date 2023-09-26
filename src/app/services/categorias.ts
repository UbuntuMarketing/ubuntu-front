import strapiFetch from "@/helpers/fetcher";
import { ICategoria } from "@/interfaces/categorias.interfaces";
import { getOneService, getService } from "@/interfaces/services";
import { StrapiResponse } from "@/interfaces/strapi.interface";
import { cookies } from "next/headers";

/** Service Server Components */
export const getCategoria = async ({id,queries = ''} : getOneService): Promise<StrapiResponse<ICategoria>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({
       url: `/categorias/${id}?${queries}`,
       token,
       cache: "no-store",
    });
 };

 export const getCategorias = async ({queries = ''}: getService): Promise<StrapiResponse<ICategoria[]>> => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get("jwt")?.value;
    return strapiFetch({
       url: `/categorias?${queries}`,
       token,
       cache: "no-store",
    });
 };