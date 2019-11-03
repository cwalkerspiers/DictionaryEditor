import React from "react";
import styled from "styled-components";
import RemoveButton from "./RemoveButton";
import Input from "./Input";
import RowValidation from "./RowValidation";

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Column = styled.div`
  display: flex;
  width: 140px;
`;

const isLastRow = (rows, rowIndex) => {
  return rows.length === rowIndex + 1;
};

const DictionaryEditor = props => {
  let { rows, onValueChange, removeRow } = props;

  if (!rows || !rows.length) {
    return null;
  }

  const renderRows = (rows, renderCallback) => {
    return rows.map((row, rowIndex) => {
      const changeDomain = e => {
        onValueChange(rowIndex, "domain", e.target.value);
      };
      const changeRange = e => {
        onValueChange(rowIndex, "range", e.target.value);
      };
      const remove = () => {
        removeRow(rowIndex);
      };
      return renderCallback(row, rowIndex, changeDomain, changeRange, remove);
    });
  };

  if (!rows) {
    return null;
  }

  return (
    <div>
      <Row>
        <Column>Domain</Column>
        <Column>Range</Column>
      </Row>
      {renderRows(
        rows,
        (row, rowIndex, changeDomain, changeRange, removeRow) => (
          <Row key={rowIndex}>
            <Column>
              <Input value={row.domain} onChange={changeDomain} />
            </Column>
            <Column>
              <Input value={row.range} onChange={changeRange} />
            </Column>
            {!isLastRow(rows, rowIndex) && <RemoveButton onClick={removeRow} />}
            <RowValidation row={row} />
          </Row>
        )
      )}
    </div>
  );
};

export default DictionaryEditor;
