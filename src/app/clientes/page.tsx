import { redirect } from "next/navigation";
import Login from "./Login";
import { cookies } from 'next/headers'

const getAuth = () => {
   const cookieStore = cookies();   
   if(cookieStore.get('jwt')?.value){
      redirect('/clientes/correo');
   }
}

function Page() {
   getAuth();

   return (
      <div className="w-full min-h-screen bg-slate-900">
         <div className="container min-h-screen m-auto flex items-center">
            <Login/>
         </div>
      </div>
   );
}

export default Page;
