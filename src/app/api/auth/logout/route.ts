import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookiesStore = cookies();
    cookiesStore.set('jwt', '')
    return NextResponse.json({});  
}