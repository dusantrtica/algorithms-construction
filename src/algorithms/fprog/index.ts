export type Movie = {
    id?: number,
    title: string,
    released: number
}

export const movieIds = [156, 378, 528, 529, 530, 531, 532, 535, 931, 932, 933, 934, 533, 534, 3, 92, 1, 0];

const getMockedData = (): Record<number, Movie> => {
    return {
        156: { title: "Gone with the Wind", released: 1940 },
        378: { title: "The Godfather", released: 1972 },
        528: { title: "The Dark Knight", released: 2008 },
        529: { title: "The Dark Knight Rises", released: 2012 },
        530: { title: "The Dark Knight Returns", released: 2012 },
        531: { title: "The Dark Knight Falls", released: 2012 },
        532: { title: "The Dark Knight Strikes Back", released: 2012 },
        533: { title: "How to train your dragon", released: 2010 },
        534: { title: "How to train your dragon 2", released: 2014 },
        535: { title: "How to train your dragon 3", released: 2019 },
        931: { title: "The Avengers", released: 2012 },
        932: { title: "The Avengers: Age of Ultron", released: 2015 },
        933: { title: "Frozen", released: 2013 },
        934: { title: "Frozen II", released: 2019 }
    }
}

const mockedData = getMockedData();

export const lookupMovie = (movieId: number): Movie => mockedData[movieId] as unknown as Movie;

export const validMovie = (movieId: number) => movieId >= 100;
export const recentMovie = (movie: Movie) => movie.released >= 2013;
export const formatMovie = (movie: Movie) => `${movie.title} (${movie.released})`;

export const getMovieListing = (): string[] => {
    const listing = []
    for (let movieId of movieIds) {
        if (validMovie(movieId)) {
            let movie = lookupMovie(movieId);
            if (recentMovie(movie)) {
                listing.push(formatMovie(movie));
            }
        }
    }
    return listing;
}

// inefficiency 1: iterating 4 times
// inefficiency 2: creating a new array for each filter or map
// we want functional style but not at performance cost, is that possible?
const getMovieListingDecl = () => movieIds
    .filter(validMovie)
    .map(lookupMovie)
    .filter(recentMovie)
    .map(formatMovie);



// helps, but the problem is infinite lists
// how to handle those efficiently
export const compose = (...fns: Function[]) => {
    return (x: any) => fns.reduceRight((input, f) => f(input), x);
}

export const flow = (...fns: Function[]) => {
    return (x: any) => fns.reduce((input, f) => f(input), x);
}

export const map = (fn: Function): Function => {
    return function* map(iter: Iterable<any>) {
        for (let item of iter) {
            yield fn(item);
        }
    }
}

export const filter = (fn: Function): Function => {
    return function* filter(iter: Iterable<any>) {
        for (let item of iter) {
            if (fn(item)) {
                yield item;
            }
        }
    }
}

// composing 4 generators, no intermediate lists
// a bit awkard how we interact with the generator
// showMovie( [array]).next().value <-- awkward
export const showMovie = flow(
    filter(validMovie),
    map(lookupMovie),
    filter(recentMovie),
    map(formatMovie)
);

// helper functions to work with generators

// array is iterable
// generator is iteratOR
export const gather = (...vals: any[]) => { return vals };

export const takeOne = (iter: Iterator<any>) => {
    return iter.next().value;
}

export const takeAll = (iter: Iterable<any>) => {
    return [...iter];
}

// transducer style: higher order reducer! takes reducer, and returns a reducer
export const mapT =
    (mapperFn: Function) => // mapT is a function that returns a transducer
        (combinerFn: Function) => // combinerFn is the reducer
            (list: any[], v: any) =>
                combinerFn(list, mapperFn(v));

export const filterT = 
    (predicateFn: Function) => 
        (combinerFn: Function) => 
            (list: any[], v: any) => 
                predicateFn(v) ? combinerFn(list, v) : list; // if predicate is true, add to list, else return list

const concatL = (list: any[], v: any) => {
    return list.concat(v);
}

// almost 0 cost, no intermediate lists nor generators
export const transreduceL = 
    (fn: Function) => // fn is transducer
        (list: any[]) => 
            list.reduce(fn(concatL), []); // fn(concatL) is the reducer, fn is transducer