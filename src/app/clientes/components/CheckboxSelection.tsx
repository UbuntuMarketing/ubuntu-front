import { Dispatch, SetStateAction } from "react";

export interface ICheckboxSelectionProps {
    id: number;
    selection: number[];
    setSelection: Dispatch<SetStateAction<number[]>>;
 }

function CheckboxSelection({
    id,
    selection,
    setSelection,
 }: ICheckboxSelectionProps) {
    const isChecked = selection.includes(id);
 
    const handleChange = () => {
       if (isChecked) {
          setSelection((prevSelection) =>
             prevSelection.filter((idPrevSelection) => idPrevSelection !== id)
          );
       } else {
          setSelection((prevSelection) => [...prevSelection, id]);
       }
    };
    return (
       <input
          type="checkbox"
          value={id}
          checked={isChecked}
          onChange={handleChange}
       />
    );
 }

 export default CheckboxSelection