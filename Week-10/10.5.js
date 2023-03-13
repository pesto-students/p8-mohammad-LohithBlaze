function findJudge(n, trust) {
    const trustCounts = new Array(n + 1).fill(0);

    for (const [i, j] of trust) {
        trustCounts[i]--;
        trustCounts[j]++;
    }

    for (let i = 1; i <= n; i++) {
        if (trustCounts[i] === n - 1) {
            return i;
        }
    }

    return -1;
}

// time complexity is O(E) and space complexity is O(N)
