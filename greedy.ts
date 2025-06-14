/** 零钱兑换问题 */

function greedyCoinChange(coins: number[], amount: number): number {
  // 将硬币按面值降序排序
  coins.sort((a, b) => b - a);
  let count = 0;
  for (const coin of coins) {
    if (amount >= coin) {
      count += Math.floor(amount / coin);
      amount %= coin;
    }
  }
  return count;
}
console.log("贪心法 硬币数：", greedyCoinChange([1, 2, 5], 11));

const coinFaceValue: number[] = [];
/* 零钱兑换：贪心 */
function coinChangeGreedy(coins: number[], amt: number): number {
  coins.sort((a, b) => a - b);
  let i = coins.length - 1;
  let count = 0;
  // 循环进行贪心选择，直到无剩余金额
  while (amt > 0) {
    // 找到小于且最接近剩余金额的硬币
    while (i > 0 && coins[i] > amt) {
      i--;
    }
    console.log("i => ", i);
    // 选择 coins[i]
    coinFaceValue.push(coins[i]);
    amt -= coins[i];
    count++;
  }
  // 若未找到可行方案，则返回 -1
  return amt === 0 ? count : -1;
}

console.log(
  "贪心法 硬币数：",
  coinChangeGreedy([1, 20, 50], 60),
  coinFaceValue
);

class KnapsackItem {
  weight: number;
  value: number;
  ratio: number;
  constructor(weight: number, value: number) {
    this.weight = weight;
    this.value = value;
    this.ratio = value / weight;
  }
}

/** 分数背包问题 */
function fractionalKnapsack(items: KnapsackItem[], capacity: number): number {
  const n = items.length;
  items.sort((a, b) => b.ratio - a.ratio);
  let totalValue = 0;
  let remainingCapacity = capacity;
  for (let i = 0; i < n; i++) {
    if (remainingCapacity >= items[i].weight) {
      totalValue += items[i].value;
      remainingCapacity -= items[i].weight;
    } else {
      totalValue += items[i].ratio * remainingCapacity;
      break;
    }
  }
  return totalValue;
}

console.log(
  "分数背包问题：",
  fractionalKnapsack(
    [
      new KnapsackItem(10, 60),
      new KnapsackItem(20, 100),
      new KnapsackItem(30, 120),
    ],
    50
  )
);
