//爬楼梯
//假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//输入：n = 2
//输出：2
//解释：有两种方法可以爬到楼顶。
//1. 1 阶 + 1 阶
//2. 2 阶
//输入：n = 3
//输出：3
//解释：有三种方法可以爬到楼顶。
//1. 1 阶 + 1 阶 + 1 阶
//2. 1 阶 + 2 阶
//3. 2 阶 + 1 阶
//1. 确定dp数组以及下标含义
//dp[i]表示爬到第i阶楼梯的方法数
//2. 确定递推公式
//dp[i] = dp[i-1] + dp[i-2]
//3. 初始化
//dp[0] = 1 表示爬到第0阶楼梯的方法数为1
//dp[1] = 1 表示爬到第1阶楼梯的方法数为1
//4. 确定遍历顺序
//从前往后遍历
//5. 举例推导dp数组
//n = 2时，dp[2] = dp[1] + dp[0] = 1 + 1 = 2
//n = 3时，dp[3] = dp[2] + dp[1] = 2 + 1 = 3

const climbStairs = (n: number): number => {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

//空间优化
const climbStairs2 = (n: number): number => {
  if (n === 0) return 1;
  if (n === 1) return 1;
  let prev = 1;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const temp = curr;
    curr = prev + curr;
    prev = temp;
  }
  return curr;
};

//最优子结构
//一个问题的最优解包含其子问题的最优解，则称该问题具有最优子结构。
//使用动态规划求解最优化问题的第一步是刻画最优解的结构，通常我们采用**自底向上**的方式，从较小子问题的解开始，逐步构建较大子问题的解。

const minCostClimbingStairs = (cost: number[]): number => {
  //空间优化
  const n = cost.length;
  let prev = 0;
  let curr = 0;
  for (let i = 2; i <= n; i++) {
    const temp = curr;
    curr = Math.min(curr + cost[i - 1], prev + cost[i - 2]);
    prev = temp;
  }
  return curr;
};

console.log(
  "minCostClimbingStairs([10, 15, 20, 10, 30, 25]) = ",
  minCostClimbingStairs([10, 15, 20, 10, 30, 25])
);

//记录路径
const minCostClimbingStairsWithPath = (
  cost: number[]
): { minCost: number; path: number[] } => {
  const n = cost.length;
  const dp = new Array(n + 1).fill(0); // dp[i]表示到达第i阶的最小花费
  const path = new Array(n + 1).fill(0); // path[i]表示到达第i阶是从哪一阶跳上来的

  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    if (dp[i - 1] + cost[i - 1] < dp[i - 2] + cost[i - 2]) {
      dp[i] = dp[i - 1] + cost[i - 1];
      path[i] = i - 1;
    } else {
      dp[i] = dp[i - 2] + cost[i - 2];
      path[i] = i - 2;
    }
  }

  // 回溯路径
  let resPath = [];
  let i = n;
  while (i > 0) {
    resPath.push(path[i]);
    i = path[i];
  }
  resPath.reverse();

  return { minCost: dp[n], path: resPath };
};
console.log(
  "minCostClimbingStairsWithPath([10, 15, 20, 10, 30, 25]) = ",
  minCostClimbingStairsWithPath([10, 15, 20, 10, 30, 25])
);

// 最小路径和求解
// 给定一个n x m 的二维网格 grid ，网格中的每个单元格包含一个非负整数，表示该单元格的代价。
// 机器人以左上角单元格为起始点，每次只能向下或者向右移动一步，直至到达右下角单元格。请返回从左上角到右下角的最小路径和。
// d[i+1,j+1] = min(d[i+1,j],d[i,j+1]) + grid(i,j) --> d[i, j] = min(d[i, j-1], d[i-1,j]) + grid(i,j)
const testGrid = [
  [1, 3, 1, 5],
  [2, 2, 4, 2],
  [5, 3, 2, 2],
  [4, 1, 1, 2],
];
//暴力搜索
function minPathDfs(grid: number[][], i: number, j: number): number {
  if (i === 0 && j === 0) {
    return grid[i][j];
  }
  if (i < 0 || j < 0) {
    return Infinity;
  }

  const up = minPathDfs(grid, i - 1, j);
  const left = minPathDfs(grid, i, j - 1);
  return Math.min(up, left) + grid[i][j];
}
console.log(
  "minPathDfs => ",
  minPathDfs(testGrid, testGrid.length - 1, testGrid[0].length - 1)
);

//记忆搜索
function minPathDfsWithMemo(
  grid: number[][],
  i: number,
  j: number,
  memo: number[][]
): number {
  if (i === 0 && j === 0) {
    return grid[i][j];
  }
  if (i < 0 || j < 0) {
    return Infinity;
  }
  if (memo[i][j] !== -1) {
    return memo[i][j];
  }
  const up = minPathDfsWithMemo(grid, i - 1, j, memo);
  const left = minPathDfsWithMemo(grid, i, j - 1, memo);
  memo[i][j] = Math.min(up, left) + grid[i][j];
  return memo[i][j];
}
const m = testGrid.length;
const n = testGrid[0].length;
const memo = new Array(m).fill(0).map(() => new Array(n).fill(-1));
console.log(
  "minPathDfsWithMemo => ",
  minPathDfsWithMemo(testGrid, m - 1, n - 1, memo)
);

//动态规划
function minPathDpWithCoords(grid: number[][]): {
  minCost: number;
  path: [number, number][];
} {
  const m = grid.length;
  const n = grid[0].length;
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const path = new Array(m).fill(0).map(() => new Array(n).fill(null));
  dp[0][0] = grid[0][0];
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
    path[i][0] = [i - 1, 0];
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
    path[0][j] = [0, j - 1];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (dp[i - 1][j] < dp[i][j - 1]) {
        dp[i][j] = dp[i - 1][j] + grid[i][j];
        path[i][j] = [i - 1, j];
      } else {
        dp[i][j] = dp[i][j - 1] + grid[i][j];
        path[i][j] = [i, j - 1];
      }
    }
  }
  console.log("path => ", path);
  let i = m - 1;
  let j = n - 1;
  const resPath: [number, number][] = [[i, j]];
  while (i > 0 || j > 0) {
    const prev = path[i][j];
    if (!prev) break;
    [i, j] = prev;
    resPath.push([i, j]);
  }
  return { minCost: dp[m - 1][n - 1], path: resPath.reverse() };
}

console.log("minPathDp => ", minPathDpWithCoords(testGrid));

//空间优化最小路径和
function minPathDpWithSpaceOptimization(grid: number[][]): number {
  const m = grid.length; // 行数
  const n = grid[0].length; // 列数
  const dp = new Array(n).fill(0); // 一维数组，长度为列数
  dp[0] = grid[0][0]; // 起点初始化
  // 初始化第一行
  for (let j = 1; j < n; j++) {
    dp[j] = dp[j - 1] + grid[0][j];
  }
  console.log("dp => ", dp);
  // 处理后续每一行
  for (let i = 1; i < m; i++) {
    dp[0] = dp[0] + grid[i][0]; // 第一列只能从上面下来
    console.log("dp[0] => ", dp[0]);
    for (let j = 1; j < n; j++) {
      // 状态转移：当前位置的最小路径和 = min(左边, 上面) + 当前格子
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
      console.log("dp[j] => ", dp[j]);
    }
    console.log("dp => ", dp);
  }
  return dp[n - 1]; // 最终结果在最后一列
}
console.log(
  "minPathDpWithSpaceOptimization => ",
  minPathDpWithSpaceOptimization(testGrid)
);

/** 0-1背包问题 */
// 给定n个物品，第i个物品的重量为wgt[i-1]、价值为val[i-1] ，和一个容量为cap 的背包。每个物品只能选择一次，问在限定背包容量下能放入物品的最大价值。
// 状态定义：dp[i][j] 表示前i个物品在容量为j的背包中的最大价值
// 状态转移：dp[i][j] = max(dp[i-1][j], dp[i-1][j-wgt[i-1]] + val[i-1])
// 最大价值：dp[n][cap]等于不放回当前物品dp[n-1][cap]和放回当前物品dp[n-1][cap-wgt[n-1]] + val[n-1]的最大值
// 初始化：dp[0][j] = 0 表示没有物品时，背包价值为0，dp[i][0] = 0 表示背包容量为0时，背包价值为0
// 目标：dp[n][cap] 表示前n个物品在容量为cap的背包中的最大价值

const wgt = [10, 20, 30, 40, 50];
const val = [50, 120, 150, 210, 240];
const cap = 50;
// const knapsackMemo = new Array(wgt.length + 1).fill(0).map(() => new Array(cap + 1).fill(0));
// console.log("knapsackMemo => ", knapsackMemo);

// 暴力搜索
function knapsack(
  wgt: number[],
  val: number[],
  cap: number,
  n: number
): number {
  if (n === 0 || cap === 0) {
    return 0;
  }
  // 如果当前物品重量大于背包容量，则不选择该物品
  if (wgt[n - 1] > cap) {
    return knapsack(wgt, val, cap, n - 1);
  }
  // 选择当前物品或不选择当前物品
  const notChoose = knapsack(wgt, val, cap, n - 1);
  const choose = knapsack(wgt, val, cap - wgt[n - 1], n - 1) + val[n - 1];
  console.log("notChoose => ", notChoose, "choose => ", choose);
  return Math.max(notChoose, choose);
}

console.log("knapsack => ", knapsack(wgt, val, cap, wgt.length));

// 记忆化搜索
function knapsackMemo(
  wgt: number[],
  val: number[],
  cap: number,
  n: number,
  memo: number[][]
): number {
  if (n === 0 || cap === 0) {
    return 0;
  }
  if (memo[n][cap] !== 0) {
    return memo[n][cap];
  }
  if (wgt[n - 1] > cap) {
    return knapsackMemo(wgt, val, cap, n - 1, memo);
  }
  const notChoose = knapsackMemo(wgt, val, cap, n - 1, memo);
  const choose =
    knapsackMemo(wgt, val, cap - wgt[n - 1], n - 1, memo) + val[n - 1];
  memo[n][cap] = Math.max(notChoose, choose);
  return memo[n][cap];
}

// 动态规划
function knapsackDp(wgt: number[], val: number[], cap: number): number {
  const n = wgt.length;
  const dp = new Array(n + 1).fill(0).map(() => new Array(cap + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= cap; j++) {
      if (j - wgt[i - 1] < 0) {
        console.log("wgt[i - 1] > j => ", wgt[i - 1], j);
        dp[i][j] = dp[i - 1][j];
      } else {
        const choose = dp[i - 1][j - wgt[i - 1]] + val[i - 1];
        const notChoose = dp[i - 1][j];
        console.log("i,j => ", i, j, wgt[i - 1],"choose => ", choose, "notChoose => ", notChoose);
        dp[i][j] = Math.max(choose, notChoose);
      }
    }
    console.log("i => ", i, "dp[i][j] => ", dp);
  }
  return dp[n][cap];
}

console.log("knapsackDp => ", knapsackDp([1,2,3], [5,11,15], 4));
