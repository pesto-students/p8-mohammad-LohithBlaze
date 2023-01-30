const findPair = (A, B) => {
    let set = new Set();
    for (let i = 0; i < A.length; i++) {
        if (set.has(A[i] + B) || set.has(A[i] - B)) {
            return 1;
        }
        set.add(A[i]);
    }
    return 0;
}

let A = [5, 10, 3, 2, 50, 80];
let B = 78;
console.log(findPair(A, B));