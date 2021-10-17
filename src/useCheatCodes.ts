import { useState, useEffect, useCallback } from 'react';
import { compareStringArrays } from './utils';

const useCheatCodes = ({ cheatCodes, timeout = 0, repeat = true }: IUseCheatCodes) => {
    const [activeCheats, setActiveCheats] = useState<CheatCode[]>([]);
    const [keystrokes, setKeystrokes] = useState<string[]>([]);

    const handleKeyDown = (event: KeyboardEvent) => {
        event?.preventDefault();
        if (event?.key) {
            setKeystrokes((oldKeys: string[]) => [...oldKeys, event.key]);
        }
    };

    const clearActiveCheats = () => {
        setActiveCheats([]);
    };

    const clearKeystrokes = () => {
        setKeystrokes([]);
    };

    const getCheatCodeByName = useCallback((name: string): CheatCode[] | null => {
        const filteredCheat = activeCheats?.filter((c: CheatCode) => c?.name === name);
        return filteredCheat?.length > 0 ? filteredCheat : null;
    }, [activeCheats]);

    useEffect(() => {
        const runCheatCode = (cheatCode: CheatCode) => {
            const { name, callback = () => {} } = cheatCode;
            const cheatExists = getCheatCodeByName(name);
            if (!cheatExists) {
                setActiveCheats((cheats: CheatCode[]) => [...cheats, cheatCode]);
                callback();
            } else if (repeat) {
                callback();
            }
            clearKeystrokes();
        };

        for (let i = 0; i < cheatCodes.length; i += 1) {
            const { code } = cheatCodes[i] || {};
            const isCheatValid = compareStringArrays(code, [...keystrokes.slice(-code?.length)]);
            if (isCheatValid) {
                runCheatCode(cheatCodes[i]);
                break;
            }
        }
    }, [keystrokes, cheatCodes, repeat, getCheatCodeByName]); // <- replace with useCallback!

    useEffect(() => {
        const clearUserInput = () => timeout && keystrokes.length > 0 && clearKeystrokes();
        const t = setTimeout(clearUserInput, timeout);
        return () => clearTimeout(t);
    }, [timeout, keystrokes]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return {
        keystrokes,
        activeCheats,
        clearKeystrokes,
        clearActiveCheats,
        getCheatCodeByName,
    };
};

export interface IUseCheatCodes {
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
