---
title: 'Title'
date: '2022-11-17'
---

## 轉為 Boolean

### 明確強制轉型
`boolean` 的明確轉型主要有以下兩種：
- `Boolean()` 函式
- `!` 與 `!!` 運算子

#### `Boolean()`
```js
console.log(Boolean("0")); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true

console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
```

#### `!` 與 `!!` 運算子
`!` 否定運算子（negate operator）能夠明確地將一個值轉換為相反的 `boolean`，使用 `!!` 雙否定運算子（double-negate operator）則將一個值翻轉兩次，獲得它原本的 `boolean`：
```js
console.log(!!("0"));	// true
console.log(!!([]));	// true
console.log(!!({}));	// true

console.log(!!(""));	// false
console.log(!!(0));	// false
console.log(!!(null));	// false
console.log(!!(undefined));	// false
```

### 隱含強制轉型
`boolean` 隱含的強制轉型基本上會出現在以下情況中：
- `if(...)` 語句中的條件句
- `for ( ...; ...; ... )` 語句中的條件句（第二個子句）
- `while (...)` 或 `do...while(...)` 循環語句中的條件句
- `? :` 三元運算中的條件句（第一個子句）
- `||` 或 `&&` 運算式左手邊的運算元（operand）

以下為範例：
```js
var a = 42;
var b = "abc";
var c;
var d = null;

if (a) {
  console.log("yep"); // yep
}

while (c) {
  console.log("nope, never runs");
}

c = d ? a : b;
console.log(c); // "abc"

if ((a && d) || c) {
  console.log("yep"); // yep
}
```

#### 三元（條件）運算子
```js
var a = 42;
var b = a ? true : false;
```

`? :` 三元運算子（ternary operator）會檢查 `?` 前面值的 `boolean`，然後根據 `true` 或 `false` 返回相應的結果。


#### `||` 和 `&&`
在 C 或 PHP 這類語言中，像 `||` 和 `&&` 這樣的邏輯運算子，理所當然地返回一個邏輯值（也就是 `boolean` 值）。但在 JS 中，它們實際上並不是單純返回 `true` 或者 `false`，而是返回的是運算子左側或右側運算式的其中之一。

```js
console.log(42 || "abc"); // 42
console.log(42 && "abc"); // "abc"

console.log(null || "abc"); // "abc"
console.log(null && "abc"); // null
```

`||` 和 `&&` 都會檢測第一個（左側的）運算元的 `boolean` 值，如果它不是一個 `boolean`，則會發生 ToBoolean 強制轉型。

在 `||` 的運算式中，如果第一個運算元的檢測結果為 `true`，就會返回第一個運算元的值，如果為 `false` 則會返回第二個運算元的值。

`&&` 運算子則相反，如果第一個運算元檢測結果為 `true`，就會返回第二個運算元的值，如果為 `false` 則會返回第一個運算元的值。

`||` 和 `&&` 運算式的返回值永遠都是兩個運算元的其中之一，而不是被強制轉型過的 `boolean` 值。

JS 的這兩個邏輯運算子，比起邏輯運算，更像是運算元選擇器，按照 `ToBoolean` 的轉型判斷，來決定要返回左側或右側的運算元。

單純就結果來說，`a || b;` 基本上等同於 `a ? a : b;`，而 `a && b;` 則近似於 `a ? b : a;`，它們的差別僅在於底層的運算方式不同，但結果是相同的。

`||` 運算子十分常見於提供預設／備用值：
```js
function foo(a, b) {
  a = a || "hello";
  b = b || "world";

  console.log(a + " " + b);
}

foo(); // "hello world"
foo("yeah", "yeah!");	// "yeah yeah!"
```

`&&` 運算子則常被作為一種「守護運算子」，如果第一個表達式返回的並不是一個真值，程式就不會執行第二個表達式。
```js
function foo() {
	console.log( "It passed!" );
}

var a = 42;
a && foo(); // It passed!
```

當然，這兩個運算子也能夠混合運用：
```js
var a = 42;
var b = null;
var c = "foo";
console.log(a && (b || c)); // "foo"
```

### 多個 Boolean 驗證
這裡來看一個應用的實例：
```js
function onlyOne() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      sum += arguments[i];
    }
  }
  return sum === 1;
}

var a = true;
var b = false;

console.log(onlyOne(b, a));          // true
console.log(onlyOne(b, b, b, a));    // true
console.log(onlyOne(b, a, b, b, b)); // true

console.log(onlyOne(b, b));             // false
console.log(onlyOne(b, a, b, b, b, a)); // false
```

想像一個 `onlyOne` 函式，測試是否所有傳入的 `boolean` 只有一個 `true`。如果單憑 `&&` 和 `||` 來做出所有判斷，將會是巨大且幾乎看不到盡頭的工作量，但 `onlyOne` 內部將收到的 `boolean` 視為 `number` 相加，便能夠獲得 `true` 的總數，最後再驗證這個數是否為一，即能判明。

`onlyOne` 函式還有另一種進階寫法，即便傳入的參數不是 `boolean`，也能夠將其轉換為 `boolean` 後進行驗證：
```js
function onlyOne() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += !!arguments[i];
  }
  return sum === 1;
}

console.log(onlyOne("42", 0)); // true
console.log(onlyOne([], {})); // false
console.log(onlyOne(false, 0, null, undefined)); // false
```

以上最後就獲得一個驗證方法，確認傳入的所有參數是否只有一個真值。

---

## Symbol 強制轉型
`symbol` 「允許」明確的 ToString 強制轉型，但「不允許」隱含的 ToString 強制轉型：
```js
console.log(String(Symbol("fine")));
// "Symbol(fine)"

console.log(Symbol("oops!") + "");
// TypeError: Cannot convert a Symbol value to a string
```

「不允許」明確或隱含的 ToNumber 強制轉型：
```js
console.log(Number(Symbol("oops!")));
// TypeError: Cannot convert a Symbol value to a number

console.log(- -Symbol("oops!"));
// TypeError: Cannot convert a Symbol value to a number
```

「允許」明確或隱含的 ToBoolean 轉型：
```js
console.log(Boolean(Symbol("fine")));
// true
console.log(Symbol("fine") ? true : false);
// true
```

表格整理如下：
| `symbol` | 明確 | 隱含 |
|:--|:--|:--|
| ToString | O | X |
| ToNumber | X | X |
| ToBoolean | O | O |

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
- [條件運算子 | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
