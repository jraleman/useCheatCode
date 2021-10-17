var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect, useCallback } from 'react';
import { compareStringArrays } from './utils';
var useCheatCodes = function (_a) {
    var cheatCodes = _a.cheatCodes, _b = _a.timeout, timeout = _b === void 0 ? 0 : _b, _c = _a.repeat, repeat = _c === void 0 ? true : _c;
    var _d = useState([]), activeCheats = _d[0], setActiveCheats = _d[1];
    var _e = useState([]), keystrokes = _e[0], setKeystrokes = _e[1];
    var handleKeyDown = function (event) {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        if (event === null || event === void 0 ? void 0 : event.key) {
            setKeystrokes(function (oldKeys) { return __spreadArray(__spreadArray([], oldKeys, true), [event.key], false); });
        }
    };
    var clearActiveCheats = function () {
        setActiveCheats([]);
    };
    var clearKeystrokes = function () {
        setKeystrokes([]);
    };
    var getCheatCodeByName = useCallback(function (name) {
        var filteredCheat = activeCheats === null || activeCheats === void 0 ? void 0 : activeCheats.filter(function (c) { return (c === null || c === void 0 ? void 0 : c.name) === name; });
        return (filteredCheat === null || filteredCheat === void 0 ? void 0 : filteredCheat.length) > 0 ? filteredCheat : null;
    }, [activeCheats]);
    useEffect(function () {
        var runCheatCode = function (cheatCode) {
            var name = cheatCode.name, _a = cheatCode.callback, callback = _a === void 0 ? function () { } : _a;
            var cheatExists = getCheatCodeByName(name);
            if (!cheatExists) {
                setActiveCheats(function (cheats) { return __spreadArray(__spreadArray([], cheats, true), [cheatCode], false); });
                callback();
            }
            else if (repeat) {
                callback();
            }
            clearKeystrokes();
        };
        for (var i = 0; i < cheatCodes.length; i += 1) {
            var code = (cheatCodes[i] || {}).code;
            var isCheatValid = compareStringArrays(code, __spreadArray([], keystrokes.slice(-(code === null || code === void 0 ? void 0 : code.length)), true));
            if (isCheatValid) {
                runCheatCode(cheatCodes[i]);
                break;
            }
        }
    }, [keystrokes, cheatCodes, repeat, getCheatCodeByName]);
    useEffect(function () {
        var clearUserInput = function () { return timeout && keystrokes.length > 0 && clearKeystrokes(); };
        var t = setTimeout(clearUserInput, timeout);
        return function () { return clearTimeout(t); };
    }, [timeout, keystrokes]);
    useEffect(function () {
        window.addEventListener('keydown', handleKeyDown);
        return function () {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return {
        keystrokes: keystrokes,
        activeCheats: activeCheats,
        clearKeystrokes: clearKeystrokes,
        clearActiveCheats: clearActiveCheats,
        getCheatCodeByName: getCheatCodeByName,
    };
};
export default useCheatCodes;
