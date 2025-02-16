import { describe, expect, it } from "vitest";

const zArray = (s: string): Array<Number> => {
    const n = s.length;
    let z = new Array<number>(n).fill(0);
    let i = 0;
    let l = 0;
    let r = 0;

    for (i = 1; i < n; i++) {
        if (i < r) {
            z[i] = Math.min(z[i - l], r - i + l);
        }
        while (i + z[i] < n && s[i + z[i]] === s[z[i]]) {
            z[i]++;
        }

        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
}

const substr = (s: string, t: string): Array<Number> => {
    const concatenatedString = `${t}#${s}`;

    const m = t.length;
    const zArr = zArray(concatenatedString);
    const result = [];

    for(let i = 0; i < zArr.length; i++) {
        if(zArr[i] === m) {
            result.push(i-m-1);
        }
    }
    return result;
}

describe('z array', () => {
    it('calculates z array correctly, case 1', () => {
        expect(zArray("abacababac")).toEqual([0, 0, 1, 0, 3, 0, 4, 0, 1, 0])
    })

    it('calculates z array correctly, case 2', () => {
        expect(zArray("aaacaaaaac")).toEqual([0, 2, 1, 0, 3, 3, 4, 2, 1, 0])
    })
})

describe('substring', () => {
    it('finds all indices where substring appears to be in a string', () => {
        expect(substr("ababcxabc", "abc")).toEqual([2, 6])
    })
})