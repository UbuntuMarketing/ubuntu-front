import { API_HOST } from "@/config";
import { ILoginReponse } from "@/interfaces/auth.interfaces";
import { IStrapiError, StrapiResponse } from "@/interfaces/strapi.interface";

const BASE_URL = API_HOST;

export interface IFetcher {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  token?: string;
  cache?: 'no-store' | 'force-cache';
}

async function strapiFetch<T>({ url, method = 'GET', data = {}, token = '', cache= 'force-cache' }: IFetcher): Promise<StrapiResponse<T>> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    cache
  }
  if(method !== 'GET') {
    config.body = JSON.stringify({data});
  }
  const res = await fetch(`${BASE_URL}${url}`, config);
  const json = await res.json();

  if (!res.ok) {
    const resError = json as IStrapiError;
    throw new Error(resError.error?.message ?? 'Ocurrió un error inesperado');
  }
  return json;
}

export default strapiFetch;