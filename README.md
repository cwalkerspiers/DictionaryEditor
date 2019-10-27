# Dictionary Editor

## Purpose

To demonstrate an ES6, custom hook and CSS-in-JS implementation of a dictionary editing application.

To see this running please [open in Codesandbox]('https://codesandbox.io/s/github/cwalkerspiers/DictionaryEditor/')

## Technical Details

- ES6
- CSS-in-JS (Styled-components)
- React 16 custom hooks
- react-select

## Issues & Future Developments

- fix render flashing caused by the useEffect logic in useRows. (this is noticable upon save)
- provide further information to the user in regards to the links between rows that are causing failures during validation. (i.e. 'this row is forked with row 7');
- create id's for dictionaries that are not dependant on no dictionaries being removed.
- allow for the removal of dictionaries.
- improve validation UX - highlight problem areas (e.g. highlight the name field if the user hasn't entered a name on save)
