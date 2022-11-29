---
title: 'Title'
date: '2022-11-06'
---

JS 的數字具有以下特徵：
- 包含「整數（integer）」和「小數／浮點數（float）」
- JS 沒有真正的整數，整數只是不包含小數部分一個的浮點數
- 小數部分整數如果是 `0` ，則可被省略，如：`.42` 和 `0.42` 一樣是個合法的數字
- 小數部分以後的部分如果是 `0` ，也同樣可被省略。比如 `42.` 和 `42.0000` 都是合法數字
- 預設輸出的字面值數字是十進位小數，並去掉小數末尾以後的 `0`
- 極大或極小的數字預設以指數形式輸出，與 `toExponential` 方法的結果一樣，唯一區別是後者會將結果轉為字串

```js
var a = 0.42;
var b = .42;
var c = 42.;
var d = 42.00000;
var e = 42.344500
var f = 5000000000000000000000;
var g = f.toExponential();

console.log(a); // 0.42
console.log(b); // 0.42
console.log(c); // 42
console.log(d); // 42
console.log(e); // 42.3445
console.log(f); // 5e+21
console.log(g); // "5e+21"
```

## 操作數字位數

### `toFixed`
`toFixed` 能夠指定一個數字被表示時顯示多少位小數，並以字串來表示。如果指定的位數多於實際持有的小數位數，則會在右側補 `0`。
```js
let a = 42.59;

console.log(a.toFixed(0)); // "43"
console.log(a.toFixed(1)); // "42.6"
console.log(a.toFixed(2)); // "42.59"
console.log(a.toFixed(3)); // "42.590"
console.log(a.toFixed(4)); // "42.5900"
```

### `toPrecision`
跟 `toFixed` 類似，只是它是指定共有多少有效位數來表示這個數字，同樣是回傳一個字串。
```js
let a = 42.59;

console.log(a.toPrecision(1)); // "4e+1"
console.log(a.toPrecision(2)); // "43"
console.log(a.toPrecision(3)); // "42.6"
console.log(a.toPrecision(4)); // "42.59"
console.log(a.toPrecision(5)); // "42.590"
console.log(a.toPrecision(6)); // "42.5900"
```

### `.` 操作符
由於 `.` 符號同時也是個合法的數字字符，所以當它遇到數字時，首先位被視為 `number` 的一部分，而不是一個屬性訪問操作符。

不合法的語法：
```js
42.toFixed(3);
// SyntaxError: Invalid or unexpected token
```

合法的語法：
```js
(42).toFixed(3);  // "42.000"
0.42.toFixed(3);  // "0.420"
42..toFixed(3);   // "42.000"
```

## 非十進制
`number` 字面量除了十進制，也可以用其他進制表達：

```
0xf3; // 十六進制的 243
0Xf3; // 十六進制的 243
```
ES6+：
```
0o363; //八進制的 243
0O363; //八進制的 243
0b11110011;	// 二進制的 243
0B11110011;	// 二進制的 243
```

---

## 小數值
二進制浮點數有個最著名的副作用，在所有使用 IEEE 754 的語言中都成立：
```
0.1 + 0.2 === 0.3; // false
```

以上算式不成立的原因簡單來說，二進制無法精確地表示 `0.1` 和 `0.2`，所以當它們相加時，結果不是精確的 `0.3`，而是 `0.30000000000000004` 。

大部分時候，我們對數字的操作只限於整數，而且僅在百萬到億萬大小的數字，這些操作都是安全的。只是在ㄧ些特殊情況下，像是對 `0.1 + 0.2` 與 `0.3` 比較時出現的誤差，要怎麼知道和預防呢？

可以接受的常見做法是使用一個很小的值作為錯誤的「容差（rounding error）」，通常被稱為「機械極小值（machine epsilon）」。

JS 在 ES6 中定義了 `Number.EPSILON` 作為容差值，其值是 `2^-52`（也就是 `2.220446049250313e-16`）。在 ES6 以前的填補會是：
```js
if (!Number.EPSILON) {
	Number.EPSILON = Math.pow(2,-52);
}
```

使用 `Number.EPSILON` 比較兩個數字的相等性時，可以帶入這個容差：
```js
function numbersCloseEnoughToEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}

console.log(numbersCloseEnoughToEqual((0.1 + 0.2), 0.3));  // true
console.log(numbersCloseEnoughToEqual(0.0000001, 0.0000002));  // false
```

---

## 最大與最小數
JS 中最大的數是 `Number.MAX_VALUE`，表示能夠被表示的最大浮點數，大約是 `1.798e+308`；最小的數則是 `Number.MIN_VALUE`，約為 `5e-324`。

---

## 安全整數範圍
一個能夠安全表示，也就是能正確無誤表示出來的整數比 `Number.MAX_VALUE` 要小，只有 `2^53 - 1`，也就是 `9007199254740991`，但對於絕大多數情況下需要的計算已經足夠大。

ES6 以後這個數被自動定義於 `Number.MAX_SAFE_INTEGER`，同時也出現了 `Number.MIN_SAFE_INTEGER`，它的值是 `-9007199254740991` 。

JS 程式面臨如此巨大數字時，無法使用 `number` 型別準確表達，因此在 JS 中必須使用 `string` 來表現、儲存和傳遞。

### `BigInt`
在操作大於或小於最大／最小安全整數時，除了引入外部工具，也可以使用 `BigInt` 這個 ES11 新增的內建物件，表示大於 `2^53` 的整數。

`BigInt` 透過調用 `BigInt()`，或在數字後面加上 `n` 來創建，另外 `BigInt` 的檢測型別是 `bigint`：
```js
console.log(BigInt(Number.MAX_SAFE_INTEGER)); // 9007199254740991n
console.log(BigInt("9007199254740991")); // 9007199254740991n
console.log(BigInt("0x1fffffffffffff")); // 9007199254740991n

// 9007199254740991n 是一個合法的數字
console.log(typeof 9007199254740991n); // bigint
console.log(typeof BigInt(1)); // bigint
// 但使用 Object 包裹時，會被視為普通的物件
console.log(typeof Object(1n)); // object
```

`BigInt` 無法用於內建的 `Math` 方法中：
```js
console.log(Math.abs(BigInt(1n) - BigInt(2n)));
/// TypeError: Cannot convert a BigInt value to a number
```

也不能與 `Number` 混合計算：
```js
console.log(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(Number.MAX_SAFE_INTEGER));
// 18014398509481982n
console.log(Number(Number.MAX_SAFE_INTEGER) + Number(Number.MAX_SAFE_INTEGER));
// 18014398509481982
console.log(Object(9007199254740991n) + Object(9007199254740991n));
// 18014398509481982n
console.log(BigInt(Number.MAX_SAFE_INTEGER) + Number(Number.MAX_SAFE_INTEGER));
// TypeError: Cannot mix BigInt and other types, use explicit conversions
```

由於 `BigInt` 字面意義是「大數字的整數」，所以不接受包含小數的數字：
```js
console.log(Number(0.42));
// 0.42
console.log(BigInt(0.42n));
// SyntaxError: Invalid or unexpected token
```

運算時帶小數的部分也會被捨去：
```js
console.log(4n / 2n); // 2n
console.log(5n / 2n); // 2n
```

一個 `BitInt` 無法嚴格相等等值的 `Number`，但它們彼此是寬鬆相等的：
```js
console.log(0n === 0); // false
console.log(0n == 0); // true
```

`BitInt` 與 `Number` 能夠進行大於／小於比較：
```js
console.log(1n < 2); // true
console.log(2n > 1); // true
console.log(2 > 2); // false
console.log(2n > 2); // false
console.log(2n >= 2); // true
```

`BitInt` 能夠執行 `sort` 的排序，且按照預期排列：
```js
const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
mixed.sort();

console.log(mixed);
// [ -12n, 0, 0n, 10, 4n, 4, 6]
```

由 `Object` 包裹的 `BitInt` 在執行相等比較時會被視為物件，但在大小於比較中被視為數字：
```js
console.log(0n === Object(0n)); // false
console.log(Object(0n) === Object(0n)) // false
console.log(Object(0n) == Object(0n)) // false

const o = Object(0n);
console.log(o === o) // true

console.log(Object(0n) > Object(0n)) // false
console.log(Object(0n) >= Object(0n)) // true
```

---

## 測試整數

### `Number.isInteger` (ES6+)
可以測試一個數是否為整數：
```js
Number.isInteger(42);		  // true
Number.isInteger(42.000);	// true
Number.isInteger(42.3);	  // false
```
ES6 以前的填補：
```js
if (!Number.isInteger) {
  Number.isInteger = function (num) {
    return typeof num == "number" && num % 1 == 0;
  };
}
```

### `Number.isSafeInteger` (ES6+)
測試一個數是否為安全整數：
```js
Number.isSafeInteger(Number.MAX_SAFE_INTEGER);  // true
Number.isSafeInteger(Math.pow(2, 53));  // false
Number.isSafeInteger(Math.pow(2, 53) - 1);  // true
```
ES6 以前的填補：
```js
if (!Number.isSafeInteger) {
  Number.isSafeInteger = function (num) {
    return Number.isInteger(num) &&
      Math.abs(num) <= Number.MAX_SAFE_INTEGER;
  };
}
```

---

## 32 位（有符號）的整數
雖然最大安全整數為九萬億（53 bit）左右，但有些數字操作僅是為 32 位數字定義的，實際安全範圍要小的多，僅在 `Math.pow(-2,31)` （`-2147483648`）到 `Math.pow(2,31)-1` （`2147483647`） 之間。

要強制操作中的變數容納的數字為 32 位值，可以使用 `|` 符號，比方說 `a | 0` ，因為 `|` 符號僅對 32 位值有效，其他數字將被丟棄。

> `NaN` 和 `Infinity` 不屬於「32 位安全（32-bit safe）」的數字，這兩個值被傳入位元運算子（bitwise operator）時，將會通過一個內部的 `ToInt32` 操作，並為了位元運算變成 `+0`。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 2: Values](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch2.md)
- [你不懂JS：类型与文法 | 第二章：值](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch2.md)
- [BigInt | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
