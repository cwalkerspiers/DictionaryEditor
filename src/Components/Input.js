import styled from "styled-components";
import styles from "/src/styles/constants";

const offset = "0.4";

const Input = styled.input`
  border: 1px solid lightgray;
  border-radius: 3px;
  border-bottom: none;
  border-top: none;
  border-right: none;
  /* padding-left: 0.5rem; */
  margin-left: -${styles.inputAlignOffset}rem;
  padding-left: ${offset}rem;
  padding-right: ${offset}rem;
  box-sizing: border-box;
  height: 2rem;
  width: 100%;
  &:active {
    /* border: 2px red solid; */
  }
  &:focus {
    border-left-color: ${styles.colors.primary};
    outline: none;
  }
`;

export default Input;
