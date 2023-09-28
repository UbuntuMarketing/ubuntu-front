import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Table, { TableProps } from "./Table";
import CheckboxSelection, {
   ICheckboxSelectionProps,
} from "./CheckboxSelection";

interface ISelectionTableProps
   extends Omit<TableProps, "data">,
      Omit<ICheckboxSelectionProps, "id"> {
   data: Array<{
      id: number;
      values: Array<any>;
   }>;
}

function SelectionTable({
   headers,
   data,
   selection,
   setSelection,
   maxHeight,
}: ISelectionTableProps) {

   const [isAllSelected, setIsAllSelected] = useState(false);
   const dataIds = data.map( d => d.id);
   useEffect( () => {
      setIsAllSelected( dataIds.every( id => selection.includes(id)))               
   },[dataIds, selection])   

   const handleSelectAll = (e : React .FormEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;
      if (isChecked) {
         setSelection(prev =>  [...prev, ...dataIds.filter( d => !prev.includes(d) )]);
      }else {
         setSelection(prev => prev.filter( d => !dataIds.includes(d) ));
      }
      setIsAllSelected(isChecked);
   }

   const headersWithCheckbox = [
      <input key="all" checked={isAllSelected} type="checkbox" onChange={handleSelectAll} />,
      ...headers,
   ];

   const dataWithCheckbox = data.map((d) => [
      <CheckboxSelection
         selection={selection}
         setSelection={setSelection}
         id={d.id}
         key={d.id}
      />,
      ...d.values,
   ]);
   return (
      <Table
         headers={headersWithCheckbox}
         data={dataWithCheckbox}
         maxHeight={maxHeight}
      />
   );
}

export default SelectionTable;
