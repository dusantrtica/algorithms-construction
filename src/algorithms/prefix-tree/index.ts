class Node {
    wordTerminated = false;
    private _children: Map<string, Node>;

    constructor() {
        this._children = new Map<string, Node>();
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

    wordsWithPrefix(prefix: string) {
        let currentNode = this.root;
        for (let c of prefix) {
            if (!currentNode.has(c)) {
                return [];
            } else {
                currentNode = currentNode.get(c) as Node;
            }
        }        
        return this.toList(currentNode).map(word => prefix + word);
    }
}

export const longestCommonPrevix = (words: string[]): string => {
    const trie = new Trie();
    for (let w of words) {
        trie.addWord(w);
    }

    return trie.commonWord();
}
