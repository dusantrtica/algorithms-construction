import { describe, it, expect } from "vitest";
import { Graph } from "./dfs";
import { objectToMap } from "./bfs.test";

const topologicalSorting = (graph: Graph): Array<number> => {
    const inDeg: number[] = new Array(graph.size).fill(0);
    for (let key of graph.keys()) {
        for (let node of graph.get(key) as []) {
            inDeg[node] = (inDeg[node] || 0) + 1;
        }
    }
    
    const result: number[] = [];

    for (let u = 0; u < graph.size; u++) {
        if (inDeg[u] === 0) {
            result.push(u);
        }
    }

    let i = 0;
    while(i < graph.size) {
        const u = result[i];
        for(let v of graph.get(u) as []) {
            inDeg[v]--;
            if(inDeg[v] === 0) {
                result.push(Number(v));
            }
        }
        i++;
    }

    return result.filter(x => x !== undefined);
}

describe('topologicalSorting', () => {
    it('returns array of nodes, sorted by', () => {
        const graph = {
            0: [],
            1: [0, 3],
            2: [5, 1],
            3: [0],
            4: [1, 0],
            5: [1]
        }

        expect(topologicalSorting(objectToMap(graph))).toEqual([2, 4, 5, 1, 3, 0])
    })
})