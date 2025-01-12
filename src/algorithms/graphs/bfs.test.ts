import { describe, expect, it } from "vitest";
import { bfs } from "./bfs";

export const objectToMap = (obj: Object): Map<number, Array<number>> => {
    const map = new Map<number, Array<number>>();

    for(let key in obj) {
        map.set(Number(key), obj[key]);
    }

    return map;
}

describe('bfs', () => {
    it('traverses graph and add values to the list', () => {
        const graph = {
            1: [2],
            2: [1, 3],
            3: [2, 4, 5],
            4: [3, 5],
            5: [3, 4],
            6: [7],
            7: [6, 8],
            9: [10],
            10: [9]
        }
        const nodes: number[] = [];
        bfs(objectToMap(graph), (node: number) => nodes.push(node));

        expect(new Set(nodes)).toEqual(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    })
})