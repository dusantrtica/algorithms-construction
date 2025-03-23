import { useEffect, useState } from "react";
import words from '../data/words.json';
import { Trie } from "../algorithms/prefix-tree";
import { useTextFilter } from "./TextFilter";

const trie = new Trie();

const WordsWithPrefix = ({ words, prefix }: { words: string[], prefix: string }) => {
    const start = performance.now();
    const filteredWords = words.filter(w => w.startsWith(prefix));
    const end = performance.now();

    const duration = end - start;

    return (
        <div>
            <div>{duration.toFixed(2)}</div>
            <div>{filteredWords.map(w => <Word key={w} word={w} />)}</div>
        </div >
    );
}

const WordsWithPrefixTrie = ({ trie, prefix }: { trie: Trie, prefix: string }) => {
    const start = performance.now();
    const filteredWords = trie.wordsWithPrefix(prefix);
    const end = performance.now();

    const duration = end - start;

    return (
        <div >
            <div>{duration.toFixed(2)}</div>
            <div>{filteredWords.map(w => <Word key={w} word={w} />)}</div>
        </div >
    );
}

const Word = ({ word }: { word: string }) => (
    <div>{word}</div>
)

const Autocomplete = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const { result, onInputChange } = useTextFilter(words);

    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value);
        onInputChange(e.target.value)
    }

    useEffect(() => {
        words.forEach(w => trie.addWord(w));
        console.log("words inserted into trie");
    }, [])



    return (
        <>
            <input onChange={handleInputChange} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
            <div className="flex flex-row justify-between mt-4 gap-4">
                <WordsWithPrefix words={words} prefix={searchValue} />
                <WordsWithPrefixTrie trie={trie} prefix={searchValue} />
                <div>
                    {result.map(word => <Word word={word} key={word} />)}
                </div>
            </div>
        </>
    )
}

export default Autocomplete;