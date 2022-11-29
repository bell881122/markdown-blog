---
title: 'Title'
date: '2022-11-07'
---

接著來看看那些特殊的數字。

## `NaN`
如果使用了並非 `number` 的值進行算術操作，操作失敗的結果則會產生一個不合法的 `number`，也就是 `NaN`。它在字面上代表一個「不是 `numebr` 的 `number`（Not a Number）」，更準確來說，它實際上是一個「失敗」或「壞掉」的數字。

`NaN` 代表 `number` 集合內的一種特殊錯誤情況，也就是「進行數學操作後失敗的 `numebr` 結果」，因此 `NaN` 在型別上來說被歸類於 `number`：
```js
var a = 2 / "foo";
console.log(a); // NaN
console.log(typeof a === "number");	// true
```

但 `NaN` 永遠不會等於任何值，包括它自己：
```js
console.log(NaN === NaN); // false
console.log(NaN == NaN);  // false
```

ES6 以前，可以用 `isNaN` 檢測 `NaN`，但它就如字面所示，檢查一個值「是否不是數字」，並且會試圖將傳入的值轉為數字來檢測：
```js
console.log(isNaN(NaN)); // true
console.log(isNaN("B")); // true
console.log(isNaN(true)); // false，true 被強制轉型視為數字 1
```

ES6 以後新增了 `Number.isNaN` 方法，終於夠精準單一的檢測 `NaN`：
```js
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("B")); // false
console.log(Number.isNaN(true)); // false
```

ES6 以前的填補如下（檢測不等於自己的值）：
```js
if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return n !== n;
	};
}
```

---

## 無窮（Infinities）

JS 中明確定義了「無窮（Infinities）」：
```js
console.log(1 / 0);  // Infinity
```

`1` 除以 `0` 的結果得到 `Infinity`，也就是 `Number.POSITIVE_INFINITY`；同樣地也對應存在 `-Infinity` 和 `Number.NEGATIVE_INFINITY`：
```js
var a = 1 / 0;
console.log(a);  // Infinity
console.log(a === Infinity);  // true
console.log(a === Number.POSITIVE_INFINITY);  // true

var b = -1 / 0;
console.log(b);  // -Infinity
console.log(b === -Infinity);  // true
console.log(b === Number.NEGATIVE_INFINITY);  // true
```

不過無窮是 `number` 專屬的，`bigint` 沒有無窮：
```js
console.log(1n / 0n);
// RangeError: Division by zero
```

先前提到過 JS 使用 IEEE 754 運算標準，也就是說數字的表示形式是有限的，在進行加法或減法等操作時可能溢出可表現的最大／最小值，這種情況下就會得到 `Infinity` 或 `-Infinity` ：
```js
var a = Number.MAX_VALUE;
console.log(a);  // 1.7976931348623157e+308
console.log(a + a);  // Infinity
console.log(a + Math.pow(2, 970));  // Infinity
console.log(a + Math.pow(2, 969));  // 1.7976931348623157e+308
```

> IEEE 754 遵循「就近捨入」模式，粗略意義上，`Number.MAX_VALUE + Math.pow( 2, 969 )` 更接近 `Number.MAX_VALUE`，所以執行「向下捨入」，而`Number.MAX_VALUE + Math.pow( 2, 970 )` 距离 `Infinity` 更更近，所以執行「向上捨入」。

數字一旦溢出無限值，就無法再回到正常數字，也就是有限能夠變成無限，但無限沒法回到有限。

至於「無限除以無限」等於多少？JS 的回答是 `NaN` ：
```js
console.log(Infinity / Infinity); //NaN
```

至於一個有限的數字無以無限呢？等於 `0`：
```js
console.log(1 / Infinity); // 0
console.log(-1 / Infinity); // -0
```

關於 `-0` 的話題，在下面繼續延伸。

---

## 零
JS 一個可能讓人困惑的地方，是它擁有普通的 `0`（正零），同時也擁有一個 `-0`（負零）。

為什麼會需要一個負零呢？在實際情境中，數字的大小表達了「量」，比方說遠近、高低、快慢、輕重；而正負號則表達了「方向」，也就是數字的值是往哪個方向移動的。

舉例來說，如果正數表示正向的座標，而負數表示負向座標，當座標位置歸零時，顯示 `0` 表示當前值是從正值而來的，`-0` 則表示是由負值變化為當前狀態，正負記號保存了關於「方向」的訊息。

在 JS 中，負零可以直接使用字面量定義，也可以從數字操作中得出：
```js
console.log(0 * -3); // -0
console.log(0 / -3); // -0
```

> 有些版本的瀏覽器並不支持負零，而是依然以 `0` 顯示。

將一個負零由 `number` 轉換為 `string` 時，它會顯示為 `0`：
```js
var a = 0 / -3;
console.log(a); // -0

console.log(a.toString());  // "0"
console.log(a + "");  // "0"
console.log(String(a));  // "0"
console.log(JSON.stringify(a));  // "0"
```

然而反向的操作，也就是將字串 `"-0"` 轉為數字 `-0` 則是有效的：
```js
console.log(+"-0"); // -0
console.log(Number("-0")); // -0
console.log(JSON.parse("-0")); // -0
```

如果對 `0` 和 `-0` 進行比較，它們基本上難以區別：
```js
var a = 0;
var b = 0 / -3;

console.log(a == b);  // true
console.log(-0 == 0); // true

console.log(a === b); // true
console.log(-0 === 0); // true

console.log(0 > -0);  // false
console.log(a > b);  // false
```

因此必須倚靠一些特殊方法來判斷：
```js
function isNegZero(n) {
  n = Number(n);
  return (n === 0) && (1 / n === -Infinity);
}

console.log(isNegZero(-0));  // true
console.log(isNegZero(0 / -3));  // true
console.log(isNegZero(0));   // false
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 2: Values](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch2.md)
- [你不懂JS：类型与文法 | 第二章：值](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch2.md)
