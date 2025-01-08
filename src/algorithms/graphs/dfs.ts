
export type Graph = Map<number, Array<number>>;

export const dfs = (graph: Map<number, Array<number>>, visitor: (node: number) => void) => {
    const visited: number[] = [];

    for (let key of graph.keys()) {
        const stack = [key];

        while (stack.length !== 0) {
            const node = stack.pop() as unknown as number;
            if (!visited.includes(node)) {
                visited.push(node);
                visitor(node);
            }

            for (let elem of graph.get(node) || []) {
                if (!visited.includes(elem)) {
                    stack.push(elem);
                }
            }
        }
    }
}
