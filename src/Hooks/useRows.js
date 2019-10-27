import { useState, useEffect } from "react";
import blankRowHelper from "/src/BlankRow/helper";
import validationHelper from "/src/Validation/helper";

const useRows = (initialRows, columns) => {
  const [rows, setRows] = useState(initialRows);

  const applyBlankRow = () => {
    if (blankRowHelper.doesBlankRowExistInRows(rows, columns)) {
      return;
    }
    const newRow = blankRowHelper.generateBlankRow(columns);
    addRow(newRow);
  };

  useEffect(applyBlankRow);

  function applyValidation() {
    const newRows = validationHelper.applyValidation([...rows]);
    setRows(newRows);
    return newRows;
  }

  function changeValue(rowIndex, key, desiredValue) {
    const newRows = [...rows];
    newRows[rowIndex][key] = desiredValue;
    setRows(newRows);
  }

  function removeRow(rowIndex) {
    const newRows = [...rows];
    newRows.splice(rowIndex, 1);
    setRows(newRows);
  }

  function addRow(newRow) {
    const newRows = [...rows];
    newRows.push(newRow);
    setRows(newRows);
  }

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
