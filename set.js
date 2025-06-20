let set = new Set();

set.add("red");
set.add("blue");
set.add("green");

console.log('set size:', set.size, set);
const arr = [...set];
console.log('set toArray:', Object.prototype.toString.call(arr), Array.isArray(arr));


