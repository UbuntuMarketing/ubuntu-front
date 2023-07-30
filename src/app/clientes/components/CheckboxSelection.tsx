import { Dispatch, SetStateAction } from "react";

export interface ICheckboxSelectionProps {
    id: number;
    selection: number[];
    handleSelection: Dispatch<SetStateAction<number[]>>;
 }

function CheckboxSelection({
    id,
    selection,
    handleSelection,
 }: ICheckboxSelectionProps) {
    const isChecked = selection.includes(id);
 
    const handleChange = () => {
       if (isChecked) {
          handleSelection((prevSelection) =>
             prevSelection.filter((idPrevSelection) => idPrevSelection !== id)
          );
       } else {
          handleSelection((prevSelection) => [...prevSelection, id]);
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