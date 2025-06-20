function binarySearch(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 11;
const result = binarySearch(arr, target);
// console.log(result);

// 二分查找插入位置无重复元素
function binarySearchInsertPosition(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) {
      return mid; // 如果找到目标值，返回其位置
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // 循环结束时，left 指向第一个大于 target 的元素的位置
  // 或者数组末尾（如果所有元素都小于 target）
  return left;
}

// 测试用例
const testCases = [
  { arr: [1, 3, 5, 7], target: 4, expected: 2 }, // 插入中间
  { arr: [1, 3, 5, 7], target: 0, expected: 0 }, // 插入开头
  { arr: [1, 3, 5, 7, 8], target: 7, expected: 4 }, // 插入末尾
  { arr: [1, 3, 5, 7], target: 3, expected: 1 }, // 已存在
  { arr: [], target: 5, expected: 0 }, // 空数组
];

// testCases.forEach(({ arr, target, expected }) => {
//     const result = binarySearchInsertPosition(arr, target);
//     console.log(`数组: [${arr}], 目标值: ${target}`);
//     console.log(`插入位置: ${result}, 预期: ${expected}`);
//     console.log(`插入后数组: [${[...arr.slice(0, result), target, ...arr.slice(result)]}]`);
//     console.log('---');
// });

// 二分查找插入点（存在重复元素）
function binarySearchInsertLeftPositionWithDuplicates(
  arr: number[],
  target: number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) {
      right = mid - 1; // 向左移动，继续查找第一个出现的重复元素
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

//查找左边界
/* 二分查找最左一个 target */
function binarySearchLeftEdge(nums: number[], target: number) {
  // 等价于查找 target 的插入点
  const i = binarySearchInsertLeftPositionWithDuplicates(nums, target);
  console.log("i:", i, target);
  // 未找到 target ，返回 -1
  if (i === nums.length || nums[i] !== target) {
    return -1;
  }
  // 找到 target ，返回索引 i
  return i;
}
// console.log('查找左边界：',binarySearchLeftEdge([1,3,4,5],5));

// 测试用例 - 查找左边界
const leftEdgeTestCases = [
  { nums: [1, 3, 5, 7], target: 9, expected: -1 }, // 目标值大于所有元素
  { nums: [1, 3, 5, 7], target: 0, expected: -1 }, // 目标值小于所有元素
  { nums: [1, 3, 5, 7], target: 4, expected: -1 }, // 目标值在数组中不存在
  { nums: [1, 3, 5, 7], target: 5, expected: 2 }, // 目标值存在
  { nums: [], target: 5, expected: -1 }, // 空数组
];

// leftEdgeTestCases.forEach(({ nums, target, expected }) => {
//     const result = binarySearchLeftEdge(nums, target);
//     console.log(`数组: [${nums}], 目标值: ${target}`);
//     console.log(`结果: ${result}, 预期: ${expected}`);
//     console.log('---');
// });

// 二分查找插入点，找到最右边的target（存在重复元素）
function binarySearchInsertRightPositionWithDuplicates(
  nums: number[],
  target: number
) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) {
      left = mid + 1; // 向右移动，继续查找最后一个出现的重复元素
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}

function binarySearchRightEdge(nums: number[], target: number) {
  const i = binarySearchInsertRightPositionWithDuplicates(nums, target);
  if (i === nums.length || nums[i] !== target) {
    return -1;
  }
  return i;
}

// console.log('查找右边界：',binarySearchRightEdge( [1,3,4,4,4,4,5],4));

// 测试用例 - 查找右边界
const rightEdgeTestCases = [
  { nums: [1, 3, 5, 7], target: 9, expected: -1 }, // 目标值大于所有元素
  { nums: [1, 3, 5, 7], target: 0, expected: -1 }, // 目标值小于所有元素
  { nums: [1, 3, 5, 7], target: 4, expected: -1 }, // 目标值在数组中不存在
  { nums: [1, 3, 5, 7], target: 5, expected: 2 }, // 目标值存在
  { nums: [], target: 5, expected: -1 }, // 空数组
];

// rightEdgeTestCases.forEach(({ nums, target, expected }) => {
//     const result = binarySearchRightEdge(nums, target);
//     console.log(`数组: [${nums}], 目标值: ${target}`);
//     console.log(`结果: ${result}, 预期: ${expected}`);
//     console.log('---');
// });

/**
 * 给定一个整数数组 nums 和一个目标元素 target ，
 * 请在数组中搜索"和"为 target 的两个元素，
 * 并返回它们的数组索引。
 * 返回任意一个解即可。
 */
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// 哈希优化策略 - 合并循环版本
function twoSumHash(nums: number[], target: number): number[] {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        // 先检查是否已经存在 complement
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        // 如果当前数字不在 map 中，才添加到 map
        if (!map.has(nums[i])) {
            map.set(nums[i], i);
        }
    }
    return [];
}

// 测试用例
const twoSumTestCases = [
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { nums: [3, 3], target: 6, expected: [0, 1] }
];

twoSumTestCases.forEach(({ nums, target, expected }) => {
    const result = twoSumHash(nums, target);
    console.log(`数组: [${nums}], 目标值: ${target}`);
    console.log(`结果: ${result}, 预期: ${expected}`);
    console.log('---');
});

// 测试用例 - 包含多个重复数字
const duplicateTestCases = [
    { nums: [3, 3, 3, 3], target: 6, expected: [0, 1] },  // 多个重复的3
    { nums: [2, 2, 3, 3], target: 5, expected: [0, 2] },  // 多个2和3
    { nums: [1, 2, 2, 2, 3], target: 4, expected: [0, 4] },  // 多个2
    { nums: [1, 1, 1, 2, 2, 2], target: 3, expected: [0, 3] }  // 多个1和2
];

console.log('多个重复数字测试：');
duplicateTestCases.forEach(({ nums, target, expected }) => {
    const result = twoSumHash(nums, target);
    console.log(`数组: [${nums}], 目标值: ${target}`);
    console.log(`结果: ${result}, 预期: ${expected}`);
    console.log('---');
});
