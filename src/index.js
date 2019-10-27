import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import storageService from "/src/Storage/service";
import DictionarySelector from "./Components/DictionarySelector";
import DictionaryEditor from "./Components/DictionaryEditor";
import GridRow from "./Components/GridRow";
import Input from "./Components/Input";
import Button from "./Components/Button";
import SaveText from "./Components/SaveText";
import storedDictionaries from "./data/dictionaries";
import useRows from "/src/Hooks/useRows";
import validationHelper from "/src/Validation/helper";
import blankRowHelper from "/src/BlankRow/helper";
import styled from "styled-components";
import styles from "/src/styles/constants";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  font-family: sans-serif;
`;
const AppContent = styled.div`
  width: 550px;
`;
const AppH1 = styled.h1`
  display: flex;
  color: ${styles.colors.primary};
`;
const IntroText = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 2rem;
  color: ${styles.colors.primary};
`;
const Divider = styled.hr`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;
const NameInput = styled(Input)`
  font-size: 1rem;
  width: 100%;
`;
const defaultSelection = {
  name: "",
  data: [{ domain: "", range: "", validation: [] }]
};
const defaultSaveMessage = {
  status: "",
  message: ""
};

function App() {
  let [dictionaries, setDictionaries] = useState(
    storageService.getDictionaries() || storedDictionaries
  );
  let [dictionary, setDictionary] = useState({});
  let [saveMessage, setSaveMessage] = useState(defaultSaveMessage);

  const columns = Object.keys(defaultSelection.data[0]).map(column => {
    return {
      id: column
    };
  });

  const rowState = useRows([...defaultSelection.data], columns);

  if (!blankRowHelper.doesBlankRowExistInRows(rowState.rows, columns)) {
    const newRow = blankRowHelper.generateBlankRow(columns);
    rowState.addRow(newRow);
  }

  const setSuccessMessage = () => {
    setSaveMessage({
      status: "success",
      message: "You have successfully saved your template."
    });
    setTimeout(() => {
      setSaveMessage(defaultSaveMessage);
    }, 3000);
  };

  const handleSaveClick = () => {
    let newRows = rowState.applyValidation();
    let validationText = validationHelper.getValidationBlockerText(
      newRows,
      dictionary
    );

    if (validationText) {
      setSaveMessage({ status: "error", message: validationText });
      return;
    }

    const [newDictionary, newDictionaries] = storageService.saveDictionary(
      [...dictionaries],
      { ...dictionary },
      [...rowState.rows]
    );

    setSuccessMessage();
    setDictionary(newDictionary);
    setDictionaries(newDictionaries);
  };

  return (
    <StyledApp className="App">
      <AppContent>
        <AppH1>Edit Dictionary</AppH1>
        <Divider />
        <IntroText>
          Please select an existing dictionary or add a new dictionary.
        </IntroText>
        <DictionarySelector
          dictionaries={dictionaries}
          dictionary={dictionary}
          defaultSelection={defaultSelection}
          title={"Select an existing dictionary to edit"}
          onChange={newDictionary => {
            setDictionary(newDictionary);
            rowState.setRows(newDictionary.data);
            setSaveMessage("");
          }}
        />
        {dictionary && (
          <GridRow>
            <NameInput
              placeholder="Dictionary name"
              value={dictionary && dictionary.name}
              title="Edit dictionary name"
              onChange={e => {
                let newSelection = { ...dictionary };
                newSelection.name = e.target.value;
                setDictionary(newSelection);
              }}
            />
          </GridRow>
        )}
        <Divider />
        {rowState.rows && (
          <DictionaryEditor
            rows={rowState.rows}
            columns={columns}
            removeRow={rowState.removeRow}
            onValueChange={(rowIndex, key, desiredValue) => {
              rowState.changeValue(rowIndex, key, desiredValue);
            }}
          />
        )}

        <Button
          title="Click to save dictionary changes"
          onClick={handleSaveClick}
        >
          Save
        </Button>
        <SaveText status={saveMessage.status}>{saveMessage.message}</SaveText>
        <Button
          onClick={() => {
            localStorage.clear();
            setDictionaries(storedDictionaries);
            setDictionary(defaultSelection);
            rowState.setRows(defaultSelection.data);
          }}
          title="Click to reset all changes and remove stored data"
        >
          Reset stored data
        </Button>
      </AppContent>
    </StyledApp>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
