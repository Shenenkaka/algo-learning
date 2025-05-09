interface Point {
  x: number;
  y: number;
}

function getDist(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// 用于比较两个点对是否相同
function isSamePair(pair1: [Point, Point], pair2: [Point, Point]): boolean {
  return (
    (pair1[0].x === pair2[0].x &&
      pair1[0].y === pair2[0].y &&
      pair1[1].x === pair2[1].x &&
      pair1[1].y === pair2[1].y) ||
    (pair1[0].x === pair2[1].x &&
      pair1[0].y === pair2[1].y &&
      pair1[1].x === pair2[0].x &&
      pair1[1].y === pair2[0].y)
  );
}

//寻找最近点
function closestPair(points: Point[]): {
  distance: number;
  pairs: [Point, Point][];
} {
  // 如果点数小于2，返回空数组
  if (points.length < 2) {
    return { distance: Infinity, pairs: [] };
  }

  const sortedPoints = [...points].sort((a, b) => a.x - b.x);

  function findClosestPair(
    left: number,
    right: number
  ): { distance: number; pairs: [Point, Point][] } {
    // 基本情况：如果只有2个或3个点，直接计算
    if (right - left <= 2) {
      let minDist = Infinity;
      let pairs: [Point, Point][] = [];

      for (let i = left; i < right; i++) {
        for (let j = i + 1; j <= right; j++) {
          const dist = getDist(sortedPoints[i], sortedPoints[j]);
          if (dist < minDist) {
            minDist = dist;
            pairs = [[sortedPoints[i], sortedPoints[j]]];
          } else if (Math.abs(dist - minDist) < 1e-10) {
            // 使用一个小的误差范围
            const newPair: [Point, Point] = [sortedPoints[i], sortedPoints[j]];
            // 检查是否已存在相同的点对
            if (!pairs.some((pair) => isSamePair(pair, newPair))) {
              pairs.push(newPair);
            }
          }
        }
      }
      return { distance: minDist, pairs };
    }

    // 分治
    const mid = Math.floor((left + right) / 2);
    const leftResult = findClosestPair(left, mid);
    const rightResult = findClosestPair(mid + 1, right);

    // 获取左右两边的最小距离
    let minDist = Math.min(leftResult.distance, rightResult.distance);
    let pairs: [Point, Point][] = [];

    // 只收集距离等于最小距离的点对
    if (Math.abs(leftResult.distance - minDist) < 1e-10) {
      pairs.push(...leftResult.pairs);
    }
    if (Math.abs(rightResult.distance - minDist) < 1e-10) {
      pairs.push(...rightResult.pairs);
    }

    // 检查跨越中线的点对
    const midX = sortedPoints[mid].x;
    const strip = sortedPoints
      .filter((p) => Math.abs(p.x - midX) < minDist)
      .sort((a, b) => a.y - b.y);

    // 在strip中寻找更近的点对
    for (let i = 0; i < strip.length; i++) {
      for (let j = i + 1; j < Math.min(i + 7, strip.length); j++) {
        const dist = getDist(strip[i], strip[j]);
        if (dist < minDist) {
          minDist = dist;
          pairs = [[strip[i], strip[j]]];
        } else if (Math.abs(dist - minDist) < 1e-10) {
          const newPair: [Point, Point] = [strip[i], strip[j]];
          // 检查是否已存在相同的点对
          if (!pairs.some((pair) => isSamePair(pair, newPair))) {
            pairs.push(newPair);
          }
        }
      }
    }

    return { distance: minDist, pairs };
  }

  return findClosestPair(0, sortedPoints.length - 1);
}

// 测试代码
const points: Point[] = [
  { x: 2, y: 3 },
  { x: 12, y: 30 },
  { x: 40, y: 50 },
  { x: 5, y: 1 },
  { x: 12, y: 10 },
  { x: 3, y: 4 },
  { x: 23, y: 44 },
  { x: 13, y: 11 },
];


const closestPairResult = closestPair(points);
console.log("\n最近点对的距离:", closestPairResult.distance);
console.log("所有最近点对:");
closestPairResult.pairs.forEach((pair, index) => {
  console.log(
    `${index + 1}. (${pair[0].x},${pair[0].y}) 和 (${pair[1].x},${pair[1].y})`
  );
});

const dfs = (nums: number[], target: number, left: number, right: number):number => {
  //递归结束条件
  if (left > right) {
    return -1;
  }
  const mid = Math.floor((left + right) / 2);
  if (nums[mid] === target) {
    return mid;
  } else if (nums[mid] < target) {
    return dfs(nums, target, mid + 1, right);
  } else {
    return dfs(nums, target, left, mid - 1);
  }
};

const bs = (nums: number[], target: number) => {
  return dfs(nums, target, 0, nums.length - 1);
};

// 测试代码
const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tagetNum = 5;
const searchResult = bs(num, tagetNum);
console.log(`二分查找结果: ${searchResult}`);

const move = (src: number[], tar: number[]) => {
  const pan = src.pop();
  tar.push(pan!);
};
const dfsHanoi = (a: number[], b: number[], c: number[], n: number) => {
  if (n === 1) {
    move(a, c);
    return;
  }
  dfsHanoi(a, c, b, n - 1);
  move(a, c);
  dfsHanoi(b, a, c, n - 1);
};
//汉诺塔问题
const solveHanoi = (A: number[], B: number[], C: number[]) => {
  dfsHanoi(A, B, C, A.length);
};
console.log("汉诺塔问题");
const A = [6, 5, 4, 3, 2, 1];
const B: number[] = [];
const C: number[] = [];
solveHanoi(A, B, C);
console.log(A, B, C);
