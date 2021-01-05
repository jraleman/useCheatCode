# useCheatCode hook
Implementation of a React Hook to enter cheat codes

## Specifications
- Hook text captures key strokes by event listeners
- Array of key-value pairs, cheat-code name and callback function

```
const cheatCodes = useCheatCode([
  {'firstCheat': () => {}},
  {'secondCheat': () => {}},
]);
```
- Make tool to generate projects url using github api, so we type the project name to redirect to github repo url

## Implementation
Returns two (2) arrays of cheat-codes, used and un-used respectively.

```
const initialCheats = [{ 'cheat': () => console.log('callback function') }];
const [activeCheats, inactiveCheats] = useCheatCode(initialCheats);
console.log(activeCheats); // []
console.log(inactiveCheats); // ['cheat']
```

## TODO
- Check a better way to organize and document this hook (see other examples)
