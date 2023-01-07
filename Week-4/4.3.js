let fib = {
    [Symbol.iterator]: function () {
        let n = 10;
        let i = 1;
        let old = 0, new1 = 0;
        return {
            next: function () {
                if (i++ <= n) {
                    [old, new1] = [new1, (old + new1) || 1];
                    return {
                        value: old,
                        done: false
                    }
                }
                else {
                    return { done: true }
                }
            }
        }
    }
};

for (let num of fib) {
    console.log(num);
}