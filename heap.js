class MaxHeap {
  #maxHeap = [];

  #left(i) {
    return 2 * i + 1
  }
  #right(i) {
    return 2 * i + 2
  }
  #parent(i) {
    return Math.floor((i - 1) / 2)
  }

  /** 访问堆顶元素 */
  peek() {
    return this.#maxHeap[0]
  }

  /** 元素入堆 */
  push(val) {
    this.#maxHeap.push(val)
    this.#shiftUp(this.#maxHeap.length - 1)
  }

  /** 堆化 */
  #shiftUp(i) {
    let p = this.#parent(i)
    while(true) {
      // 若“位置i”没有父节点或者“位置i”小于父节点，则退出
      if (p < 0 || this.#maxHeap[i] <= this.#maxHeap[p]) break
      // 交换位置i和父节点
      [this.#maxHeap[i], this.#maxHeap[p]] = [this.#maxHeap[p], this.#maxHeap[i]]
      // 循环向上堆化
      i = p
      p = this.#parent(i)
    }
  }

  /** 元素出堆 */
  pop() {
    if (this.#maxHeap.length === 0) {
      throw new Error('堆为空')
    }
    // 交换堆顶元素与堆底元素
    [this.#maxHeap[0], this.#maxHeap[this.#maxHeap.length - 1]] = 
      [this.#maxHeap[this.#maxHeap.length - 1], this.#maxHeap[0]]
    // 删除堆底元素（原堆顶）
    const val = this.#maxHeap.pop()
    // 从堆顶开始向下堆化
    this.#shiftDown(0)
    return val
  }

  /** 向下堆化 */
  #shiftDown(i) {
    while (true) {
      const l = this.#left(i)
      const r = this.#right(i)
      let max = i
      // 找出当前节点、左子节点、右子节点中的最大值
      if (l < this.#maxHeap.length && this.#maxHeap[l] > this.#maxHeap[max]) {
        max = l
      }
      if (r < this.#maxHeap.length && this.#maxHeap[r] > this.#maxHeap[max]) {
        max = r
      }
      // 如果当前节点已经是最大值，则堆化完成
      if (max === i) break
      // 否则交换当前节点与最大值节点
      [this.#maxHeap[i], this.#maxHeap[max]] = [this.#maxHeap[max], this.#maxHeap[i]]
      i = max
    }
  }
}


// 给定一个长度为n的无序数组nums ，请返回数组中最大的k个元素。
const nums = [1, 7, 6, 3, 2, 4, 5]
const k = 3

// 时间复杂度：O((n+k)logn)
function topK(nums, k) {
  const heap = new MaxHeap()
  for (const num of nums) {
    heap.push(num)
  }
  const res = []
  for (let i = 0; i < k; i++) {
    res.push(heap.pop())
  }
  return res
}

console.log('topK(nums, k) =', topK(nums, k))
