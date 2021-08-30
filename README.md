# useCheatCodes

Implementation of a React Hook to enter cheatcodes on screen.

[Demo available here, try it out! ](https://jraleman.com/useCheatCodes)

Enter the [konami code](https://en.wikipedia.org/wiki/Konami_Code) and see what happens.

## Installation

TBD

## Example

```js
const cheatCodes = [
  {
    name: 'konami',
    code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'B', 'A'], // case insensitive (i.e. ArrowUp === arrowup)
    callback: () => window.alert('🐢'), // optional
  },
  // ... define other cheatCodes
];
const timeout = 10000;
const repeat = false;

const {
  keystrokes,
  activeCheats,
  clearKeystrokes,
  clearActiveCheats,
  getCheatCodeByName,
} = useCheatCodes({ cheatCodes, repeat, timeout });
```

## Specifications

- Hook captures keystrokes using an event listener
- Structure is an array of objects, having the cheatcode's:
  - `name`
  - `code` (keys to input/enter)
  - `callback` function
- Only compare keystrokes with length of the `code` array
- Have a `timeout` to clear keystrokes if user is afk
- Ability to `repeat` cheatcodes multiple times

## Implementation

Returns `activeCheat` codes, current `keystrokes`, and some helper methods.
Take a look at `src/useCheatCodes`.

## TODO

- [x] Create project repository
- [x] Implement `useCheatCodes` following specifications
- [x] Create demo app
- [ ] Open dependency project; `hooks` -> `@jraleman/hooks/useCheatCode`
- [ ] Check a better way to organize and document this and other hooks
- [ ] Create test file (try following TDD next time lol)