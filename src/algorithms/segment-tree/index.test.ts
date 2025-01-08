import { describe, expect, it } from "vitest";
import { createTree, query } from ".";

describe('Segment tree', () => {
    it('creates segment tree out of numbers', () => {
        const tree = createTree([3, 2, 7, -3, 4, 1, 6, 2])

        expect(tree).toEqual([0, 22, 9, 13, 5, 4, 5, 8, 3, 2, 7, -3, 4, 1, 6, 2])
    })

    describe('query', () => {
        const arr = [3, 2, 7, -3, 4, 1, 6, 2];
        const tree = createTree(arr)
        const n = arr.length;
        it('returns sum of the whole tree', () => {
            expect(query(0, n-1, tree, n)).toBe(22);
        })

        it('returns sum where endpoints should not added individually', () => {
            expect(query(1, n-2, tree, n)).toBe(17);
        })

        it('returns sum where endpoints can be added with parents', () =>{
            expect(query(2, n-3, tree, n)).toBe(9);
        })
    })
})
