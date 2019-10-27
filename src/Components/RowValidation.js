import React from "react";
import styled from "styled-components";
import validationHelper from "/src/Validation/helper";
import styles from "/src/styles/constants";

const ValidationStrip = styled.span`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  color: white;
`;
const ValidationTextBlock = styled.span`
  background-color: ${props => styles.colors.red(props.backgroundOpacity)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
const ValidationText = styled.span`
  padding: 0.2rem;
  height: 100%;
`;

const getBackgroundOpacity = validationType => {
  const divisor = validationHelper.validationMap[validationType].priority / 1.5;
  return 1 / divisor;
};

const RowValidation = props => {
  let { row } = props;

  if (!row.validation) {
    return null;
  }
  if (row.validation.size === 0) {
    return null;
  }
  //
  row = validationHelper.sortValidationOfRowByPriority(row);
  const validationTypes = [...row.validation];

  return (
    <ValidationStrip>
      {validationTypes.map(type => {
        return (
          <ValidationTextBlock backgroundOpacity={getBackgroundOpacity(type)}>
            <ValidationText>{type}</ValidationText>
          </ValidationTextBlock>
        );
      })}
    </ValidationStrip>
  );
};

export default RowValidation;
