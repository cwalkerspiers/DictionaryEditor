import validationHelper from "/src/Validation/helper";

let dictionaries = [
  {
    id: 1,
    name: "Colours",
    data: [
      {
        domain: "turquoise",
        range: "blue"
      },
      {
        domain: "toffee apple",
        range: "red"
      }
    ]
  },
  {
    id: 2,
    name: "Categories",
    data: [
      {
        domain: "cars",
        range: "automobiles"
      },
      {
        domain: "football",
        range: "soccer"
      },
      {
        domain: "trousers",
        range: "pants"
      }
    ]
  },
  {
    id: 3,
    name: "Broken",
    data: [
      {
        domain: "sweets",
        range: "chocolate"
      },
      {
        domain: "sweets",
        range: "candy"
      },
      {
        domain: "chocolate",
        range: "desert"
      },
      {
        domain: "sweets",
        range: "chocolate"
      },
      {
        domain: "desert",
        range: "cake"
      },
      {
        domain: "sweets",
        range: "treats"
      },
      {
        domain: "cake",
        range: "desert"
      },
      {
        domain: "toiletries",
        range: "shampoo"
      }
    ]
  }
];

dictionaries = dictionaries.map(dictionary => {
  let newData = validationHelper.resetValidation(dictionary.data);
  let newDictionary = { ...dictionary };
  newDictionary.data = newData;
  return newDictionary;
});

export default dictionaries;
