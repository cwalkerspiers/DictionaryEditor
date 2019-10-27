import React from "react";
import ReactSelect from "react-select";

const styles = {
  container: (provided, state) => ({
    ...provided,
    border: "none",
    padding: "1px",
    marginLeft: "-0.7rem"
  })
};

const Select = props => {
  return <ReactSelect styles={styles} {...props} />;
};

export default Select;
