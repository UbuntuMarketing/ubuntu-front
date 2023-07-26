'use server'
import { cookies } from 'next/headers'

export async function addToken(token: string) {
  cookies().set('token', token)
}