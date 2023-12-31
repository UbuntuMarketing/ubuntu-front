import { API_HOST } from "@/config";
import { IStrapiError } from "@/interfaces/strapi.interface";
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
        const body = await request.json();
        const cookiesStore = cookies();
       const res = await fetch(`${API_HOST}/auth/local`, {
           method: "POST",
           headers: {
              "Content-Type": "application/json",
           },
           body: JSON.stringify(body),
        });
        console.log('res: ', res )
        const json = await res.json();
        console.log('json: ', json);
        if(!res.ok){
            const error = json as IStrapiError;
            return NextResponse.json(error, {status: error.error.status})
        }
        cookiesStore.set({name:'jwt', value: json.jwt});
        return NextResponse.json(json);     
}

