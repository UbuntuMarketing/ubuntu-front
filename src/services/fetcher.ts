import { API_HOST } from "@/config";
import { ILoginReponse } from "@/interfaces/auth.interfaces";
import { IStrapiError } from "@/interfaces/strapi.interface";

const BASE_URL = API_HOST;
// Función para hacer una petición POST
async function post(url: string, data: any) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    const resError = json as IStrapiError;
    throw new Error(resError.error?.message ?? 'Ocurrió un error inesperado');
}
  return json;
}

// Función para hacer una petición GET
async function get(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });

  const json = await res.json();

  if (!res.ok) {
    const resError = json as IStrapiError;
    throw new Error(resError.error?.message ?? 'Ocurrió un error inesperado');
}
  return json;
}

// Función para hacer una petición PUT
async function put(url: string, data: any) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();

  if (!res.ok) {
    const resError = json as IStrapiError;
    throw new Error(resError.error?.message ?? 'Ocurrió un error inesperado');
}
  return json;
}

// Función para hacer una petición DELETE
async function remove(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });

  const json = await res.json();

  if (!res.ok) {
    const resError = json as IStrapiError;
    throw new Error(resError.error?.message ?? 'Ocurrió un error inesperado');
}
  return json;
}

const getToken = () : string=> {
  const userStoraged = localStorage.getItem('user');
  if(userStoraged){
    const user = JSON.parse(userStoraged) as ILoginReponse;
    return user.jwt;
  }
  return '';
}

const fetcher = { post, get, put, remove };

export default fetcher;