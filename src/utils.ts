export const compareStringArrays = (arr1: string[], arr2: string[]) =>
    arr1?.every((a, i) => a && a?.toLowerCase() === arr2[i]?.toLowerCase());
