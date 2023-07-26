import Link from "next/link";

interface TableProps {
   headers: string[];
   data: Array<Array<string | number>>;
}

function Table({ headers, data }: TableProps) {
   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  <th scope="col" className="p-4">
                     <div className="flex items-center">
                        <input
                           id="checkbox-all-search"
                           type="checkbox"
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                           htmlFor="checkbox-all-search"
                           className="sr-only"
                        >
                           checkbox
                        </label>
                     </div>
                  </th>
                  {headers.map((header, idx) => (
                     <th scope="col" className="px-6 py-3" key={header + idx}>
                        {header}
                     </th>
                  ))}
                  <th scope="col" className="px-6 py-3" >
                        Acciones
                  </th>
               </tr>
            </thead>

            <tbody>
               {data.map((d, idx) => (
                  <Row data={d} key={idx} />
               ))}
            </tbody>
         </table>
      </div>
   );
}

const Row = ({ data }: { data: Array<string | number> }) => {
   return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td className="w-4 p-4">
            <div className="flex items-center">
               <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
               />
               <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
               </label>
            </div>
         </td>
         {data.map((data, idx) => (
            <td
               scope="row"
               key={data + idx.toString()}
               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
               {data}
            </td>
         ))}
         <td className="flex items-center px-6 py-4 space-x-3">
            <Link
               href="#"
               className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
               Editar
            </Link>
            <Link
               href="#"
               className="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
               Eliminar
            </Link>
         </td>
      </tr>
   );
};

export default Table;
