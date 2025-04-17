export class Node implements Iterable<Node> {
    wordTerminated = false;
    private _children: Map<string, Node>;

    constructor() {
        this._children = new Map<string, Node>();
    }

    *[Symbol.iterator](): Iterator<any> {
        const stack = [["", this as Node]];

        while (stack.length) {
            const [textSoFar, node] = stack.pop() as [string, Node];
            if(node.wordTerminated) {                
                yield textSoFar;
            }

            for (const child of node._children) {
                stack.push([textSoFar + child[0], child[1]]);
            }
        }
    }

    map(cbk: Function): Node[] {
        const result: Node[] = [];
        for (const node of this) {
            result.push(cbk(node));
        }
        return result;
    }

    count(): number {
        return this._children.size;
    }

    keys(): string[] {
        return Array.from(this._children.keys());
    }

    has(c: string) {
        return this._children.has(c);
    }

    get(c: string) {
        return this._children.get(c) as Node;
    }

    getOrCreateNode(c: string): Node {
        if (!this._children.has(c)) {
            this._children.set(c, new Node());
        }

        return this._children.get(c) as Node;
    }
}

export class Trie {
    private root: Node;

    constructor() {
        this.root = new Node();
    }

    addWord(word: string) {
        let currNode: Node = this.root;

        for (let c of word) {
            currNode = currNode.getOrCreateNode(c);
        }
        currNode.wordTerminated = true;
    }

    containsWord(word: string): boolean {
        let currNode = this.root;

        for (let c of word) {
            if (!currNode.has(c)) {
                return false;
            }
            currNode = currNode.get(c);
        }
        return currNode.wordTerminated;
    }

    commonWord(): string {
        let currentNode = this.root;
        let commonLetters: string[] = []
        while (true) {
            if (currentNode.wordTerminated || currentNode.count() > 1) {
                break;
            }
            const keys = currentNode.keys()
            commonLetters.push(keys[0])
            currentNode = currentNode.get(keys[0]);
        }

        return commonLetters.join("");
    }

    traverse(node: Node, cbk: Function, currWord: string = "") {        
        if (node.wordTerminated) {
            cbk(currWord)
        }
        for(let key of node.keys()) {
            this.traverse(node.get(key), cbk, currWord + key);
        }
    }

    toList(fromNode: Node = this.root): string[] {
        const words: string [] = []
        this.traverse(fromNode, (word: string) => {words.push(word)})
        return words;
    }

    nodeWithPrefix = (prefix: string): Node => {
        const n = prefix.length;
        let currentNode = this.root;
        for (let i = 0; i < n; i++) {
            const c = prefix[i];
            if (!currentNode.has(c)) {
                return new Node(); // empty node so mapping works
            } else {
                currentNode = currentNode.get(c);
            }
        }

        return currentNode;
    }

    wordsWithPrefix(prefix: string) {      
        const node = this.nodeWithPrefix(prefix);
        if(node !== null) {
            return this.toList(node).map(word => prefix + word);
        }    
        return [];
    }
}

export const longestCommonPrefix = (words: string[]): string => {
    const trie = new Trie();
    for (let w of words) {
        trie.addWord(w);
    }

    return trie.commonWord();
}
