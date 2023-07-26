import { API_HOST } from "@/config";
import { ILogin } from "@/interfaces/auth.interfaces";
import { IStrapiError } from "@/interfaces/strapi.interface";
import fetcher from "./fetcher";

export const login = async (data: ILogin): Promise<boolean> => {
    const resData = await fetcher.post('/auth/local', data);
    localStorage.setItem('user', JSON.stringify(resData.user));
    return true;
}