---
title: 'Title'
date: '2022-11-18'
---

## 寬鬆與嚴格相等
JS 的相等比較有兩種：
- 寬鬆相等
	- 使用 `==` 運算子
	- 如果兩者型別不同，比較時「會執行」強制轉型
- 嚴格相等
	- 使用 `===` 運算子
	- 比較時「不允許」強制轉型

> `==` 和 `===` 都會檢查運算元的型別，當兩個運算元型別相同時，`==` 執行的內容和 `===` 一樣；但遇到型別不同的運算元時，`==` 會對運算元執行強制轉型，`===` 則直接回傳 `false` 。

> 就性能上來說，由於 `==` 在兩者型別不同時需要額外處理強制轉型，所以效能會比 `===` 稍差，但差距不大，約僅在幾微秒之間。

### 相等比較的基本規則
- 當比較的值型別相同時，執行嚴格相等比較（`===`）
- 當比較的值型別不同時，寬鬆相等比較會進行強制轉型，直到兩者型別相同才做比較
- 物件和物件的比較僅在「參考」完全相同時相等，不會發生強制轉型
- `!=` （寬鬆不相等）是執行 `==` （寬鬆相等）獲得結果的取反；而`!==` （嚴格不相等）是執行 `===` （嚴格相等）獲得結果的取反

相等比較有一些與預期不同的例外：
- `NaN` 永遠不等於任何值，包括它自己
- `+0` 和 `-0` 是相等的，即便是嚴格相等

### String 與 Number
```js
console.log(42 === "42"); // false
console.log(42 == "42");  // true
```
`string` 與 `number` 進行寬鬆相等比較時， `string` 會執行 ToNumber 來進行比較。

### String 與 BigInt
```js
console.log(42n === "42"); // false
console.log(42n == "42");  // true
```
`string` 與 `bigInt` 進行寬鬆相等比較時， `string` 會執行 ToBigInt 來進行比較。

### Number 與 BigInt
```js
console.log(42n === 42); // false
console.log(42n == 42);  // true
console.log(0n === 0);  // false
console.log(0n == 0);  // true
```
同樣的數字，`number` 與 `bigInt` 寬鬆相等，但不嚴格相等。

### 任意型別與 Boolean
```js
42      == true;  // false (42 == 1)
"42"    == true;  // false ("42" == 1)
"true"  == true;  // false ("true" == 1)
0       == false; // true  (0 == 0)
""      == false; // true  ("" == 0)
"false" == false; // false ("false" == 0)

"true"  == true;  // false ("true" == 1) -> (NaN == 1)
"false" == false; // false ("false" == 0) -> (NaN == 0)
```
寬鬆相等比較時，如果任一方是 `boolean` ，`boolean` 將被轉為 `number` 後執行比較。

與一個 `boolean` 值比較相等性，並不是測試真假值，其中不會包含任何 ToBoolean 的行為。

因此在判斷式中不推薦使用像是 `x == true` 這樣的語句，很可能會產生預期之外的結果；直接測試真假值，以及轉型為 `boolean` 來測試條件會是更好的做法：
```js
var a = "42";

if (a == true) {
  console.log("never run!")
}

if (a) {
  console.log("fine")
}

if (!!a) {
  console.log("good")
}

if (Boolean(a)) {
  console.log("better")
}
```

### `null` 與 `undefined`
```js
console.log(null == undefined);  // true
console.log(undefined == null);  // true

console.log(null == 0);          // false
console.log(null == "");         // false
console.log(null == false);      // false
console.log(undefined ==  0);    // false
console.log(undefined == "");    // false
console.log(undefined == false); // false
```

`null` 與 `undefined` 和彼此寬鬆相等，除此之外，它們不寬鬆相等於任何其他值。

因此像下面這樣，替換 `null` 與 `undefined` 的判斷式是安全的：
```js
let app;

if (app == null) {
  app = doSomething();
}
```

### Object 與非 Object
當 `object` 與非 `object` 比較時，`object` 會執行 ToPrimitive 操作。
```js
console.log(["42"] == 42) // true
console.log([1, 2] == "1,2") // true
console.log([] == "") // true
console.log([] == 0) // true

var str = "abc";
var strObj = Object(str); // 等同於 new String(str)
console.log(str == strObj); // true
console.log(str === strObj); // false
```

### 修改 `prototype`
由於物件的強制轉型是調用內建方法，修改內建原生 `prototype` 可能導致某些意外狀況：
```js
Number.prototype.valueOf = function () {
  return 3;
};

console.log(new Number(2) == 3); // true
```

讓 `a == 2` 且 `a == 3` 成立：
```js
var i = 2;

Number.prototype.valueOf = function() {
	return i++;
};

var a = new Number( 42 );

if (a == 2 && a == 3) {
	console.log( "Yep, this happened." );
}
```

### False 值比較
```js
false == null; // false
false == undefined; // false
false == NaN; // false
false == 0; // true (0 == 0)
false == ""; // true (0 == "") -> (0 == 0)
false == []; // true (0 == []) -> (0 == "") -> (0 == 0)

"" == null; // false
"" == undefined; // false
"" == NaN; // false
"" == 0; // true (0 == 0)
"" == []; // true ("" == "")

0 == null; // false
0 == undefined; // false
0 == NaN; // false
0 == []; // true (0 == "") -> (0 == 0)
```

#### `"0"` 與 `falsy` 比較
```js
"0" == null; // false
"0" == undefined; // false
"0" == false; // true ("0" == 0) -> (0 == 0)
"0" == NaN; // false
"0" == 0; // true (0 == 0)
"0" == ""; // false
```

### 例外狀況
```js
[] == ![];
// true ([] == false) -> ([] == 0) -> ("" == 0) -> (0 == 0)

2 == [2];
// true (2 == "2") -> (2 == 2)

"" == [null];
// true ("" == "")

0 == "\n";
// true (0 == 0)
```

### 相等比較表
![Equality in JavaScript](https://raw.githubusercontent.com/CuiFi/You-Dont-Know-JS-CN/master/types%20%26%20grammar/fig1.png)
圖片來源：[You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/fig1.png)

#### 安全地使用隱含強制轉型
當任一運算元出現以下幾種值時，使用寬鬆相等比較可能導致非預期的結果，建議改為使用嚴格相等比較：
- `true`
- `false`
- `0`
- `""`
- `[]`

---

## 大小於比較
`<` 和 `>` 運算子在遇到不同型別的運算元時，執行了和 `==` 規則相同的強制轉型。而 `a >= b` 的值是 `a < b` 結果的取反；`a <= b` 的值則是 `a > b` 的取反。

```js
console.log("42" < 43); // true
console.log([42] < ["43"]); // true
console.log(-1 < false); // true

console.log("42" < "043"); // false，字串比較，"0" 小於 "4"
console.log([4, 2] < [0, 4, 3]); // false，字串比較
console.log({ b: 42 } < { b: 43 }); // false，字串比較
console.log({ b: 42 } > { b: 43 }); // false，字串比較
console.log({ b: 42 } <= { b: 43 }); // true， > 的取反
console.log({ b: 42 } >= { b: 43 }); // true， < 的取反

console.log([42] < "043"); // false，字串比較
console.log(Number([42]) < Number("043")); // true，數字比較
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
