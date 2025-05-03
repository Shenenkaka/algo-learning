"use strict";
// 选择排序
function selectionSort(nums) {
    let n = nums.length;
    // 外循环：未排序区间为 [i, n-1]
    for (let i = 0; i < n - 1; i++) {
        // 内循环：找到未排序区间内的最小元素
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j; // 记录最小元素的索引
            }
        }
        // 将该最小元素与未排序区间的首个元素交换
        [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    }
    return nums;
}
// console.log('selectionSort: ', selectionSort([3, 1, 2, 4, 5]))
// 冒泡排序
function bubbleSort(nums) {
    let n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        console.log("nums: ", nums);
        let flag = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
                flag = true;
            }
        }
        if (!flag)
            break;
    }
    return nums;
}
// bubbleSort([3,2,1,4,5])
// console.log('bubbleSort: ', bubbleSort([3,2,1,4,5]))
// 插入排序
function insertionSort(nums) {
    let n = nums.length;
    for (let i = 1; i < n; i++) {
        let base = nums[i];
        let j = i - 1;
        // 后移元素
        while (j >= 0 && nums[j] > base) {
            nums[j + 1] = nums[j];
            j--;
        }
        // 插入元素
        nums[j + 1] = base;
    }
    return nums;
}
function partition(nums, left, right) {
    let pivot = nums[left];
    let i = left;
    let j = right;
    while (i < j) {
        while (i < j && nums[j] >= pivot)
            j--;
        while (i < j && nums[i] <= pivot)
            i++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    [nums[left], nums[i]] = [nums[i], nums[left]];
    return i;
}
function quickSortHelper(nums, left, right) {
    if (left >= right)
        return;
    let pivot = partition(nums, left, right);
    console.log("pivot: ", pivot);
    console.log("nums: ", nums);
    quickSortHelper(nums, left, pivot - 1);
    quickSortHelper(nums, pivot + 1, right);
}
// 快速排序
function quickSort(nums) {
    let n = nums.length;
    quickSortHelper(nums, 0, n - 1);
    return nums;
}
console.log("quickSort: ", quickSort([3, 6, 1, 0, 4, 5]));
