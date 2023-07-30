export interface TableProps {
   headers: string[];
   data: Array<Array<any>>;
}

function Table({ headers, data }: TableProps) {
   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  {headers.map((header, idx) => (
                     <th scope="col" className="px-6 py-3" key={idx}>
                        {header}
                     </th>
                  ))}
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
         {data.map((data, idx) => (
            <td
               scope="row"
               key={idx}
               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
               {data}
            </td>
         ))}
      </tr>
   );
};

export default Table;
