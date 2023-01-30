const threeSumClosest = (S, target) => {
    S.sort((a, b) => a - b);
    let closestSum = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < S.length - 2; i++) {
        let j = i + 1;
        let k = S.length - 1;
        while (j < k) {
            let currentSum = S[i] + S[j] + S[k];
            if (currentSum === target) {
                return currentSum;
            } else if (currentSum < target) {
                j++;
            } else {
                k--;
            }
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }
        }
    }
    return closestSum;
}

let S = [-1, 2, 1, -4];
let target = 1;
console.log(threeSumClosest(S, 1));
