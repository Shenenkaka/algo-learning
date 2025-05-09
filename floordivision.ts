// JavaScript 向下整除的几种实现方式

// 方法1：使用 Math.floor()
function floorDivision1(a: number, b: number) {
    return Math.floor(a / b);
}

// 方法2：使用位运算符（仅适用于正数）
function floorDivision2(a: number, b: number) {
    return (a / b) >> 0;
}

// 方法3：使用 parseInt()
function floorDivision3(a: number, b: number) {
    return Math.floor(a / b);
}

// 测试用例
const floorTestCases = [
    { a: 10, b: 3 },
    { a: -10, b: 3 },
    { a: 10, b: -3 },
    { a: -10, b: -3 }
];

console.log('测试结果：');
floorTestCases.forEach(({ a, b }) => {
    console.log(`\n输入: ${a} / ${b}`);
    console.log(`Math.floor: ${floorDivision1(a, b)}`);
    console.log(`位运算: ${floorDivision2(a, b)}`);
    console.log(`parseInt: ${floorDivision3(a, b)}`);
}); 