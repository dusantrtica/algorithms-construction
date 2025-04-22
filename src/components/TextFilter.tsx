import { useMemo, useState } from "react"
import { Trie } from "../algorithms/prefix-tree"

export const useTextFilter = (words: Array<string>) => {
    
    const trie = useMemo(() => {
        console.log('evaluating')
        const t = new Trie();
        words.forEach(w => t.addWord(w));
        return t;
    }, [])

    const [result, setResult] = useState<Array<string>>([]);

    const onInputChange = (prefix: string) => {
        setResult(trie.wordsWithPrefix(prefix));
    }

    return {
        result,
        onInputChange
    }
}
