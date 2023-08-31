import strapiFetch, { IFetcher } from '@/helpers/fetcher';
import { ILoginReponse } from '@/interfaces/auth.interfaces';
import React from 'react'

interface IFetchCS extends Omit<IFetcher, 'token'>{}

//Fetch data from client side
function useFetch() {
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    async function fetchCS<T>({url, method = 'GET', data} : IFetchCS){
        setError(null);
        setLoading(true);        
        console.log(url)
        try {
            const auth: ILoginReponse = JSON.parse(
                localStorage.getItem("auth") || ""
             );
            
            const res = await strapiFetch<T>({url, method, data, token: auth?.jwt})
            return res;
        } catch (error: any) {
            console.error(error?.message || 'Ocurrió un error inesperado');
            setError(error?.message || 'Ocurrió un error inesperado');
        }finally{
            setLoading(false);
        }
    } 

    return {
        error,
        loading,
        fetchCS
    }
}

export default useFetch