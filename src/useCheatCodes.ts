import { useState, useEffect } from 'react';
import { compareKeys } from './utils';

// add an object into argument
// pass in CheatCodes array object
// have some default, like Konami, etc...
const useCheatCodes = ({ cheatCodes, timeout, repeat = true }: IUseCheatCodes) => {
    // TODO: take into account if user has cheat actived,
    // let him be able to activate it again, or never again until clearning from array
    const [activeCheats, setActiveCheats] = useState<CheatCode []>([]);
    const [inactiveCheats, setInactiveCheats] = useState<CheatCode []>([]);
    const [keystrokes, setKeystrokes] = useState<string[]>([]);

    const handleKeyDown = (event: any) => {
        event.preventDefault();
        const { key } = event;
        if (key) {
            setKeystrokes((oldKeys: string[]) => [...oldKeys, key]);
        }
    };

    const clearActiveCheats = () => {
        setActiveCheats([]);
    };

    const getCheatCodeByName = (name: string) => {
        const filteredCheat = activeCheats?.filter((cheat: CheatCode) => cheat.name === name);
        return filteredCheat;
    };
    
    useEffect(() => {
        // TODO: find a better (faster) way to iterate through the cheat codes list
        for (let i = 0; i < cheatCodes.length; i += 1) {
            const { code, name, callback = () => {} } = cheatCodes[i];
            const isCheatValid = compareKeys(code, [...keystrokes.slice(-code?.length)])
            if (isCheatValid) {
                const cheatExist = activeCheats.filter((c: CheatCode) => c.name === name);
                if (!cheatExist.length) {
                    setActiveCheats((cheats: CheatCode[]) => [...cheats, cheatCodes[i]]);
                    callback();
                } else if (repeat) {
                    callback();
                }
                setKeystrokes([]);
                break;
            }
        }
    }, [keystrokes]);

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
        getCheatCodeByName,
    };
};

interface IUseCheatCodes {
    cheatCodes: CheatCode[];
    timeout?: number;
    repeat?: boolean;
}

export type CheatCode = {
    name: string;
    code: string[];
    callback?: Function;
};

export default useCheatCodes;
