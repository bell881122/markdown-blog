---
title: 'Title'
date: '2022-11-13'
---

## ToPrimitive
物件與陣列的強制轉型將觸發 ToPrimitive 操作，它首先會判斷要轉型為哪種純量基本值，並根據要轉換的型別執行不同的行為。

1. `boolean`：如果要轉為 `boolean`，所有物件的 `boolean` 轉換都是 `true`。
2. `string`：如果要轉為 `string`，程式首先會查詢這個物件是否擁有 `toString` 方法，如果有且 `toString` 返回一個純量基本值，這個值就會用於強制轉型；如果 `toString` 無法得到上述結果，則會調用 `valueOf` 方法；如果這兩種操作都無法提供一個純量基本值，則會拋出一個 `TypeError`。
3. `number`：轉為 `number` 的狀況與 `string` 十分類似，唯一的差別是轉型 `number` 會先調用 `valueOf`，接著才是 `toString`。

首先檢視 `object` 與 `array` 預設的轉換結果：
```js
console.log(String([]));    // ""
console.log(Number([]));    // 0
console.log([].toString()); // ""
console.log([].valueOf());  // []，非純量基本值

console.log(String([1]));   // "1"
console.log(Number(["1"])); // 1

console.log(String([1, 2, 3])); // "1,2,3"
console.log(Number([1, 2, 3])); // NaN

console.log(String({}));    // [object Object]
console.log(Number({}));    // NaN
console.log({}.toString()); // "[object Object]"
console.log({}.valueOf());  // {}，非純量基本值

console.log(Number(new Number(10)));     // 10
console.log((new Number(10)).valueOf()); // 10

console.log(String(function(){})); // function(){}
console.log(Number(function(){})); // NaN
```

實際修改 `toString` 與 `valueOf` 範例：
```js
var a = {
  toString: () => "42",
  valueOf: () => "24",
};

console.log(String(a));       // 42
console.log(Number(a));       // 24

var b = [4, 2];
b.toString = function () {
  return this.join("");
};
b.valueOf = function () {
  return this.join("0");
};

console.log(String(b));       // 42
console.log(Number(b));       // 402
```

當 `toString` 或 `valueOf` 其中一種方法未定義時，則調用另一種方法；如果兩種方法皆未定義，或無法返回一個純量基本值，則回報 `TypeError`：
```js
var c = {
  toString: undefined,
  valueOf: () => 42,
};
console.log(String(c)); // "42"

var d = {
  toString: () => "24",
  valueOf: undefined,
};
console.log(Number(d)); // 24

var e = {
  toString: undefined,
  valueOf: undefined,
};
console.log(String(e));
// TypeError: Cannot convert object to primitive value

var f = {
  toString: () => ({}), // 只返回一個複合值
  valueOf: undefined,
};
console.log(Number(f));
// TypeError: Cannot convert object to primitive value
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
- [強制轉型 - parseInt、Number、ToPrimitive、Boolean](https://tw.coderbridge.com/series/9e5162da940f473a9f1cfeece124ee98/posts/e04b35a3e0d343019e5577136cdbf870)
