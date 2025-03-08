export type Point = {
    x: number,
    y: number,
}

export type Segment = {
    a: Point,
    b: Point
}


const scalarProduct = (p1: Point, p2: Point): number => {
    return p1.x * p2.x + p1.y * p2.y;

}

const vectorProduct = (v: Point, w: Point): number => {
    return v.x * w.y - v.y * w.x;
}

const vector = (a: Point, b: Point): Point => {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

const orientation = (a: Point, b: Point, c: Point): number => {
    return vectorProduct(vector(a, b), vector(a, c))
}

export const colienar = (a: Point, b: Point, c: Point): boolean => {
    return orientation(a, b, c) === 0;
}


export const insideAngle = (a: Point, b: Point, c: Point, d: Point): boolean => {
    if (orientation(a, b, c) < 0) {
        orientation(a, c, d) >= 0 && orientation(a, d, b) >= 0;
    }

    return orientation(a, b, d) >= 0 && orientation(a, d, c) >= 0;
}

export const pointFrom = (x: number, y: number): Point => {
    return {
        x, y
    }
}

export const p = pointFrom;

export const segment = (p1: Point, p2: Point): Segment => {
    return {
        a: p1,
        b: p2
    }
}

export const isConvex = (points: Point[]) => {
    const n = points.length;
    let isPos = false;
    let isNeg = false;

    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const k = (i + 2) % n;

        const direction = orientation(points[i], points[j], points[k]);
        if (direction > 0) {
            isPos = true;
        }
        if (direction < 0) {
            isNeg = true;
        }
    }

    return !(isPos && isNeg);
}

const ptsCmp = (refPoint: Point) => (a: Point, b: Point): number => {
    const ort = orientation(refPoint, a, b);
    return ort > 0 ? -1 : 1
}



export const findMinPointIdx = (points: Point[]): number => {
    const ptLessThan = (a: Point, b: Point): boolean => {
        if (a.x === b.x) {
            return a.y < b.y;
        }
        return a.x < b.x
    }
    return points.reduce((prev, curr, currIdx) => {
        if (ptLessThan(points[prev], curr)) {
            return prev
        } else {
            return currIdx;
        }
    }, 0)
}

const swap = (pts: Point[], i: number, j: number) => {
    const tmp = pts[i];
    pts[i] = pts[j];
    pts[j] = tmp;
}

export const grahamScan = (pts: Point[]): Point[] => {
    let points = [...pts];
    swap(points, 0, findMinPointIdx(points));
    const [first, ...ptsWithoutFirst] = points;

    ptsWithoutFirst.sort(ptsCmp(first))

    points = [first, ...ptsWithoutFirst]

    const wrapper: number[] = [0];

    for (let i = 1; i < points.length; i++) {
        // remove from the wrapper last point
        // while the orientation is negative        
        while (wrapper.length > 1 && orientation(
            points[wrapper[wrapper.length - 2]],
            points[wrapper[wrapper.length - 1]],
            points[i]) < 0
        ) {
            wrapper.pop();
        }
        wrapper.push(i);
    }

    return wrapper.map(pIndex => points[pIndex]);
}

export const segmentIntersect = (p: Segment, q: Segment): boolean => {
    const {a, b} = p;
    const {a: m, b: n} = q;

    // projection of segments on X axis don't overlap - segments
    // don't cross
    if(b.x < m.x || n.x < a.x) {
        return false;
    }

    // if projection of segments on y axis don't overlap
    // segments don't cross
    if(b.y < m.y || n.y < a.y) {
        return false;
    }

    // this means projection intersect but
    // have to check if both endpoints of second
    // are not on the same side
    if(orientation(a, b, m) === orientation(a, b, n)) {
        return false;
    }

    return true;
}
