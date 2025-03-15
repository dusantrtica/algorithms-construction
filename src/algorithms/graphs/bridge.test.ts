import { describe, it } from "vitest";
import { Graph } from "./dfs";
import { objectToMap } from "./bfs.test";

const findBridge = (graph: Graph): number => {
    const n = graph.size;
    const visited: Boolean[] = []
    const numeration = Array(n).fill(0)
    let currNumeration = 0;
    let parentNode = 0;
    let node = 0;
    let low;
    const stack = [graph.keys().next().value];
    while (stack.length !== 0) {
        node = stack.pop() as unknown as number;

        numeration[node] = ++currNumeration;
        low = numeration[node]

        visited[node] = true

        for (let neighbor of graph.get(node) || []) {
            if (!visited[neighbor]) {
                stack.push(neighbor)
                visited[neighbor] = true;
            } else if (parentNode !== neighbor) {
                low = Math.min(low, numeration[neighbor])
            }
        }
    }
    return low;
}

describe('Find bridge in a graph', () => {
    const graph = {
        1: [2, 3],
        2: [1, 3],
        3: [1, 2, 4],
        4: [3, 5, 6],
        5: [4, 6],
        6: [4, 5]
    }

    it('prints out graph', () => {
        findBridge(objectToMap(graph));
    })


})