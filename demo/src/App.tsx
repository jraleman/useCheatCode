import React, { useEffect, useState } from 'react';
import logo from './assets/konami-code.png';
import './App.css';
import useCheatCodes, { CheatCode } from './useCheatCodes'; // <- imported from script

const App = () => {
  const [displayCodes, setDisplayCodes] = useState<boolean>(false);
  const cheatCodes: CheatCode[] = [
    {
      name: 'konami',
      code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'B', 'A'],
      // ^ `code` is case insensitive
    },
    { 
      name: 'guns',
      code: ['g', 'u', 'n', 'S', 'G', 'u', 'N', 'S', 'g', 'u', 'n', 's'],
      callback: () => window.alert('🔫🔫🔫')
    },
    {
      name: '4chan',
      code: ['4', 'c', 'h', 'a', 'n', 'S', 'U', 'C', 'K', 'S'],
      callback: () => {
        window.location.href = 'https://4chan.com'
      }
    },
  ];
  const {
    activeCheats,
    keystrokes,
    clearActiveCheats,
    clearKeystrokes,
    getCheatCodeByName,
  } = useCheatCodes({ cheatCodes, repeat: false, timeout: 10000 });
  
  useEffect(() => {
    const defaultCode = 'konami';
    const isActive = getCheatCodeByName(defaultCode);
    if (!displayCodes && isActive) {
      setDisplayCodes(true);
    }
  }, [activeCheats, displayCodes, getCheatCodeByName]);

  console.log('keystrokes: ', keystrokes);
  console.log('activeCheats: ', activeCheats);
  return (
    <div className="App">
      <header className="App-header">
        {!displayCodes && <img src={logo} className="App-logo" alt="logo" />}
        {displayCodes && (
          <>
            <h2>Active Cheats:</h2>
            {activeCheats?.map(({ name }: { name: string }) => (
              <pre key={name} style={{ margin: 0 }}>
                <code>{`~ ${name} ~`}</code>
              </pre>
            ))}
            <h3>Cheat Codes:</h3>
            <code style={{ whiteSpace: 'break-spaces', textAlign: 'left', fontSize: '0.5em' }}>
              {JSON.stringify(cheatCodes, null, 2)}
            </code>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
