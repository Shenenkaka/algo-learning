"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MaxHeap_instances, _MaxHeap_maxHeap, _MaxHeap_left, _MaxHeap_right, _MaxHeap_parent, _MaxHeap_shiftUp, _MaxHeap_shiftDown;
class MaxHeap {
    constructor() {
        _MaxHeap_instances.add(this);
        _MaxHeap_maxHeap.set(this, []);
    }
    /** 访问堆顶元素 */
    peek() {
        return __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[0];
    }
    /** 元素入堆 */
    push(val) {
        __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").push(val);
        __classPrivateFieldGet(this, _MaxHeap_instances, "m", _MaxHeap_shiftUp).call(this, __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").length - 1);
    }
    /** 元素出堆 */
    pop() {
        if (__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").length === 0) {
            throw new Error('堆为空');
        }
        // 交换堆顶元素与堆底元素
        [__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[0], __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").length - 1]] =
            [__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").length - 1], __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[0]];
        // 删除堆底元素（原堆顶）
        const val = __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").pop();
        // 从堆顶开始向下堆化
        __classPrivateFieldGet(this, _MaxHeap_instances, "m", _MaxHeap_shiftDown).call(this, 0);
        return val;
    }
}
_MaxHeap_maxHeap = new WeakMap(), _MaxHeap_instances = new WeakSet(), _MaxHeap_left = function _MaxHeap_left(i) {
    return 2 * i + 1;
}, _MaxHeap_right = function _MaxHeap_right(i) {
    return 2 * i + 2;
}, _MaxHeap_parent = function _MaxHeap_parent(i) {
    return Math.floor((i - 1) / 2);
}, _MaxHeap_shiftUp = function _MaxHeap_shiftUp(i) {
    let p = __classPrivateFieldGet(this, _MaxHeap_instances, "m", _MaxHeap_parent).call(this, i);
    while (true) {
        // 若"位置i"没有父节点或者"位置i"小于父节点，则退出
        if (p < 0 || __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[i] <= __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[p])
            break;
        // 交换位置i和父节点
        [__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[i], __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[p]] = [__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[p], __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[i]];
        // 循环向上堆化
        i = p;
        p = __classPrivateFieldGet(this, _MaxHeap_instances, "m", _MaxHeap_parent).call(this, i);
    }
}, _MaxHeap_shiftDown = function _MaxHeap_shiftDown(i) {
    while (true) {
        const l = __classPrivateFieldGet(this, _MaxHeap_instances, "m", _MaxHeap_left).call(this, i);
        const r = __classPrivateFieldGet(this, _MaxHeap_instances, "m", _MaxHeap_right).call(this, i);
        let max = i;
        // 找出当前节点、左子节点、右子节点中的最大值
        if (l < __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").length && __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[l] > __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[max]) {
            max = l;
        }
        if (r < __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f").length && __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[r] > __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[max]) {
            max = r;
        }
        // 如果当前节点已经是最大值，则堆化完成
        if (max === i)
            break;
        // 否则交换当前节点与最大值节点
        [__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[i], __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[max]] = [__classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[max], __classPrivateFieldGet(this, _MaxHeap_maxHeap, "f")[i]];
        i = max;
    }
};
// 给定一个长度为n的无序数组nums ，请返回数组中最大的k个元素。
const nums = [1, 7, 6, 3, 2, 4, 5];
const k = 3;
// 时间复杂度：O((n+k)logn)
function topK(nums, k) {
    const heap = new MaxHeap();
    for (const num of nums) {
        heap.push(num);
    }
    const res = [];
    for (let i = 0; i < k; i++) {
        res.push(heap.pop());
    }
    return res;
}
console.log('topK(nums, k) =', topK(nums, k));
