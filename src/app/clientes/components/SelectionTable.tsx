import React, { Dispatch, SetStateAction } from "react";
import Table, { TableProps } from "./Table";
import CheckboxSelection, { ICheckboxSelectionProps } from "./CheckboxSelection";

interface ISelectionTableProps extends Omit<TableProps, 'data'>, Omit<ICheckboxSelectionProps, 'id'> {
    data: Array<{
        id: number,
        values: Array<any>
    }>
}

function SelectionTable({
   headers,
   data,
   selection,
   setSelection,
   maxHeight
}: ISelectionTableProps) {  

   const headersWithCheckbox = ["#", ...headers];

   const dataWithCheckbox = data.map((d) => [
      <CheckboxSelection
         selection={selection}
         setSelection={setSelection}
         id={d.id}
         key={d.id}
      />,
      ...d.values,
   ]);
   return <Table headers={headersWithCheckbox} data={dataWithCheckbox} maxHeight={maxHeight} />;
}



export default SelectionTable;
