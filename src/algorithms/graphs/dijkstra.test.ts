import { describe, expect, it } from "vitest";

type Vertex = {
    v: string,
    w: number
}
export type GraphW = Map<string, Array<Vertex>>;

const dijkstra = (graph: GraphW, startNode: string): number[] => {
    const distances = graph[startNode].reduce((acc, curr) => ({
        ...acc,
        [curr[0]]: curr[1]
    }), {[startNode]: 0})

    const visited = {};

    const closestNode = () => {
        const nonVisitedWithDist = Object.entries(distances).filter(([key,]) => !visited[key])
        const minValue = Math.min(...nonVisitedWithDist.map(([key, value]) => value));
        const minKey = (nonVisitedWithDist.find((entry) => entry[1] === minValue) || [])[0];
        return minKey
    }

    const queue = [closestNode()];
    while (queue.length !== 0) {
        const node = queue.shift();
        visited[node] = true;
        for (let edge of graph[node]) {
            const [neighboor, weight] = edge;
            if (distances[neighboor] === undefined || distances[neighboor] > distances[node] + weight) {
                distances[neighboor] = distances[node] + weight;
            }
        }

        const nonVisitedClosest = closestNode();
        if (nonVisitedClosest) {
            queue.push(nonVisitedClosest);
        }

    }

    return distances;
}

describe('Calculates shortest path', () => {
    const graph = {
        'a': [["b", 1], ["c", 4], ["d", 2]],
        'b': [["a", 1], ["c", 2]],
        'c': [["a", 4], ["b", 2], ["e", 1]],
        'd': [["a", 2], ["e", 3]],
        'e': [["c", 1], ["d", 3]],
    }

    it('returns shortes paths', () => {
        expect(dijkstra(graph, "a")).toEqual({
            "a": 0,
            "b": 1,
            "c": 3,
            "d":2,
            "e":4
        })
    })
})