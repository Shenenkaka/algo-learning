/* 二叉树节点类 */
class TreeNode {
  val; // 节点值
  left; // 左子节点指针
  right; // 右子节点指针
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/* 初始化二叉树 */
// 初始化节点
  n1 = new TreeNode(4),
  n2 = new TreeNode(2),
  n3 = new TreeNode(6),
  n4 = new TreeNode(1),
  n5 = new TreeNode(3);
  n6 = new TreeNode(8)
  n7 = new TreeNode(9)
  n8 = new TreeNode(10)
  n9 = new TreeNode(11)
// 构建节点之间的引用（指针）
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
n6.left = n1
n8.left = n7
n8.right = n9
n6.right = n8
let root = n6


// // console.log('root => ', root)

// let p = new TreeNode(0)
// root.left = p
// p.left = n2
// // console.log('n2 => ', root)

// /* 层序遍历，深度优先遍历 */
// function breadthFirstTravase(root) {
//   // 初始化队列，加入根节点
//   const queue = [root];
//   // 初始化一个列表，用于保存遍历序列
//   const list = [];
//   while (queue.length) {
//       const node = queue.shift(); // 队列出队
//       list.push(node.val); // 保存节点值
//       if (node.left) queue.push(node.left); // 左子节点入队
//       if (node.right) queue.push(node.right); // 右子节点入队
//   }
//   return list;
// }

// const l = breadthFirstTravase(root)
// // console.log('bfs list => ', l)

// const list = [];
// /** 前序遍历，dfs */
// function preOrder(root) {
//   if (root === null) return;
//   list.push(root.val);
//   preOrder(root.left);
//   preOrder(root.right);
// }
// preOrder(root);
// // console.log("list => ", list);

const binary_search = (num) => {
  let cur = root;
  while (cur !== null) {
    if (cur.val > num) {
      cur = cur.left;
    } else if (cur.val < num) {
      cur = cur.right;
    } else {
      break;
    }
  }
  return cur;
};

const _node = binary_search(3);
// console.log("_node => ", _node);

//binary TreeNode
// === File: binary_search_tree.js ===
/* 插入节点 */
// console.log('insert before => ', root)
function insert(num) {
  // 若树为空，则初始化根节点
  if (root === null) {
    root = new TreeNode(num);
    return;
  }
  let cur = root,
    pre = null;
  // 循环查找，越过叶节点后跳出
  while (cur !== null) {
    // 找到重复节点，直接返回
    if (cur.val === num) return;
    pre = cur;
    // 插入位置在 cur 的右子树中
    if (cur.val < num) cur = cur.right;
    // 插入位置在 cur 的左子树中
    else cur = cur.left;
  }
  // 插入节点
  const node = new TreeNode(num);
  if (pre.val < num) pre.right = node;
  else pre.left = node;
}
insert(5)

// console.log('insert after => ', root)

function traverse(root) {
  const result = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (node) {
      result.push(node.val);
      stack.push(node.right);
      stack.push(node.left);
    }
  }

  return result;
}

const rootValues = traverse(root);
// console.log("rootValues => ", rootValues);


function traverseInOrder(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}

const rootValuesInOrder = traverseInOrder(root);
// console.log("rootValuesInOrder => ", rootValuesInOrder);

function traverseBFSFromRoot(root) {
  const result = [];
  const queue = [root];

  while (queue.length) {
    // console.log('queue => ', queue, result);
    const node = queue.shift(); // 出队
    if (node) {
      result.push(node.val);
      node.left !== null && queue.push(node.left); // 左子节点入队
      node.right !== null && queue.push(node.right); // 右子节点入队
    }
  }

  return result;
}

const rootValuesBFSFromRoot = traverseBFSFromRoot(root);
// console.log("rootValuesBFSFromRoot => ", rootValuesBFSFromRoot);

// 二叉搜索树的中序遍历
function inorderTraversalBST(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    // 一直遍历到左子树最底层
    while (current !== null) {
      
      stack.push(current);
      current = current.left;
    }
    
    // 弹出栈顶节点并访问
    console.log('current => ', stack)
    current = stack.pop();
    result.push(current.val);
    
    // 遍历右子树
    current = current.right;
  }

  return result;
}

const rootValuesBST = inorderTraversalBST(root);
console.log("rootValuesBST => ", rootValuesBST);

// 正确的中序遍历实现
function inorderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    // 一直遍历到左子树最底层
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    
    // 弹出栈顶节点并访问
    current = stack.pop();
    result.push(current.val);
    
    // 转向右子树
    current = current.right;
  }

  return result;
}

const inorderResult = inorderTraversal(root);
console.log("中序遍历结果 => ", inorderResult);



