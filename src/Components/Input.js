import styled from "styled-components";
import styles from "/src/styles/constants";

const Input = styled.input`
  border: 1px solid lightgray;
  border-radius: 3px;
  border-bottom: none;
  border-top: none;
  border-right: none;
  margin-left: -${styles.inputAlignOffset}rem;
  padding-left: ${styles.inputAlignOffset}rem;
  padding-right: ${styles.inputAlignOffset}rem;
  box-sizing: border-box;
  height: 2rem;
  width: 100%;
  &:focus {
    border-left-color: ${styles.colors.primary};
    outline: none;
  }
`;

export default Input;
