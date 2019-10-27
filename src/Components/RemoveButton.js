import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  align-items: center;
  color: grey;
  /* color: darkred; */
  cursor: pointer;
`;

const RemoveButton = props => {
  let { onClick, isLastRow } = props;
  if (isLastRow) {
    return null;
  }
  return <StyledButton onClick={onClick}>❌</StyledButton>;
};

export default RemoveButton;
