import { beforeEach, describe, it, expect } from 'vitest';
import { Node, Trie } from ".";

describe("Iterator from Node", () => {
    let trie: Trie;

    beforeEach(() => {
        trie = new Trie()
        trie.addWord("ban");
        trie.addWord("band");
        trie.addWord("banana");
        trie.addWord("bananas");
        trie.addWord("banner");
    });
    it("returns traverses all nodes from the starting node", () => {
        const node = trie.nodeWithPrefix("ban");
        const result = node.map((e: String) => e);
        expect(new Set(result)).toEqual(new Set(["", "d", "ana", "anas", "ner"]));
    });

    it("returns empty array if there is no words with prefix", () => {
        const node = trie.nodeWithPrefix("x");
        const result = node.map((e: String) => e);
        expect(result).toEqual([]);
    })
})