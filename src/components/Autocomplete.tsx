import { useEffect, useState } from "react";
import words from '../data/words.json';
import { Trie } from "../algorithms/prefix-tree";

const WordsWithPrefix = ({ words, prefix }: { words: string[], prefix: string }) => {
    if (!prefix) {
        return null;
    }

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
    const filteredWords = trie.nodeWithPrefix(prefix);
    const end = performance.now();

    const duration = end - start;

    return (
        <div >
            <div>{duration.toFixed(2)}</div>
            <div>{filteredWords.map((w: string) => <Word key={w} word={prefix + w} />)}</div>
        </div >
    );
}

const Word = ({ word }: { word: string }) => (
    <div>{word}</div>
)

const Autocomplete = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [trie] = useState(() => new Trie());

    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        const t1 = performance.now();
        words.forEach(w => trie.addWord(w));
        const t2 = performance.now();
        const duration = t2 - t1;
        console.log(`Trie created in ${duration.toFixed(2)}ms`);
    }, [])

    return (
        <div className="flex h-screen">
            <div>
                <input onChange={handleInputChange} className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                <div className="flex flex-row justify-between mt-4 gap-4">
                    <WordsWithPrefix words={words} prefix={searchValue} />
                    <WordsWithPrefixTrie trie={trie} prefix={searchValue} />
                </div>
            </div>
        </div>
    )
}

export default Autocomplete;