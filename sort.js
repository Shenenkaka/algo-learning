//给定一个数组，请将数组中的元素按升序排列。

// 冒泡排序，时间复杂度$O(n^2)$，空间复杂度$O(1)$
function bubbleSort(arr) {
  const n = arr.length
  // 外层循环：未排序区间为[0, n-1]
  for (let i = 0; i < n - 1; i++) {
    // 内层循环：未排序区间为[0, n-1-i]
    for (let j = 0; j < n - 1 - i; j++) {
      // 若相邻元素顺序错误，则交换
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
}