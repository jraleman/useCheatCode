import React from 'react';
import logo from './logo.svg';
import './App.css';
import useCheatCodes, { CheatCode } from './useCheatCodes'; // <- imported from script

// key -> `code` is case insensitive
const cheatCodes: CheatCode[] = [
  {
    name: 'konami',
    code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'B', 'A'],
    callback: () => window.alert('hello there!'),
  },
  { 
    name: 'guns',
    code: ['g', 'u', 'n', 'S', 'G', 'u', 'N', 'S', 'g', 'u', 'n', 's'],
    callback: () => window.alert('guns')
  },
  {
    name: '4chan',
    code: ['4', 'c', 'h', 'a', 'n', 'S', 'U', 'C', 'K', 'S'],
    callback: () => window.alert('4chan')
  },
];

const App = () => {
  const {
    activeCheats,
    keystrokes,
    clearActiveCheats,
    getCheatCodeByName,
  } = useCheatCodes({ cheatCodes, repeat: false, timeout: 10000 });

  console.log('getCheatCodeByName', getCheatCodeByName('konami'))
  console.log('keystrokes: ', keystrokes);
  console.log('activeCheats: ', activeCheats);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Active Cheats:</h2>
        {activeCheats?.map(({ name }: { name: string }) => (
          <pre key={name}>
            <code>{name}</code>
          </pre>
        ))}
        <h3>Cheat Codes:</h3>
        <code style={{ whiteSpace: 'break-spaces', textAlign: 'left' }}>
          {JSON.stringify(activeCheats, null, 2)}
        </code>
      </header>
    </div>
  );
}

export default App;
