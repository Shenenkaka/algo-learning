"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor(capacity) {
        this.front = 0;
        this.queueSize = 0;
        this.nums = new Array(capacity);
    }
    get size() {
        return this.queueSize;
    }
    get capacity() {
        return this.nums.length;
    }
    isEmpty() {
        return this.queueSize === 0;
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error("队列为空");
        }
        return this.nums[this.front];
    }
    push(el) {
        if (this.queueSize === this.capacity) {
            console.log("队列已满");
            return;
        }
        const rear = (this.front + this.queueSize) % this.capacity;
        this.nums[rear] = el;
        this.queueSize++;
    }
    pop() {
        const num = this.peek();
        this.front = (this.front + 1) % this.capacity;
        this.queueSize--;
        return num;
    }
    toArray() {
        const arr = new Array(this.size);
        for (let i = 0, j = this.front; i < this.size; i++, j++) {
            arr[i] = this.nums[j % this.capacity];
        }
        return arr;
    }
}
exports.default = Queue;
const q = new Queue(5);
q.push(1);
q.push(2);
q.push(3);
q.push(4);
q.push(5);
q.pop();
q.push(6);
console.log('queue: ', q.toArray(), q.front);
