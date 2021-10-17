# useCheatCodes

Implementation of a React Hook to enter cheatcodes on screen.

[Demo available here, try it out! ](https://jraleman.com/useCheatCodes)

Enter the [konami code](https://en.wikipedia.org/wiki/Konami_Code) and see what happens.

*If you prefer running the demo locally, go to the `demo/` directory and run `yarn`

## Installation

To get started, this package can be installed via `npm` or `yarn`

```sh
npm install @jraleman/use-cheat-codes
```

```sh
yarn add @jraleman/use-cheat-codes
```

If you desire more hooks, you can install the whole library `@jraleman/hooks`

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
- [x] Open dependency project; `hooks` -> `@jraleman/use-cheat-codes`
