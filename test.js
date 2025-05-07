"use strict";
var _a, _b;
const foo = [];
const bar = (_b = (_a = foo[0]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.match(/[0-9]+/g);
console.log(bar);
// 验证字符串是否为有效的Base64格式
function isValidBase64(str) {
    try {
        return btoa(atob(str)) === str;
    }
    catch (e) {
        return false;
    }
}
// Base64编码
function encodeBase64(str) {
    return btoa(str);
}
// Base64解码
function decodeBase64(base64Str) {
    return atob(base64Str);
}
const testBool = false;
if (testBool) {
    console.log('true');
}
else {
    console.log('false');
}
