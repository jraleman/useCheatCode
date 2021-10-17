export var compareStringArrays = function (arr1, arr2) {
    return arr1 === null || arr1 === void 0 ? void 0 : arr1.every(function (a, i) { var _a; return a && (a === null || a === void 0 ? void 0 : a.toLowerCase()) === ((_a = arr2[i]) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
};
