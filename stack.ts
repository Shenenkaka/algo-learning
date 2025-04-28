class Stack {
  arr: any[];

  constructor(arr: any[] = []) {
    this.arr = arr;
  }
  //出栈
  pop() {
    return this.arr.pop();
  }
  //入栈
  push(el: any) {
    this.arr.push(el);
  }

  peek() {
    return this.arr[this.arr.length - 1];
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  get size() {
    return this.arr.length;
  }
}

const stackList = new Stack();
stackList.push(1);
stackList.push(2);
stackList.push(3);
stackList.push(4);
stackList.push(5);
console.log(stackList.size);
