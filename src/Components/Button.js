import styled from "styled-components";
import styles from "/src/styles/constants";

const Button = styled.button`
  display: flex;
  margin-left: -${styles.inputAlignOffset}rem;
  padding-left: ${styles.inputAlignOffset}rem;
  background: none;
  outline: none;
  border: 1px solid lightslategrey;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border-color: ${styles.colors.primary};
  }
`;

export default Button;
