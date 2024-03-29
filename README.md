# Dictionary Editor

## Purpose

To demonstrate an ES6, custom hook and CSS-in-JS implementation of a dictionary editing application.

To see this running in the browser you can open this project in a [Codesandbox](https://codesandbox.io/s/github/cwalkerspiers/DictionaryEditor/).

## Technical Details

- ES6
- CSS-in-JS (Styled-components)
- React 16 custom hooks
- react-select

## Issues & Future Developments

- provide further information to the user in regards to the links between rows that are causing failures during validation. (i.e. 'this row is forked with row 7')
- improve on the UX for selecting or adding a new dictionary (this could be separated into a separate view).
- change the logic responsible for creating ids for dictionaries to be not dependant on dictionaries not being removed.
- allow for the removal of dictionaries.
- improve validation UX - highlight problem areas (e.g. highlight the name field if the user hasn't entered a name on save).
