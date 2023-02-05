class Queue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    push(x) {
        this.s1.push(x);
    }

    pop() {
        if (this.s2.length === 0) {
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2.pop();
    }
}

// time complexity is O(n) and space complexity is O(n) 