import { useState } from "react";
import validationHelper from "/src/Validation/helper";

const useRows = initialRows => {
  const [rows, setRows] = useState(initialRows);

  const applyValidation = () => {
    const newRows = validationHelper.applyValidation([...rows]);
    setRows(newRows);
    return newRows;
  };

  const changeValue = (rowIndex, key, desiredValue) => {
    const newRows = [...rows];
    newRows[rowIndex][key] = desiredValue;
    setRows(newRows);
  };

  const removeRow = rowIndex => {
    const newRows = [...rows];
    newRows.splice(rowIndex, 1);
    setRows(newRows);
  };

  const addRow = newRow => {
    const newRows = [...rows];
    newRows.push(newRow);
    setRows(newRows);
  };

  return {
    rows,
    setRows,
    applyValidation,
    addRow,
    removeRow,
    changeValue
  };
};

export default useRows;
