---
title: 'Title'
date: '2022-11-01'
---

結束了物件和原型的介紹，接著來看看 JS 裡的型別吧。

所謂的型別（Types），是指一組固有、內建的性質，對引擎和開發者來說，這些性質標誌了一個特定值的行為，並將它與其他型別的值區分開來。

JS 屬於弱型別（Weak Typing）語言，不具有型別強制（Type enforcement）。也就是說， JS 程式不會強制一個變數從頭到尾必須持有同個型別的值，可以在任何時候改變為任何值。

因此在 JS 中，變數沒有型別，只有值才擁有型別。對一個變數使用如 `typeof` 這類判斷型別的方法，實際上是在詢問這個變數內的值是什麼型別。

> 作為 JavaScript 的超集合（superset）語言，TypeScript 能夠限制一個變數的型別，可以視為強型別版本的 JS。除此之外，TypeScript 也提供了許多 JS 核心沒有的功能，並與 JS 的更新同步，保證所有 JS 語法都和 TypeScript 相容。

---

## 內建型別（Built-in Types）
JS 定義了 8 種內建型別，其中唯一非原生型別（Non-primitive），也就是`object` 底下另外擁有 2 種子型別：
- `boolean`
- `null`
- `undefined`
- `string`
- `number`
- `bigint`（ES11+）
- `symbol`（ES6+）
- `object`
	- `array`
	- `function`

---

## 你摸不透的 `typeof`
在 JS 中，檢視型別一種常見的的方法是使用 `typeof` 運算子，它會回傳一個字串表示檢測值的型別。

```js
typeof true           === "boolean";   // true
typeof null           === "object";    // true
typeof undefined      === "undefined"; // true
typeof 42             === "number";    // true
typeof 42n            === "bigint";    // true
typeof "42"           === "string";    // true
typeof Symbol()       === "symbol";    // true
typeof { life: 42 }   === "object";    // true
typeof [1,2,3]        === "object";    // true
typeof function a(){} === "function";  // true
```

使用 `typeof` 時有些需要注意的地方。從上面可以看到，原生型別中絕大多數型別都返回了它自己的型別，但 `typeof null` 的返回值卻是 `object` 而非 `null`。所以如果要檢測一個值是否為 `null`，較常見的方法是使用 `if (val === null)` 或 `if(!val && typeof val === "object")`。除此之外，`null` 也是唯一一個 `typeof` 檢測為 `object`，卻為 `falsy` 的值。

另外在物件的子型別中，`typeof function foo(){}` 的返回值是 `function` ，但 `typeof []` 的返回值卻是 `object` 而非 `array`。如果需要檢測一個值的內容是否為 `Array`，可以使用 ES5 新增的 `Array.isArray(myArr)`。

---

### `undefined` 與 undeclared

在 JS 中，已宣告但還未賦值的變數，會被賦予預設值 `undefined`，因此能夠正常查詢並取得值。

而存取一個作用域中未宣告（undeclared）的變數則會出現 `ReferenceError`，因為這個變數「is not defined」，程式無法在記憶體中找到對應的參考：

```js
var a;

console.log(a); // undefined
console.log(b); // ReferenceError: b is not defined
```

雖然容易讓人混淆，但在 JS 中，「undefined」和「is not defined」確實是兩件完全不同的事情。

### `typeof` 與未宣告

如果使用 `typeof` 檢測一個從未宣告過的變數，當它找不到該變數的參考時，同樣會返回一個 `undefined`，是 `typeof` 本身防止錯誤發生的機制：

```js
var a;

console.log(typeof a); // undefined
console.log(typeof b); // undefined
```

利用這個安全機制，可以迴避程式遇到未宣告變數時報錯的問題：

```js
// 程式將因找不到 DEBUG 而報錯
if (DEBUG) {
  console.log("Debugging is starting");
}

// 使用 typeof 免去變數存在性問題
if (typeof DEBUG !== "undefined") {
  console.log("Debugging is starting");
}
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 1: Types](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch1.md)
- [你不懂JS：类型与文法 | 第一章：类型](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch1.md)
- [JavaScript 的資料型別與資料結構 | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures)
