import React, { useEffect, useState } from 'react';
import useCheatCodes, { CheatCode } from '@jraleman/usecheatcodes';
import CodesInfo from './components/CodesInfo';

const defaultCode = 'konami';
const bgColors = [
  '#006cd1',
  '#bc5a00',
  '#007775',
  '#750077',
  '#bc0004',
  '#42b284',
];

const App = () => {
  const [displayCodes, setDisplayCodes] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('');

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
        window.location.href = 'https://4chan.org'
      }
    },
    {
      name: 'colors',
      code: ['c', 'o', 'l', 'o', 'r', 's'],
      callback: () => {
        const random = Math.floor(Math.random() * bgColors.length);
        const color = bgColors[random]
        setBackgroundColor(color);
      }
    },
  ];
  const {
    activeCheats,
    getCheatCodeByName,
  } = useCheatCodes({ cheatCodes, repeat: true, timeout: 10000 });
  
  // example on handling hook state
  // replace with `useCallback` so we can pass `getCheatCodeByName()` as dep arr.
  useEffect(() => {
    const isActive = getCheatCodeByName(defaultCode);
    if (!displayCodes && isActive) {
      setDisplayCodes(true);
    }
  }, [activeCheats, displayCodes, getCheatCodeByName]);

  return (
    <div className="app" style={{ backgroundColor }}>
      <CodesInfo
        cheatCodes={cheatCodes}
        activeCheats={activeCheats}
        displayCodes={displayCodes}
      />
    </div>
  );
};

export default App;
