import { IUseCheatCodes } from './interfaces';
import { CheatCode } from './types';
declare const useCheatCodes: ({ cheatCodes, timeout, repeat }: IUseCheatCodes) => {
    keystrokes: string[];
    activeCheats: CheatCode[];
    clearKeystrokes: () => void;
    clearActiveCheats: () => void;
    getCheatCodeByName: (name: string) => CheatCode[] | null;
};
export default useCheatCodes;
