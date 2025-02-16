import { describe, expect, it } from "vitest";
import { colienar, findMinPointIdx, grahamScan, insideAngle, isConvex, p, Point, pointFrom } from "./utils";

describe('geometry', () => {
    it('returns true if points are colinear', () => {
        const A: Point = { x: 1, y: 1 }
        const B: Point = { x: 2, y: 2 }
        const C: Point = { x: 3, y: 3 }
        expect(colienar(A, B, C)).toBe(true)
    });

    it('returns false if points are not colinear', () => {
        const A: Point = { x: 1, y: 1 }
        const B: Point = { x: 2, y: 2 }
        const C: Point = { x: 3, y: 1 }
        expect(colienar(A, B, C)).toBe(false)
    })

    describe("within angle", () => {
        const A: Point = { x: 0, y: 0 }
        const B: Point = { x: 1, y: 0 }
        const C: Point = { x: 0, y: 1 }

        it("returns true if point is inside the angle", () => {
            const D = { x: 1, y: 1 }
            expect(insideAngle(A, B, C, D)).toBe(true)
        })

        it("returns false if D is below A B", () => {
            const D = { x: -1, y: 1 }
            expect(insideAngle(A, B, C, D)).toBe(false)
        })

        it("returns false if D is below A B", () => {
            const D = { x: 1, y: -1 }
            expect(insideAngle(A, B, C, D)).toBe(false)
        })
    })

    describe("isConvex", () => {
        it("returns true for a polygon that is convex", () => {
            const points = [
                pointFrom(1, 1),
                pointFrom(2, 1),
                pointFrom(3, 2),
                pointFrom(3, 3),
                pointFrom(2, 3),
                pointFrom(1, 2),
            ]

            expect(isConvex(points)).toBe(true)
        })
        it("returns false for a polygon that is not convex", () => {
            const points = [
                pointFrom(1, 1),
                pointFrom(2, 1),
                pointFrom(2, 2),
                pointFrom(3, 3),
                pointFrom(2, 3),
                pointFrom(1, 2),
            ]

            expect(isConvex(points)).toBe(false);
        })
    })

    describe('findMinPointIdx', () => {
        it('returns index of point which is minimal among all other points', () => {
            const points = [
                pointFrom(2, 2),
                pointFrom(1, 1),
                pointFrom(1, 2)
            ]
            expect(findMinPointIdx(points)).toEqual(1);
        })
    })

    describe('graham algorithm', () => {
        it('creates wrapper for a given polygon', () => {
            const points = [
                p(2, 3),
                p(2, 1),
                p(3, 2),
                p(3, 3),
                p(1, 1),
                p(2, 2),
                p(4, 2),
                p(1, 2),
            ]

            expect(grahamScan(points)).toEqual([
                p(1, 1),
                p(2, 1),
                p(4, 2),
                p(3, 3),
                p(2, 3),
                p(1, 2)
            ])
        })
    })
})