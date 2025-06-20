// 选择排序
function selectionSort(nums: number[]) {
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
function bubbleSort(nums: number[]) {
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
    if (!flag) break;
  }
  return nums;
}
// bubbleSort([3,2,1,4,5])
// console.log('bubbleSort: ', bubbleSort([3,2,1,4,5]))

// 插入排序
function insertionSort(nums: number[]) {
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

function partition(nums: number[], left: number, right: number) {
  let pivot = nums[left];
  let i = left;
  let j = right;
  while (i < j) {
    while (i < j && nums[j] >= pivot) j--;
    while (i < j && nums[i] <= pivot) i++;
    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  console.log("基准数交换", nums);
  [nums[left], nums[i]] = [nums[i], nums[left]];
  return i;
}
function quickSortHelper(nums: number[], left: number, right: number) {
  if (left >= right) return;
  let pivot = partition(nums, left, right);
  console.log("pivot: ", pivot);
  console.log("nums: ", nums);
  quickSortHelper(nums, left, pivot - 1);
  quickSortHelper(nums, pivot + 1, right);
}
// 快速排序
function quickSort(nums: number[]) {
  let n = nums.length;
  quickSortHelper(nums, 0, n - 1);
  return nums;
}

// console.log("quickSort: ", quickSort([3, 6, 1, 0, 4, 5]));

/* 合并左子数组和右子数组 */
function merge(nums: number[], left: number, mid: number, right: number) {
  // 创建一个临时数组，用于存放合并后的结果
  const tempArray = new Array(right - left + 1);
  
  // 初始化三个指针：
  // leftIndex: 左子数组的当前位置
  // rightIndex: 右子数组的当前位置
  // tempIndex: 临时数组的当前位置
  let leftIndex = left;
  let rightIndex = mid + 1;
  let tempIndex = 0;
  
  // 当两个子数组都还有元素时，比较并合并
  while (leftIndex <= mid && rightIndex <= right) {
    // 如果左子数组的元素小于等于右子数组的元素
    if (nums[leftIndex] <= nums[rightIndex]) {
      // 将左子数组的元素放入临时数组
      tempArray[tempIndex] = nums[leftIndex];
      // 移动左子数组的指针
      leftIndex = leftIndex + 1;
    } else {
      // 将右子数组的元素放入临时数组
      tempArray[tempIndex] = nums[rightIndex];
      // 移动右子数组的指针
      rightIndex = rightIndex + 1;
    }
    // 移动临时数组的指针
    tempIndex = tempIndex + 1;
  }
  
  // 如果左子数组还有剩余元素，将它们全部复制到临时数组
  while (leftIndex <= mid) {
    tempArray[tempIndex] = nums[leftIndex];
    leftIndex = leftIndex + 1;
    tempIndex = tempIndex + 1;
  }
  
  // 如果右子数组还有剩余元素，将它们全部复制到临时数组
  while (rightIndex <= right) {
    tempArray[tempIndex] = nums[rightIndex];
    rightIndex = rightIndex + 1;
    tempIndex = tempIndex + 1;
  }
  
  // 将临时数组中的元素复制回原数组
  for (let i = 0; i < tempArray.length; i++) {
    nums[left + i] = tempArray[i];
  }
  
  console.log('合并后的数组: ', nums);
}

/* 归并排序 - 递归版本 */
function mergeSortRecursive(nums: number[], left: number, right: number) {
  // 终止条件
  if (left >= right) return; // 当子数组长度为 1 时终止递归
  
  // 划分阶段
  let mid = Math.floor(left + (right - left) / 2); // 计算中点
  console.log('递归过程 - left:', left, 'mid:', mid, 'right:', right, 'nums:', nums);
  
  // 递归处理左右子数组
  mergeSortRecursive(nums, left, mid); // 递归左子数组
  mergeSortRecursive(nums, mid + 1, right); // 递归右子数组
  
  // 合并阶段
  merge(nums, left, mid, right);
}

/* 归并排序 - 迭代版本 */
function mergeSortIterative(nums: number[]) {
  const n = nums.length;
  // 子数组大小从1开始，每次翻倍
  for (let size = 1; size < n; size *= 2) {
    // 每次处理两个相邻的子数组
    for (let left = 0; left < n - size; left += size * 2) {
      // 计算中间位置和右边界
      const mid = left + size - 1;
      const right = Math.min(left + size * 2 - 1, n - 1);
      console.log('merge: ', nums, left, mid, right);
      // 合并这两个子数组
      merge(nums, left, mid, right);
    }
  }
  return nums;
}

// 测试代码
const testArray = [3, 6, 1, 5, 4];
console.log('原始数组：', testArray);

// 测试递归版本
const recursiveArray = [...testArray];
console.log('\n=== 递归版本 ===');
mergeSortRecursive(recursiveArray, 0, recursiveArray.length - 1);
console.log('递归排序结果：', recursiveArray);

// 测试迭代版本
const iterativeArray = [...testArray];
console.log('\n=== 迭代版本 ===');
mergeSortIterative(iterativeArray);
console.log('迭代排序结果：', iterativeArray);

function shiftDown(nums: number[], i: number, heapSize: number) {
  // 获取左右子节点
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  console.log('left: ', left, 'right: ', right);
  // 找出最大元素
  let largest = i;
  if (left < heapSize && nums[left] > nums[largest]) {
    largest = left;
  }
  
  if (right < heapSize && nums[right] > nums[largest]) {
    largest = right;
  }

  // 如果最大元素不是当前节点，则交换并继续堆化
  if (largest !== i) {    
    [nums[i], nums[largest]] = [nums[largest], nums[i]];
    shiftDown(nums, largest, heapSize);
  }
}

// 堆排序
function heapSort(nums: number[]) {
  // 建堆
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    shiftDown(nums, i, nums.length);
  }
  // 排序
  for (let i = nums.length - 1; i > 0; i--) {
    // 交换堆顶元素与堆底元素
    [nums[0], nums[i]] = [nums[i], nums[0]];
    // 堆化堆顶元素
    shiftDown(nums, 0, i);
  }
  return nums;
} 

// 测试堆排序
console.log('堆排序结果：', heapSort([3, 6, 1, 5, 4]));

// 桶排序
function bucketSort(nums: number[]) {
  const k = nums.length / 2;
  // 初始化桶
  const buckets:number[][] = [];
  for (let i = 0; i < k; i++) {
    buckets.push([]);
  }
  // 将元素分配到桶中
  for (let i = 0; i < nums.length; i++) {
    const bucketIndex = Math.floor(nums[i] * k);
    buckets[bucketIndex].push(nums[i]);
  }
  // 对每个桶进行排序
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
  }
  // 合并结果
  return buckets.flat();
}


const bucketSortNums = [3, 6, 1, 5, 4];
const normalizedBucketSortNums = bucketSortNums.map(num => num / 10);
// 测试桶排序
console.log('桶排序结果：', bucketSort(normalizedBucketSortNums).map(num => num * 10));  

//计数排序
function countingSort(nums: number[]) {
  const max = Math.max(...nums)
  const counter = new Array(max + 1).fill(0)
  for (let i = 0; i < nums.length; i++) {
    counter[nums[i]]++
  }
  let i = 0
  for (let j = 0; j < counter.length; j++) {
    while (counter[j] > 0) {
      nums[i] = j
      i++
      counter[j]--
    }
  }
  return nums
}

console.log('计数排序结果：', countingSort([3, 6, 1, 5, 4]));

function getDigit(num: number, exp: number) {
  return Math.floor(num / exp) % 10
}
function radixCountingSort(nums: number[], exp: number) {
  const counter = new Array(10).fill(0)
  const n = nums.length
  // 统计每个数字出现的次数
  for (let i = 0; i < n; i++) {
    const d = getDigit(nums[i], exp)
    counter[d]++
  }
  // 计算每个数字的累加次数
  for (let i = 1; i < 10; i++) {
    counter[i] += counter[i - 1]
  }
  // console.log('counter: ', counter);
  // 计算每个数字的输出位置
  const output = new Array(n).fill(0)
  let i = n - 1
  while (i >= 0) {
    const d = getDigit(nums[i], exp)
    output[counter[d] - 1] = nums[i]
    counter[d]--
    i--
  }
  // 将排序后的数字放回原数组
  for (let i = 0; i < n; i++) {
    nums[i] = output[i]
  } 
  return nums
} 
// 基数排序
function radixSort(nums: number[]) {
  // 找到最大值
  let m = Number.MIN_VALUE
  for(const num of nums) {
    if(num > m) {
      m = num
    }
  }
  // 从个位开始，依次进行基数排序
  let exp = 1
  while (m / exp > 0) {
    radixCountingSort(nums, exp)
    exp *= 10
  }
  return nums
}

console.log('基数排序结果：', radixSort([34545, 66466, 12345, 12346, 54321, 43210]));
