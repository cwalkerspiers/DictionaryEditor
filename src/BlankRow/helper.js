const areRowsValid = function areRowsValid(rows) {
  return rows && Array.isArray(rows) && rows.length;
};

const doesBlankRowExistInRows = (rows, columns) => {
  if (!areRowsValid(rows)) {
    return false;
  }
  let lastRow = rows[rows.length - 1];
  let allValuesBlank = true;
  for (let column of columns) {
    let columnValue = lastRow[column.id];
    if (columnValue && columnValue.length) {
      allValuesBlank = false;
      continue;
    }
  }
  return allValuesBlank;
};

const generateBlankRow = columns => {
  const newRow = {};
  for (let column of columns) {
    newRow[column.id] = "";
  }
  newRow.validation = new Set();
  return newRow;
};

const removeBlankRow = rows => {
  rows.pop();
  return rows;
};

export default {
  doesBlankRowExistInRows,
  generateBlankRow,
  removeBlankRow
};
