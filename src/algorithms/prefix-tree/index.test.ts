import { beforeEach, describe, it, expect } from 'vitest';
import { longestCommonPrefix, Node, Trie } from ".";

describe('Trie', () => {
    let trie: Trie;
    beforeEach(() => {
        trie = new Trie()
        trie.addWord("abc");
        trie.addWord("abcd");
        trie.addWord("abx");
        trie.addWord("cd");
        trie.addWord("cef");
    });

    it('returns strings which exist in the trie', () => {
        expect(trie.containsWord("abc")).toBe(true);
        expect(trie.containsWord("abcd")).toBe(true);
    })

    it('returns false for containsWord when the word is not in the trie', () => {
        expect(trie.containsWord("abcde")).toBe(false);
    })

    it("returns false for a word which is a prefix of another word but not in the trie", () =>{
        expect(trie.containsWord("ab")).toBe(false);
    })

    it("returns all words with a certain prefix", () => {
        expect(trie.wordsWithPrefix("ab")).toEqual(["abc", "abcd", "abx"]);
    });

    it('retrieves all words in the list', () => {
        expect(trie.toList()).toEqual(["abc", "abcd", "abx", "cd", "cef"])
    })
})

describe('Longest common prefix', () => {
    it("returns longest common prefix for array of words", () => {
        expect(longestCommonPrefix(["code", "coding", "codecs", "coding"])).toEqual("cod");
    })
})

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