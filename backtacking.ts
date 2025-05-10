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

const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4, null, null), new TreeNode(5, null, null)),
  new TreeNode(3, new TreeNode(6, null, null), new TreeNode(7, null, null))
);
console.log("前序遍历");
const res: TreeNode[][] = [];
const path: TreeNode[] = [];
preOrder(root, path, res);
console.log("结果 : ", res, path);

const preorderArray: number[] = [];
const preOrderIterative = (root: TreeNode, target: number) => {
  const stack: TreeNode[] = [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    preorderArray.push(node.val);
    if (node.val === target) {
      r = node;
    }
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
};
// console.log('迭代回溯')
// preOrderIterative(root, 5)
// console.log('结果 : ', r);
// console.log('前序遍历结果 : ', preorderArray);

//框架代码
const isSolution = (state: any) => {
  return true;
};
const recordSolution = (state: any, res: any) => {
  return;
};
const makeChoice = (state: any, choice: any) => {
  return;
};
const undoChoice = (state: any, choice: any) => {
  return;
};
function backtracking(state: any, choices: any, res: any) {
  if (isSolution(state)) {
    // 记录解
    recordSolution(state, res);
    return;
  }
  for (let choice of choices) {
    makeChoice(state, choice);
    backtracking(state, choices, res);
    undoChoice(state, choice);
  }
}

/**
 * 全排列
 * 请注意，虽然 selected 和 duplicated 都用于剪枝，但两者的目标不同。
 * 重复选择剪枝：整个搜索过程中只有一个 selected 。它记录的是当前状态中包含哪些元素，其作用是避免某个元素在 state 中重复出现。
 * 相等元素剪枝：每轮选择（每个调用的 backtrack 函数）都包含一个 duplicated 。它记录的是在本轮遍历（for 循环）中哪些元素已被选择过，其作用是保证相等元素只被选择一次。
 */
const permutationBacktracking = (
  state: number[],
  choices: number[],
  res: number[][],
  selected: boolean[]
) => {
  if (state.length === choices.length) {
    res.push([...state]);
    return;
  }
  const duplicate = new Set();
  for (let i = 0; i < choices.length; i++) {
    if (selected[i] || duplicate.has(choices[i])) continue;
    duplicate.add(choices[i]);
    selected[i] = true;
    state.push(choices[i]);
    permutationBacktracking(state, choices, res, selected);
    selected[i] = false;
    state.pop();
  }
};
//全排列
const fullPermutation = (nums: number[]) => {
  const res: number[][] = [];
  const state: number[] = [];
  const choices: number[] = nums;
  const selected: boolean[] = Array(nums.length).fill(false);
  permutationBacktracking(state, choices, res, selected);
  return res;
};

console.log("全排列 : ", fullPermutation([1, 2, 2, 3]));

//子集合问题
const subsetBacktracking = (
  state: number[],
  target: number,
  start: number,
  nums: number[],
  res: number[][]
) => {
  if (target === 0) {
    res.push([...state]);
    return;
  }
  for (let i = start; i < nums.length; i++) {
    if (target - nums[i] < 0) break;
    state.push(nums[i]);
    subsetBacktracking(state, target - nums[i], i, nums, res);
    state.pop();
  }
};
const subsetSum = (nums: number[], target: number) => {
  const res: number[][] = [];
  const state: number[] = [];
  nums.sort((a, b) => a - b);
  subsetBacktracking(state, target, 0, nums, res);
  return res;
};
console.log("子集合问题 : ", subsetSum([1, 2, 3, 4, 5], 5));

//N皇后问题
/* 回溯算法：n 皇后 */
function backtrack(
  row: number,
  n: number,
  state: string[][],
  res: string[][][],
  cols: boolean[],
  diags1: boolean[],
  diags2: boolean[]
) {
  // 当放置完所有行时，记录解
  if (row === n) {
    console.log("state : ", state);
    res.push(state.map((row) => row.slice()));
    return;
  }
  // 遍历所有列
  for (let col = 0; col < n; col++) {
    // 计算该格子对应的主对角线和次对角线
    const diag1 = row - col + n - 1;
    const diag2 = row + col;
    // 剪枝：不允许该格子所在列、主对角线、次对角线上存在皇后
    if (cols[col] || diags1[diag1] || diags2[diag2]) continue;
    // 尝试：将皇后放置在该格子
    state[row][col] = "Q";
    cols[col] = diags1[diag1] = diags2[diag2] = true;
    // 放置下一行
    backtrack(row + 1, n, state, res, cols, diags1, diags2);
    // 回退：将该格子恢复为空位
    state[row][col] = "#";
    cols[col] = diags1[diag1] = diags2[diag2] = false;
  }
}

/* 求解 n 皇后 */
function nQueens(n: number) {
  // 初始化 n*n 大小的棋盘，其中 'Q' 代表皇后，'#' 代表空位
  const state = Array.from({ length: n }, () => Array(n).fill("#"));
  const cols = Array(n).fill(false); // 记录列是否有皇后
  const diags1 = Array(2 * n - 1).fill(false); // 记录主对角线上是否有皇后
  const diags2 = Array(2 * n - 1).fill(false); // 记录次对角线上是否有皇后
  const res: string[][][] = [];

  backtrack(0, n, state, res, cols, diags1, diags2);
  return res;
}
console.log("N皇后问题 : ", nQueens(4));
