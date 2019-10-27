import React from "react";
import Select from "./Select";
import GridRow from "./GridRow";
import Button from "./Button";

import styled from "styled-components";

const AddButton = styled(Button)`
  display: flex;
  width: 80px;
  justify-content: center;
  height: 1.5rem;
  text-align: center;
`;

const DictionarySelector = props => {
  const { onChange, dictionaries, dictionary } = props;
  const options = dictionaries.map(dictionary => {
    return {
      id: dictionary.id,
      label: dictionary.name,
      value: dictionary.name
    };
  });

  const getSelected = () => {
    if (!dictionary) {
      return {};
    }
    return options.find(option => option.id === dictionary.id);
  };

  const selected = getSelected() || {};

  return (
    <>
      <GridRow>
        <Select
          options={options}
          onChange={option => {
            let dictionary = dictionaries.find(
              dictionary => dictionary.id === option.id
            );
            onChange({ ...dictionary });
          }}
          value={selected}
        />
        or
        <AddButton
          onClick={() => {
            onChange({ ...props.defaultSelection });
          }}
          title="Click to start editing a new dictionary"
        >
          Add new
        </AddButton>
      </GridRow>
    </>
  );
};

export default DictionarySelector;
