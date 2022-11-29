---
title: 'Title'
date: '2022-11-12'
---

## ToString
ToString 定義了一個非 `string` 該如何以 `string` 表現。除了 `null` 與 `undefined` 沒有包裝物件以外，其他基本型別的包裝物件上都擁有自己的 `toString()` 方法，當一個非 `string` 執行 ToString 操作時，基本上就是調用 `toString()` 方法：
```js
// Number
console.log(String(42)); // "42"
console.log((42).toString()); // "42"

// BigInt
console.log(String(10n)); // "10"
console.log((10n).toString()); // "10"

// Boolean
console.log(String(true)); // "true"
console.log(true.toString()) // "true"

// Symbol
console.log(String(Symbol("my symbol"))); // "Symbol(my symbol)"
console.log(Symbol("my symbol").toString()); // "Symbol(my symbol)"

// null 與 undefined 沒有包裝物件，因此也沒有 toString 方法
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"
```

物件的 ToString 實際上是 ToPrimitive（後文解釋）：
```js
// Object
console.log(String({})); // "[object Object]"
console.log({}.toString()); // "[object Object]"

// Array
console.log(String([])); // ""
console.log([].toString()); // ""
console.log(String([1, 2, 3])); // "1,2,3"
console.log([1, 2, 3].toString()); // "1,2,3"

// Function
console.log(String(function abc() { })); // function abc() { }
console.log((function abc() { }).toString()); // function abc() { }
```

---

## ToNumber
當任何非 `number` 的值作為 `number` 來操作時，這個值將會被強制轉型為 `number`：
```js
console.log(true * 1); // 1
console.log(false * 1); // 0
console.log(null * 1); // 0
console.log(undefined * 1); // NaN
```

`string` 轉 `number` 的規則本上與數字字面量的語法相同，如果轉換失敗，則會返回 `NaN`。要注意的是，八進制開頭的 `0` 在轉換時會被忽略，直接視為十進位的字面值：
```js
console.log("A" * 1); // NaN
console.log("42" * 1); // 42
console.log("0x2a" * 1); // 42，十六進制轉十進制

console.log(052 === 42); //true，八進制的 42 與十進制的 42
console.log("052" * 1); // 52，八進制開頭的 0 會被忽略，直接視為十進制
```

與 ToString 相同，物件的 ToNumber 實際上是 ToPrimitive（後文解釋）：
```js
console.log([] * 1);  // 0
console.log([2] * 1); // 2
console.log({} * 1);  // NaN
```

---

## ToBoolean
接著聊聊 JS 的值如何轉型為 `boolean`，`boolean` 只有兩個值，不是 `true` 就是 `false`，下面來看看其他值如何轉為這兩者的其中之一。

#### 假值（Falsy Values）
在 JS 中，只有以下幾個值在轉為 `boolean` 時會得到 `false`，因此它們也被稱為假值（Falsy Values）：
- `undefined`
- `null`
- `false`
- `""`
- `+0`
- `-0`
- `0n`（BigInt）
- `-0n`（BigInt）
- `NaN`

#### 真值（Truthy Values）
所有不在假值列表中的值都屬於真值（Truthy Values），也就是被轉為 `boolean` 時結果為 `true` 的值。

在 JS 中，所有的物件都是真值，即便它們內部是空的，或者它是一個擁有假值的包裝物件：
```js
console.log(Boolean({})); // true
console.log(Boolean([])); // true
console.log(Boolean(function () { })); // true

console.log(Boolean(new Boolean(false))); // true
console.log(Boolean(new Number(0))); // true
console.log(Boolean(new String(""))); // true
```

字串就僅有空字串（`""`）是假值，其他都是擁有內容的字串，因此屬於真值：
```js
console.log(Boolean("false")); // true
console.log(Boolean("0")); // true
console.log(Boolean("''")); // true
```

#### 假值物件（Falsy Object）
所謂的假值物件，是指一部分不屬於 JS 內部的物件，它們看起來和用起來都像個普通物件，但當被強制轉型為 `boolean` 時會得到一個 `false`。

比方說 DOM 提供的 `document.all` 這個物件，除了部分舊版本的瀏覽器以外，大多數瀏覽器將它轉換為 `boolean` 時都返回了 `false`。
```js
Boolean(document.all); // false
```

雖然 `document.all` 已被棄用，但它在部分程式碼中仍然存在，在沿用舊程式碼時，是需要注意的一個陷阱。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
- [強制轉型 - parseInt、Number、ToPrimitive、Boolean](https://tw.coderbridge.com/series/9e5162da940f473a9f1cfeece124ee98/posts/e04b35a3e0d343019e5577136cdbf870)
- [Falsy | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)
- [document.all | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/all)
