export const bfs = (graph: Map<number, Array<number>>, visitor: (node: number) => void) => {
    const visited: number[] = [];

    for (let key of graph.keys()) {
        const stack = [key];

        while (stack.length !== 0) {
            const node = stack.shift() as number;
            if (!visited.includes(node)) {
                visitor(node);
                visited.push(node);
            }
            for(let neighbor of graph.get(node) ||[]) {
                if(!visited.includes(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
}