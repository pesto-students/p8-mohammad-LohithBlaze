function isValidExpression(exp) {
    const stack = [];
    const pairs = {
        '{': '}',
        '[': ']',
        '(': ')'
    };
    for (const char of exp) {
        if (char in pairs) {
            stack.push(char);
        } else {
            if (stack.length === 0 || pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(isValidExpression("{([])}"));
console.log(isValidExpression("{}"));
console.log(isValidExpression("{[]"));

// time complexity is O(n) and space complexity is O(n)