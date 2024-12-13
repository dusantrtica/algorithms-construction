import { beforeEach, describe, it, expect } from 'vitest';
import { longestCommonPrevix, Trie } from ".";

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
        expect(longestCommonPrevix(["code", "coding", "codecs", "coding"])).toEqual("cod");
    })
})