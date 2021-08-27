import { useState, useEffect } from 'react';
import { compareCodes } from './utils';

const useCheatCodes = ({ cheatCodes, timeout, repeat = true }: IUseCheatCodes) => {
    const [activeCheats, setActiveCheats] = useState<CheatCode[]>([]);
    const [keystrokes, setKeystrokes] = useState<string[]>([]);

    const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key) {
            setKeystrokes((oldKeys: string[]) => [...oldKeys, event.key]);
        }
    };

    const clearActiveCheats = () => {
        setActiveCheats([]);
    };

    const clearKeystrokes = () => {
        setKeystrokes([]);
    };

    const getCheatCodeByName = (name: string) => {
        const filteredCheat = activeCheats?.filter((cheat: CheatCode) => cheat.name === name);
        return filteredCheat;
    };

    useEffect(() => {
        const clearUserInput = () => timeout && keystrokes.length > 0 && clearKeystrokes();
        const t = setTimeout(clearUserInput, timeout);
        return () => clearTimeout(t);
    }, [timeout, keystrokes]);

    useEffect(() => {
        const runCheatCode = (cheatCode: CheatCode) => {
            const { name, callback = () => {} } = cheatCode;
            const cheatExist = activeCheats.filter((c: CheatCode) => c.name === name);
            if (!cheatExist.length) {
                setActiveCheats((cheats: CheatCode[]) => [...cheats, cheatCode]);
                callback();
            } else if (repeat) {
                callback();
            }
            setKeystrokes([]);
        };

        for (let i = 0; i < cheatCodes.length; i += 1) {
            const { code } = cheatCodes[i];
            const isCheatValid = compareCodes(code, [...keystrokes.slice(-code?.length)])
            if (isCheatValid) {
                runCheatCode(cheatCodes[i]);
                break;
            }
        }
    }, [keystrokes, activeCheats, cheatCodes, repeat]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return {
        keystrokes,
        activeCheats,
        clearActiveCheats,
        clearKeystrokes,
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
