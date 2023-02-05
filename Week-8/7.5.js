function nextGreaterElement(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        let nextGreater = -1;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[i]) {
                nextGreater = arr[j];
                break;
            }
        }
        result.push(nextGreater);
    }
    return result;
}


console.log(nextGreaterElement([1, 3, 2, 4]));

// time complexity is O(n^2) and space complexity is O(n) 