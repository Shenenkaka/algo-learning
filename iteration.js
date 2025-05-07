"use strict";
function forLoop(n) {
    let res = 0;
    for (let index = 0; index <= n; index++) {
        res += index;
    }
    return res;
}
console.log('forLoop => ', forLoop(100));
function whileLoop(n) {
    let [i, res] = [0, 0];
    while (i <= n) {
        res += i;
        i += 1;
    }
    return res;
}
console.log('whileLoop =>', whileLoop(100));
