import { useState, useEffect } from 'react';
import { compareKeys } from './utils';

// add an object into argument
// pass in CheatCodes array object
// have some default, like Konami, etc...
const useCheatCodes = ({ cheatCodes }: IUseCheatCodes) => {
    const [activeCheats, setActiveCheats] = useState<CheatCode []>([]);
    const [inactiveCheats, setInactiveCheats] = useState<CheatCode []>([]);
    const [keystrokes, setKeystrokes] = useState<string[]>([]);

    const handleKeyDown = (event: any) => {
        event.preventDefault();
        const { key } = event || {};
        if (key) {
            setKeystrokes((oldKeys: string[]) => [...oldKeys, key]);
        }
    };

    const clearActiveCheats = () => {
        setActiveCheats([]);
    };

    const getByCheatName = (name: string) => {
        // activeCheats.name
    };
    
    useEffect(() => {
        for (let i = 0; i < cheatCodes.length || i < keystrokes.length; i += 1) {
            const isCheatValid = compareKeys(cheatCodes[i]?.code, keystrokes)
            if (isCheatValid) {
                // if (!activeCheats.length && cheatCodes[i].name === includes -> activeCheats) {
                if (!activeCheats.length) {
                    setActiveCheats((cheats: CheatCode[]) => [...cheats, cheatCodes[i]]);
                }
                setKeystrokes([]);
                window.alert(cheatCodes[i].name);
                break;
            }
        }
    }, [keystrokes]);

    useEffect(() => {
        if (false) {
            // if (cheatCodes)
            // filter out activeCheats from cheatCodes, save result to state
            setInactiveCheats(cheatCodes)
        }
    }, [cheatCodes]);

    useEffect(() => {
        window?.addEventListener('keydown', handleKeyDown);
        return () => {
            window?.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return {
        keystrokes,
        activeCheats,
        inactiveCheats,
        clearActiveCheats,
        getByCheatName,
    };
};

interface IUseCheatCodes {
    cheatCodes: CheatCode[];
}

export type CheatCode = {
    name: string;
    code: string[];
};

export default useCheatCodes;
