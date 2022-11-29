---
title: 'Title'
date: '2022-11-15'
---

`+` 是 JS 中的一個一元運算子，除了在數學中表達加號以外，也作為字串的連接運算子。當運算元型別不同時，會按照情況作出強制轉型。

> 即便 `+` 運算子在字面上沒有明確的轉型表意，但在大多數時候，它被視為一種明確的強制轉型操作。

---

## 字串連接

前面一篇已經說明，任何型別的值與字串「相加」，都會被轉型為字串，例如：
```js
console.log(3.14 + ""); // "3.14"
```

---

## 數學符號

首先來看看 `+` 運算子如何被視為數學運算：
```js
console.log(Number("3.14")); // 3.14
console.log(+"3.14");        // 3.14
console.log(+"a string");    // NaN
```
`+"3.14"` 和 `Number("3.14")` 達成了同樣的效果，將 `"3.14"` 轉型為 `number` ；無法轉為合法 `number` 的值則獲得 `NaN` 。

那與另一個 `number` 一起操作呢？
```js
console.log(5 +"3.14");  // "53.14"
console.log(5+ +"3.14");  // 8.14
console.log(5++"3.14");
// SyntaxError: Invalid left-hand side expression in postfix operation
```

`5 +"3.14"` 就像上一篇所說，另一個型別「加上」 `string` 時，會被強制轉型為 `string`。

`5+ +"3.14"` 中，第二個 `+` 先將 `"3.14"` 轉型為 `number`，接著才用第一個 `+` 和 `5` 相加，獲得 `8.14`。

至於 `5++"3.14"` 呢？`++` 是遞增運算子，與 `+` 是完全不同的符號，`5++"3.14"` 這樣的語法是不被允許的，程式回報了 `SyntaxError` 錯誤。

接著來看看其他型別：
```js
console.log(+true);      // 1
console.log(+null);      // 0
console.log(+undefined); // NaN
console.log(+[]);        // 0 (由 "" 轉型而來)
console.log(+{});        // NaN
console.log(+function(){}); // NaN

console.log(+Symbol("my symbol"));
// TypeError: Cannot convert a Symbol value to a number
```

上面可以看到，每個型別強制轉型為 `number` 的結果。`symbol` 同樣不允許非字面表意的轉型，會出現 `TypeError`。

---

## 不同型別「相加」

### 物件的「相加」

先來看看以下例子：
```js
console.log([1, 2] + [3, 4]); // "1,23,4"
```

這裡的 `array` 執行了 `ToPrimitive` 操作，也就是試圖藉由 `valueOf()` 或 `toString()` 得到一個簡單基本類型，最後獲得 `"1,2"` 和 `"3,4"` 兩個字串，於是最後執行 `"1,2" + "3,4"` 運算。

`obj + ""` 與 `String(obj)` 兩者的不同之處在於：`obj + ""` 的轉型是 `ToPrimitive`，首先會調用 `valueOf` 接著才是 `toString`；而 `String(obj)` 則直接調用 `toString` 方法。
```js
var obj = {
  valueOf: function () { return 42; },
  toString: function () { return 4; }
};

console.log(obj + "");    // "42"
console.log(String(obj)); // "4"

var arr = [1,2]
arr.valueOf = function () { return 42; }

console.log(arr + arr);    // 84
console.log(String(arr)); // "1,2"，array 預設的 toString 方法
```

最後來看看 `{}` 與 `[]` 使用 `+` 運算子後的結果，除了 `{} + [];` 以外，其他都返回了 `string` ：
```js
{} + []; // 0
// {}被視為區塊語句而不是物件字面值，整個語句相當於「+[]」
// 依照執行環境不同，也可能得出不同的結果

[] + {}; // "[object Object]"
// [] 返回 ""，{} 返回 "[object Object]"

{} + {}; // "[object Object][object Object]"
// 兩個 {} 都返回 "[object Object]"

[] + []; // ""
// 兩個 [] 都返回 ""，結果等同於「"" + ""」
```

---

## 其他型別的「相加」
`boolean`、`null` 和 `undefined` 的相加，都被視為數學運算：
```js
console.log(true + true); // 2
console.log(null + null); // 0
console.log(undefined + undefined); // NaN
```

---

## Date 到 Number
除了內建型別外，`+` 運算子也能將 `date` 轉換為 `number`，並得到這個 `date` 的 Unix 時間戳記（Unix timestamp）。

```js
var timestamp = new Date("Mon, 18 Aug 2014 08:53:06 CDT");
console.log(+timestamp); // 1408369986000

// 取得當前時間戳
var nowTimestamp = +new Date();
console.log(nowTimestamp);
```

> 每個 `date` 的時間戳記，指的是從 1970 年 1 月 1 日 0 時 0 分 0 秒，直到 `date` 所標示時間，中間經過的毫秒數。

> 有一種取巧的寫法是，使用 `new` 運算子時，後方的函式若沒有傳遞參數，可省略 `()` 符號，因此像是 `var timestamp = +new Date;` 這樣語法是合法且有效的。

以下方式也可以獲得同樣的時間戳記：
```js
// 1~4 的寫法都是相同的操作

var timestamp1 = new Date().getTime();
var timestamp2 = (new Date()).getTime();
var timestamp3 = (new Date).getTime();

// ES5 新增的方法
var timestamp4 = Date.now();
```

`Date.now` 在 ES5 以前的填補：
```js
if (!Date.now) {
  Date.now = function () {
    return +new Date();
  };
}
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
