import { CheatCode } from './types';

export interface IUseCheatCodes {
    cheatCodes: CheatCode[];
    timeout?: number;
    repeat?: boolean;
}
