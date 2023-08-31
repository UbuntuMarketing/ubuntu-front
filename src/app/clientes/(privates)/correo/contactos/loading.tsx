import Spinner from "@/app/clientes/components/Spinner";
import React from "react";

function loading() {
   return (
      <div className="w-full mt-28 h-full flex justify-center items-center">
         <Spinner/>
      </div>
   );
}

export default loading;
