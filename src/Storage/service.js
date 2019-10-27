import blankRowHelper from "/src/BlankRow/helper";

const getDictionaryIndexInDictionaries = (dictionaries, dictionary) => {
  return dictionaries.findIndex(existingDictionary => {
    return existingDictionary.id === dictionary.id;
  });
};

const storeData = state => {
  localStorage.getItem("bgcolor");
};

const getDictionaries = () => {
  if (!localStorage) {
    return null;
  }
  const storedDictionaries = JSON.parse(localStorage.getItem("dictionaries"));

  // convert validation to Set

  return storedDictionaries;
};

const formatValidationDataForSave = dictionaries => {
  return dictionaries.map(dictionary => {
    let newDictionary = { ...dictionary };
    newDictionary.data = dictionary.data.map(row => {
      let formattedValidation = [...row.validation];
      let newRow = { ...row };
      newRow.validation = formattedValidation;
      return newRow;
    });
    return newDictionary;
  });
};

const saveDictionary = (dictionaries, dictionary, rows) => {
  const dictionaryIndex = getDictionaryIndexInDictionaries(
    dictionaries,
    dictionary
  );

  rows = blankRowHelper.removeBlankRow(rows);
  dictionary.data = rows;

  if (dictionaryIndex > -1) {
    dictionaries.splice(dictionaryIndex, 1, dictionary);
  } else {
    dictionary.id = dictionaries.length + 1;
    dictionaries.push(dictionary);
    dictionary = dictionaries[dictionaries.length - 1];
  }

  dictionaries = formatValidationDataForSave(dictionaries);
  const stringDictionaries = JSON.stringify(dictionaries);
  localStorage.setItem("dictionaries", stringDictionaries);
  return [dictionary, dictionaries];
};

export default {
  storeData,
  saveDictionary,
  getDictionaries
};
