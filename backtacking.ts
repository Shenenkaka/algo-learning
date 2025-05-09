class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
let r: TreeNode | null = null;
let p: number[] = [];
/* 前序遍历：例题二 */
function preOrder(root: TreeNode, path: TreeNode[], res: TreeNode[][]) {
  if (root === null) {
      return;
  }
  // 尝试
  path.push(root);
  if (root.val === 7) {
      // 记录解
      res.push([...path]);
  }
  if (root.left) preOrder(root.left, path, res);
  if (root.right) preOrder(root.right, path, res);
  // 回退
  path.pop();
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(4, null, null), new TreeNode(5, null, null)), new TreeNode(3, new TreeNode(6, null, null), new TreeNode(7, null, null)));
console.log('前序遍历');
const res: TreeNode[][] = [];
const path: TreeNode[] = [];
preOrder(root, path, res)
console.log('结果 : ', res, path);

const preorderArray: number[] = []; 
const preOrderIterative = (root: TreeNode, target: number) => {
  const stack: TreeNode[] = [];
  stack.push(root);
  while(stack.length) {
    const node = stack.pop();
    if(!node) continue
    preorderArray.push(node.val)
    if(node.val === target) {
      r = node;
    }
    if(node.right) stack.push(node.right);
    if(node.left) stack.push(node.left);
  }
}
// console.log('迭代回溯')
// preOrderIterative(root, 5)
// console.log('结果 : ', r);
// console.log('前序遍历结果 : ', preorderArray);

