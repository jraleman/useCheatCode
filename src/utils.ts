export const compareCodes = (codes: string[], active: string[]) =>
    codes?.every((k, i) => k && k?.toLowerCase() === active[i]?.toLowerCase());
