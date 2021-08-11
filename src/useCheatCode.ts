import { useState, useEffect } from 'react';

type CheatCodes = [{
    name: string;
    keys: string[];
}];

const codes: CheatCodes = [
    {
        name: 'konami',
        keys: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'B', 'A'],
    }
];

// we should parse lowerCase() before this function
const compareKeys = (arr1: string[], arr2: string[]) =>
    (arr1.length == arr2.length) && arr1.every((k, i) => k.toLowerCase() === arr2[i].toLowerCase());

// add an object into argument
// pass in CheatCodes array object
// have some default, like Konami, etc...
const useCheatCodes = () => {
    const [activeCheats, setActiveCheats] = useState({});
    const [inactiveCheats, setInactiveCheats] = useState({});
    const [keystrokes, setKeystrokes] = useState<string[]>([]);

    const handleKeyDown = (event: any) => {
        event.preventDefault();
        const { key } = event || {};
        if (key) {
            setKeystrokes((oldKeys) => [...oldKeys, key]);
        }
    }
    
    useEffect(() => {
        // setTimeout to clear array
        console.log('keystrokes: ', keystrokes);

        // see how to iterate through codes
        // we can make a function that returns > 0, if there is cheat code in the list
        // -1 if it doesn't exist
        // we can use that number to 
        // codes
        // 0 -> konami
        const isCheatValid = compareKeys(keystrokes, codes[0]?.keys)
        if (isCheatValid) {
            window.alert(codes[0].name);
            setKeystrokes([]);
        }
    }, [keystrokes]);

    useEffect(() => {
        window?.addEventListener('keydown', handleKeyDown)
        return () => {
            window?.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return {
        keystrokes,
        activeCheats,
        inactiveCheats,
    };
};

export default useCheatCodes;
