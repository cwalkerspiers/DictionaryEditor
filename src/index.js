// todo checklist

// get local storage service functional, make a hook for fetching dictionaries from it on app load
// fix positioning of Add button
// order the validation strip colours by severity
// change if's in validatin helpers.
// post to github
// amend Readme.

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import storageService from "/src/Storage/service";
import DictionarySelector from "./Components/DictionarySelector";
import DictionaryEditor from "./Components/DictionaryEditor";
import GridRow from "./Components/GridRow";
import Input from "./Components/Input";
import Button from "./Components/Button";
import storedDictionaries from "./data/dictionaries";
import useRows from "/src/Hooks/useRows";
import validationHelper from "/src/Validation/helper";
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
const SaveText = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const NameInput = styled(Input)`
  font-size: 1rem;
  width: 100%;
`;
const defaultSelection = {
  name: "",
  data: [{ domain: "", range: "", validation: [] }]
};

function App() {
  let [dictionaries, setDictionaries] = useState(
    storageService.getDictionaries() || storedDictionaries
  );
  let [dictionary, setDictionary] = useState({});
  let [saveMessage, setSaveMessage] = useState("");

  const columns = Object.keys(defaultSelection.data[0]).map(column => {
    return {
      id: column
    };
  });

  const rowState = useRows([...defaultSelection.data], columns);

  const setSuccessMessage = () => {
    setSaveMessage("You have successfully saved your template.");
    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const handleSaveClick = () => {
    let newRows = rowState.applyValidation();
    let validationText = validationHelper.getValidationBlockerText(
      newRows,
      dictionary
    );

    if (validationText) {
      setSaveMessage(validationText);
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
        <SaveText>{saveMessage}</SaveText>
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
