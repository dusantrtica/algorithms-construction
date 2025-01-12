// Checks if a graph is bipartite and splits it into 2 segments

import { describe, expect, it } from "vitest";
import { Graph } from "./dfs";
import { objectToMap } from "./bfs.test";

type Color = "red" | "blue";

export const bipartite = (graph: Graph): Array<Array<number>> | undefined => {
    const colors: Color[] = [];
    const visited: boolean[] = [];

    for (let key of graph.keys()) {
        let currColor: Color = "red";
        const stack = [key];
        while (stack.length !== 0) {
            let node = stack.pop() as number;
            if (!visited[node]) {
                visited[node] = true;
                colors[node] = currColor;
                currColor = currColor === "blue" ? "red" : "blue";

                for (let neighbor of graph.get(node) || []) {
                    if (colors[neighbor] === colors[node]) {
                        return;
                    }
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }
    return [
        colors.map((value: Color, idx: number) => value === "red" ? idx : undefined).filter(x => x !== undefined),
        colors.map((value: Color, idx: number) => value === "blue" ? idx : undefined).filter(x => x !== undefined),
    ]
}

describe('bipartite test', () => {
    it('partition graph into 2 partitions: blue, and red', () => {
        const graph = {
            0: [1, 2],
            1: [0, 3, 4],
            2: [0, 3],
            3: [1, 2],
            4: [1],
        }
        const result = bipartite(objectToMap(graph))
        expect(result).toEqual([[0, 3, 4], [1, 2]]);
    });

    it('returns undefined when it is not possible to partition graph', () => {
        const graph = {
            0: [1,2,4],
            1: [0, 5],
            2: [0, 3, 4],
            3: [2, 5],
            4: [0,2],
            5: [1,3]
        }
        const result = bipartite(objectToMap(graph))
        expect(result).toEqual(undefined);
    })
    it('returns undefined when it is not possible to partition graph', () => {
        const graph = {
            0: [1,4],
            1: [1,3],
            2: [2,4],
            3: [3,4],
            4: [0,3]
        }
        const result = bipartite(objectToMap(graph))
        expect(result).toEqual(undefined);
    })
})