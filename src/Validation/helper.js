import blankRowHelper from "/src/BlankRow/helper";

const validationMap = {
  fork: {
    id: "fork",
    priority: 1
  },
  duplicate: {
    id: "duplicate",
    priority: 3
  },
  cycle: {
    id: "cycle",
    priority: 1
  },
  chain: {
    id: "chain",
    priority: 2
  }
};

const blockingPriorities = [1];

const blockingVariationIds = Object.keys(validationMap).filter(key =>
  blockingPriorities.includes(validationMap[key].priority)
);

const findBlockingPrioritiesInRows = rows => {
  const blockingPrioritiesInRows = new Set();
  rows.forEach(row => {
    row.validation.forEach(validationId => {
      if (!blockingVariationIds.includes(validationId)) {
        return;
      }
      blockingPrioritiesInRows.add(validationId);
    });
  });
  return blockingPrioritiesInRows;
};

const getValidationBlockerText = (rows, dictionary) => {
  if (!rows.length) {
    return "Please fill in at least one row to save this dictionary.";
  }
  if (!dictionary.name) {
    return "Please enter a name for your dictionary.";
  }
  const blockingPriorities = findBlockingPrioritiesInRows(rows);
  if (!blockingPriorities.size) {
    return "";
  }

  const validationSpecificText = [...blockingPriorities].reduce(
    (textString, priority, index) => {
      if (index === [...blockingPriorities].length - 1) {
        return `'${textString}' and '${priority}'`;
      }
      return `'${textString}', '${priority}'`;
    }
  );
  return `Please fix the pairs marked with ${validationSpecificText} to continue processing.`;
};

const applyValidationToRows = (rows, indexes, validationKey) => {
  indexes.forEach(rowIndex => {
    rows[rowIndex].validation.add(validationKey);
  });
  return rows;
};

const sortValidationOfRowByPriority = row => {
  let newRow = { ...row };
  let newValidation = [...row.validation];
  newValidation = newValidation.sort((a, b) => {
    return validationMap[a].priority - validationMap[b].priority;
  });
  newRow.validation = new Set(newValidation);
  return newRow;
};

const sortValidationOfRowsByPriority = rows => {
  return rows.map(row => {
    return sortValidationOfRowByPriority(row);
  });
};

const isPairDuplicated = (pair1, pair2) => {
  let set = new Set([pair1.join("-"), pair2.join("-")]);
  if (set.size !== 1) {
    return false;
  }
  return true;
};

const isPairForked = (pair1, pair2) => {
  let map = new Map([pair1, pair2]);
  if (map.size === 1) {
    return true;
  }
  return false;
};

const doPairsCycle = (pair1, pair2) => {
  const pair1Inverted = [pair1[1], pair1[0]];
  if (pair1Inverted.join("-") !== pair2.join("-")) {
    return false;
  }
  return true;
};

const doPairsChain = (pair1, pair2) => {
  if (pair1[0] !== pair2[1] && pair1[1] !== pair2[0]) {
    return false;
  }
  return true;
};

const formatPair = pair => {
  return pair.map(string => {
    return string.toLowerCase().trim();
  });
};

const comparePairs = (keyValuePairs, compareCallback) => {
  keyValuePairs.forEach((pair, pairIndex) => {
    keyValuePairs.forEach((pair2, pair2Index) => {
      const formattedPair = formatPair(pair);
      const formattedPair2 = formatPair(pair2);
      if (pairIndex === pair2Index) {
        return;
      }
      return compareCallback(formattedPair, formattedPair2, pair2Index);
    });
  });
};

const resetValidation = rows => {
  rows.forEach(row => {
    row.validation = new Set();
  });
  return rows;
};

const applyValidation = rows => {
  rows = blankRowHelper.removeBlankRow([...rows]);
  rows = resetValidation(rows);

  const keyValuePairs = rows.map(row => {
    return [row.domain, row.range];
  });

  const validationIndexes = {
    fork: new Set(),
    duplicate: new Set(),
    cycle: new Set(),
    chain: new Set()
  };

  comparePairs(keyValuePairs, (pair, pair2, indexOfComparisonPair) => {
    if (isPairDuplicated(pair, pair2)) {
      validationIndexes["duplicate"].add(indexOfComparisonPair);
    }
    if (isPairForked(pair, pair2)) {
      validationIndexes["fork"].add(indexOfComparisonPair);
    }
    if (doPairsCycle(pair, pair2)) {
      validationIndexes["cycle"].add(indexOfComparisonPair);
      return;
    }
    if (doPairsChain(pair, pair2)) {
      validationIndexes["chain"].add(indexOfComparisonPair);
    }
  });

  for (let validationType in validationIndexes) {
    let indexes = validationIndexes[validationType];
    rows = applyValidationToRows(rows, indexes, validationType);
  }

  rows = sortValidationOfRowsByPriority(rows);

  return rows;
};

export default {
  applyValidation,
  validationMap,
  getValidationBlockerText,
  resetValidation,
  sortValidationOfRowByPriority
};
