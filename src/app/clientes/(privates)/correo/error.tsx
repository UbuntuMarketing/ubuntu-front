"use client";
import Title from "@/app/clientes/components/Title";
import translate from "@/helpers/translations";
import React from "react";

function error({ error }: { error: Error }) {
   return (
      <div>
         <div
            className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
         >
            <span className="font-medium">Hubo un error: </span> {translate(error.message)}

         </div>
      </div>
   );
}

export default error;
