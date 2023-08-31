'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface TableProps {
   headers: string[];
   data: Array<Array<any>>;
   maxHeight?: number;
}

function Table({ headers, data, maxHeight }: TableProps) {
   const [results, setResults] = useState(data);
   const [query, setQuery] = useState("");

   useEffect( () => {
      const filteredResults = data.filter(row =>
         row.some(cell =>
            String(cell).toLowerCase().includes(query.toLowerCase())
         )
      );
      setResults(filteredResults);
   }, [data, query]);

   return (
      <div className="shadow-md sm:rounded-lg">
        <SearchBar query={query} setQuery={setQuery}/>
        <div className="overflow-auto relative"   style={{ maxHeight: maxHeight ? maxHeight + "px" : "450px" }}>
         <table
            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          
         >
            <thead className="text-xs bg-white text-gray-700 uppercase bg-gray-5 sticky top-0">
               <tr>
                  {headers.map((header, idx) => (
                     <th scope="col" className="px-6 py-3" key={idx}>
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {results.map((d, idx) => (
                  <Row data={d} key={idx} />
               ))}
            </tbody>
         </table>
         </div>
      </div>
   );
}

const SearchBar = ({query, setQuery}: {query: string, setQuery: Dispatch<SetStateAction<string>>}) => (
   <div className="pb-4 bg-white ">
            <label htmlFor="table-search" className="sr-only">
               Search
            </label>
            <div className="relative mt-1">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                     className="w-4 h-4 text-gray-500"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 20 20"
                  >
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                     />
                  </svg>
               </div>
               <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Buscar"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
               />
            </div>
         </div>
)

const Row = ({ data }: { data: Array<string | number> }) => {
   return (
      <tr className="bg-white border-b  hover:bg-gray-50 ">
         {data.map((data, idx) => (
            <td
               scope="row"
               key={idx}
               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
               {data}
            </td>
         ))}
      </tr>
   );
};

export default Table;
