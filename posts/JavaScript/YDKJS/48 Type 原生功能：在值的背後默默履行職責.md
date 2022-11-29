---
title: 'Title'
date: '2022-11-02'
---

在前面的章節有介紹過，JS 內部擁有一些特殊物件，它們能夠創造出對應的值，這些物件被稱為內建物件（Build-in Objects）。而它們同時也都是 JS 的內建函式（Build-in Functions），有時又稱為原生功能（Natives）。

以下列出一些常用的原生功能：
-   `String`
-   `Number`
-   `Boolean`
-   `Array`
-   `Object`
-   `Function`
-   `RegExp`
-   `Date`
-   `Error`
-   `Symbol`（ES6+）

看到它們統一的開頭大寫，不難猜到，這些函式屬於建構子函式，使用 `new` 調用後會回傳一個物件：

```js
var s = new String("Hello World!");
console.log(s); // String {'Hello World!'}
console.log(typeof s); // object
console.log(s instanceof String); // true
console.log(s.valueOf()); // "Hello World!"
```

創造出來的 `s` 是一個字串的包裝物件，也就是對字串等原生型別調用屬性時，JS 會自動為該值調用的物件包裹器（wrapper），包裝成一個原生型別物件。

```js
var strPrimitive = "I am a string";
console.log(strPrimitive.length);     // 13
console.log(strPrimitive.charAt(3));  // "m"

var strFromWrapper = new String("I am a string from wrapper").valueOf();
console.log(strFromWrapper.length);     // 26
console.log(strFromWrapper.charAt(8));  // "t"
```

---

## 物件的內部標籤
在 JS 中，使用 `typeof` 檢測為 `object` 的值，都會擁有一個內部分類用的標籤屬性，這些屬性無法直接訪問，卻可以用間接方法展示出來：

```js
Object.prototype.toString.call(undefined)         // [object Undefined]
Object.prototype.toString.call(null)              // [object Null]
Object.prototype.toString.call("")                // [object String]
Object.prototype.toString.call(1)                 // [object Number]
Object.prototype.toString.call(true)              // [object Boolean]
Object.prototype.toString.call({})                // [object Object]
Object.prototype.toString.call(function a() { })  // [object Function]
Object.prototype.toString.call([1, 2, 3])         // [object Array]
Object.prototype.toString.call(/regex-literal/i)  // [object RegExp]
Object.prototype.toString.call(new Error("Oh!"))  // [object Error]
```

在 JS 裡並沒有 `Undefined` 和 `Null` 這兩個內建物件，但可以看到，它們依然擁有內部的分類標籤。除此之外，其他值獲取的標籤就分別是它們的內建物件。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 3: Natives](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch3.md)
- [你不懂JS：类型与文法 | 第三章：原生类型](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch3.md)
