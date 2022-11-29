---
title: 'Title'
date: '2022-11-14'
---

## 明確轉型
這裡再來看一次在 ToString 部分提到過的，各型別如何轉型至 `string`：
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

// null 與 undefined 沒有包裝物件，因此也沒有 toString 方法
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"
```

強制轉型時使用的 `String()` 前面並沒有 `new` 運算子，它接受參數並返回一個型別為 `string` 的值（未傳入參數則返回空陣列），這裡的 `String` 單純被作為函式使用，並不是創造包裝物件的函式建構子。

另外，執行 `a.toString();` 時，程式自動執行了封箱操作，但字面上的轉型意味是明顯的，因此依然將其歸屬於明確轉型。

### Number -> String
關於 `number` 到 `string` 的轉換，稍微有些要注意的地方：
```js
console.log(String(-0)); // "0"
console.log(String(+0)); // "0"

console.log(Math.pow(1000, 7));
// "1e+21"
console.log(String(Math.pow(1000, 7)));
// "1e+21"
console.log(Math.pow(1000, 7).toString());
// "1e+21"

console.log(BigInt(1e+21));
// 1000000000000000000000n
console.log(String(BigInt(1e+21)));
// "1000000000000000000000"
console.log((BigInt(1e+21)).toString());
// "1000000000000000000000"
```

`+0` 和 `-0` 轉型 `string` 後都是 `"0"`，失去表述正負的記號，需要用指數表示的大數字，轉型後也同樣用指數表示；`bigint` 則沒有這樣的轉換。

#### 修改 prototype
藉由修改原型鍊，可以改變轉型時的行為：
```js
Number.prototype.toString = () => "42";
Number.prototype.valueOf = () => "50";

console.log(String(Number(1))); // "1"
console.log((new Number(1)).toString()); // "42"
console.log((new Number(1)) + "A"); // "50A"
```

這裡再次注意到，`String()` 的調用方式是單純的函式，`new Number(1)` 所創造的包裝物件則鏈結於 `Number.prototype` 上，實例物件的 `toString` 委託回到原型身上，調用了 `() => "42"` 這段函式；取得底層值時則調用了 `valueOf` 方法。

## 隱含轉型
`+` 運算子除了用在數學上的加法外，同時也是字串連接用的符號：
```js
console.log(42 + 0);     // 42
console.log("42" + 0);   // "420"
console.log(42 + "0");   // "420"
console.log("42" + "0"); // "420"

// 連接空字串
console.log(42 + "");    // "42"
console.log("" + 42);    // "42"
```

從上面可以看到，當 `number` 與 `string` 不分先後順序「相加」時，`number` 永遠會被轉換成一個 `string`，然後執行 `string` 的連接。因此將 `numebr`  轉型為  `string` 一個簡單的方法，就是將 `number` 與一個空字串相加。

接著來檢查其他類型：
```js
console.log((10n) + "");     // "10"
console.log(true + "")       // "true"
console.log({} + "");        // "[object Object]"
console.log([] + "");        // ""
console.log([1, 2, 3] + ""); // "1,2,3"
console.log((function abc() { }) + "");
// function abc() { }
console.log(null + "");      // "null"
console.log(undefined + ""); // "undefined"
```

要注意的是，Symbol 型別不接受 ToString 的隱含強制轉型：
```js
console.log(Symbol("my symbol") + "");
// TypeError: Cannot convert a Symbol value to a string
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
