import { describe, expect, it } from "vitest";
import { compose, filter, filterT, flow, formatMovie, gather, getMovieListing, lookupMovie, map, mapT, movieIds, recentMovie, showMovie, takeAll, takeOne, transreduceL, validMovie } from ".";

describe("getMovieListing", () => {
    it("should return a list of movies", () => {
        const listing = getMovieListing();
        expect(listing).toEqual([
            "How to train your dragon 3 (2019)",
            "The Avengers: Age of Ultron (2015)",
            "Frozen (2013)",
            "Frozen II (2019)",
            "How to train your dragon 2 (2014)",
        ]);
    });
});

describe("compose and flow", () => {
    it("gives back formatted film name by composing 2 functions", () => {
        const composed = compose(formatMovie, lookupMovie)
        expect(composed(156)).toBe("Gone with the Wind (1940)");
    })

    it("gives back formatted film name by flowing 2 functions", () => {
        const flowed = flow(lookupMovie, formatMovie)
        expect(flowed(156)).toBe("Gone with the Wind (1940)");
    });
});


describe("showMovie", () => {
    it("returns a formatted movie name using showMovie", () => {
        expect(showMovie([934]).next().value).toBe("Frozen II (2019)");
    });

    it("returns a formatted movie name using showMovie", () => {
        const showMovie1 = flow(
            gather,
            filter(validMovie),
            map(lookupMovie),
            filter(recentMovie),
            map(formatMovie),
            takeOne
        );
        expect(showMovie1(934)).toBe("Frozen II (2019)");
    });
});

describe("Movie listings", () => {
    it("returns list of all recent movies using iterable interface", () => {
        // switch back to method style of composition
        // better but not zero cost: 4,5 generators are hanging around
        // yielding comes at a certain cost, but extenable solution!
        const movies = Iterator
            .from(movieIds) // <-- returns ITERATOR FROM ITERABLE
            .filter(validMovie)
            .map(lookupMovie)
            .filter(recentMovie)
            .map(formatMovie)
            .toArray(); // opposiite direction now:  from ITERATOR to array (iterable)

        expect(movies).toEqual([
            "How to train your dragon 3 (2019)",
            "The Avengers: Age of Ultron (2015)",
            "Frozen (2013)",
            "Frozen II (2019)",
            "How to train your dragon 2 (2014)",
        ])
    });

    it("returns list of movies using transduceL", () => {
        const movieListing = transreduceL(
            compose(
                filterT(validMovie),
                mapT(lookupMovie),
                filterT(recentMovie),
                mapT(formatMovie)
            )
        );
        expect(movieListing(movieIds)).toEqual([
            "How to train your dragon 3 (2019)",
            "The Avengers: Age of Ultron (2015)",
            "Frozen (2013)",
            "Frozen II (2019)",
            "How to train your dragon 2 (2014)",
        ])
    })
})