function isValidBST(root) {
    function isValidBSTHelper(node, lowerBound, upperBound) {
        if (!node) {
            return true;
        }

        if (node.val <= lowerBound || node.val >= upperBound) {
            return false;
        }

        return isValidBSTHelper(node.left, lowerBound, node.val) &&
            isValidBSTHelper(node.right, node.val, upperBound);
    }

    return isValidBSTHelper(root, -Infinity, Infinity);
}

const root = {
    val: 5,
    left: {
        val: 1,
        left: null,
        right: null
    },
    right: {
        val: 4,
        left: {
            val: 3,
            left: null,
            right: null
        },
        right: {
            val: 6,
            left: null,
            right: null
        }
    }
};

console.log(isValidBST(root)); // Output: false

// O(n) time complexity and O(n) space complexity
