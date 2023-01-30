const sortColors = (nums) => {
    let low = 0;
    let high = nums.length - 1;
    let mid = 0;
    while (mid <= high) {
        switch (nums[mid]) {
            case 0:
                [nums[low], nums[mid]] = [nums[mid], nums[low]];
                low++;
                mid++;
                break;
            case 1:
                mid++;
                break;
            case 2:
                [nums[mid], nums[high]] = [nums[high], nums[mid]];
                high--;
                break;
        }
    }
    return nums;
}

let nums = [0, 2, 1, 2, 0];
console.log(sortColors(nums));
