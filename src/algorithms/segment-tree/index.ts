export const createTree = (values: Array<number>): Array<number> => {
    const n = values.length;
    const tree = new Array(n * 2).fill(0);

    for (let i = 0; i < n; i++) {
        tree[i] = values[n - i - 1];
    }
    tree.reverse();

    for (let k = n - 1; k > 0; k--) {
        tree[k] = tree[2 * k] + tree[2 * k + 1];
    }

    return tree;
}

export const set = (i: number, x: number, tree: Array<number>, n: number): void => {
    let idx = i + n;
    tree[idx] = x;
    idx = Math.floor(idx / 2);
    for (; idx > 0; idx = Math.floor(idx / 2)) {
        tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
}

// [l, r]
export const query = (l: number, r: number, tree: Array<number>, n: number): number => {
    let s = 0;
    let ll = l + n;
    let rr = r + n;

    while (ll <= rr) {
        if (ll % 2 === 1) {
            s += tree[ll];
            ll++;
        }

        if (rr % 2 === 0) {
            s += tree[rr];
            rr -= 1;
        }

        ll = Math.floor(ll / 2);
        rr = Math.floor(rr / 2);
    }

    return s;
}