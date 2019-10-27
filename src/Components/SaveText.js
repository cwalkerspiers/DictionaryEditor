import styled from "styled-components";
import styles from "/src/styles/constants";

const statusColorMap = {
  error: styles.colors.red(1),
  success: "green"
};

const SaveText = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: ${props => statusColorMap[props.status]};
`;

export default SaveText;
