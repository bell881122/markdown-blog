---
title: 'Title'
date: '2022-11-04'
---

一如前面所說，在絕大多數情況下，除了 ES6 新增的 `Symbol` 以外，所有型別都可以使用字面值直接創造，而不需要調用它們的內建函式。

所以如果確定是必要的，而且明確知道需要使用它，否則手動替某個型別創造一個包裝物件，大多時候並不是好選項，它可能會帶來一些意料外的結果。

與此相反，JS 的某些功能只能使用內建函式，或者雖然可以由字面值定義，但調用內建函式會是更好的選項。

---

## 陣列（Array）
以下來比較看看幾種建立陣列的方法：

```js
var a = [1, 2, 3];
var b = new Array(1, 2, 3);
var c = new Array(3);

console.log(a); // [ 1, 2, 3 ]
console.log(b); // [ 1, 2, 3 ]
console.log(c); // [ <3 empty item> ]

console.log(a.map((v, i) => i)); // [ 0, 1, 2 ]
console.log(b.map((v, i) => i)); // [ 0, 1, 2 ]
console.log(c.map((v, i) => i)); // [ <3 empty items> ]
```

在上面的程式碼中，`a` 和 `b` 都創造了一個 `[ 1, 2, 3 ]` 陣列，但 `c` 的內容卻只得到一個長度為 `1`，內容為空值的陣列（根據瀏覽器不同，空值可能會以不同方式表示）。

這是因為當 `Array` 函式僅被傳入一個數字作為參數時，這個參數會被認為是用來指定「長度」而非傳入的內容。

### 創造 `undefined` 陣列
如果想要創造內容為 `undefined` 而非空值的陣列，可參考以下兩種方法。

第一種方法是確實地傳入 `undefined` 作為參數，而非創造出無意義的空值：
```js
const arr = new Array(undefined, undefined, undefined);
console.log(arr);  // [ undefined, undefined, undefined ]
```

第二種方法是使用 `apply` 調用 `Array()` 函式，並在第一個參數傳入 `null` 或 `undefined`：

```js
const arr = Array.apply(null, { length: 3 });
console.log(arr);  // [ undefined, undefined, undefined ]
```

---

## 物件（Object）
```js
const obj1 = new Object({ a: 1 });
obj1.b = 2;
console.log(obj1); // { a: 1, b: 2 }
```

從上面可以看到，手動調用 `new Object()` 基本上沒有任何意義，它與直接使用字面定義物件基本上是完全相同的。

---

## 函式（Function）

```js
function func1(a) { console.log(a * 2); }
const func2 = function (a) { console.log(a * 2); };
let product = 10
const func3 = new Function("a", `console.log(a * ${product});`);

func1(1);  // 2
func2(2);  // 4
func3(3);  // 30
```

建構子函式 `Function` 在一種特殊情況下能派上用場，也就是需要動態定義一個函式的內容運算時，可以利用樣板字面值（Template literals）填入變數。

---

## 符號（Symbol ）

`Symbol` 是 ES6 新增的基本類型值，是一種在程式中特殊且（幾乎）完全獨一無二的值，可作為物件的屬性名稱使用，而不必擔心出現任何衝突。

```js
var sym = Symbol("my own symbol");
console.log(sym);  // Symbol(my own symbol)
console.log(typeof sym);  // symbol

const obj = {};
obj[sym] = "foobar";

console.log(Object.getOwnPropertySymbols(obj));
// [ Symbol(my own symbol) ]
```

要注意的是，`Symbol` 不接受與 `new` 一起使用，否則程式會報錯。

```js
const sym = new Symbol("my symbol");
// TypeError: Symbol is not a constructor
```

---

## 內建型別建構子
在 JS 中，所有內建型別的建構子函式都可以省略 `new` 進行調用。`Symbol` 則是唯一一個不能使用 `new` 運算子的內建型別。

```js
const str = String("abc");
const num = Number(10);
const bool = Boolean(true);
const obj = Object({ a: 1 });
const fun = Function("a", "return a*2");
const arr = Array(1, 2, 3);
const sym = Symbol("my symbol");

console.log(str.valueOf());    // abc
console.log(num.valueOf());    // 10
console.log(bool.valueOf());   // true
console.log(obj.valueOf());    // { a: 1 }
console.log(fun.valueOf()(2)); // 4
console.log(arr.valueOf());    // [ 1, 2, 3 ]
console.log(sym.valueOf());    // Symbol(my symbol)
```

而除了 `undefind`、`null` 跟 `Symbol` 之外，所有的內建型別也都能調用 `Object` 函式建立：

```js
const str = Object("abc");
const num = Object(10);
const bol = Object(true);
const obj = Object({ a: 1 });
const fun = Object(function () { });
const arr = Object([1, 2, 3]);

console.log(typeof str.valueOf());    // string
console.log(typeof num.valueOf());    // number
console.log(typeof bol.valueOf());    // boolean
console.log(typeof obj.valueOf());    // object
console.log(typeof fun.valueOf());    // function
console.log(Array.isArray(arr.valueOf())); // true
```

---

## 正規表示式（RegExp）
定義 JS 的正規表示式時，不論是使用字面值或內建函式都十分常見。使用字面值形式（literal form ）除了語法簡單之外也能提升效能，而 `RegExp()` 方法則提供了動態定義正規表示式的選項。

```js
const reg1 = /^a*b+c/ig;
const letter = "(c|f)"
const reg2 = new RegExp(`^a*b+${letter}`, "ig");

console.log(reg1.test("ABC"));  // true
console.log(reg2.test("ABF"));  // true
```

---

## 日期（Date）
`Date()` 方法沒有字面值形式，必須使用 `new Date()` 調用，如果省略 `new` 運算子，則回傳的會是字串而非物件，而調用 `Date.now()` 則回傳自 `1970/01/01 00:00:00 UTC` 起經過的毫秒數：

```js
const now = new Date()
console.log(typeof now);  // object

const nowStr = Date()
console.log(typeof nowStr);  // string

const nowNum = Date.now()
console.log(typeof nowNum);  // number
```

---

## 錯誤（Error）
對 `Error` 方法來說，調用時是否使用 `new` 運算子，結果都是相同的，它接受至少一個字串作為參數，其他參數則為可選。

```js
function foo(x) {
  if (!x) {
    throw new Error("x wasn't provided");
  }
}

foo();  // Error: x wasn't provided
```

創造 `Error` 物件能夠補捉執行棧的上下文，包含函式調用棧與程式碼的行號，讓程式易於除錯。

> 除了 `Error()` 以外，你也能使用 `ReferenceError()`、`SyntaxError()`、`TypeError()` 以及其他 Error 函式，自訂不同類型的錯誤回報。只是它們通常由程式自動回報，很少由手動定義。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 3: Natives](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch3.md)
- [你不懂JS：类型与文法 | 第三章：原生类型](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch3.md)
- [Date.now() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
