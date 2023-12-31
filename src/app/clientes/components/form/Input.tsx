import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   error?: string;
   classContainer?: string;
}

function Input({ label, error, classContainer = '', id, ...props }: InputProps) {
   return !error ? (
      <div className={classContainer}>
         <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900"
         >
            {label}
         </label>
         <input
            {...props}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id={id}
         />
      </div>
   ) : (
      <div>
         <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-red-700 "
         >
            {label}
         </label>
         <input
            id={id}
            {...props}
            className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            
         />
         <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {error}
         </p>
      </div>
   );
}

export default Input;
