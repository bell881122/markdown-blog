---
title: 'Title'
date: '2022-11-10'
---

## 特殊值

### 不是值的值
`undefined` 型別和 `null` 型別，都僅有它們自己一個值。這兩種型別作為「空值」或「沒有值」，在許多情況常被視為可以互換，而有時候開發者會以微妙的方式區別它們：
- `null` 是一個「空值」或「曾有過值但現在沒有」
- `undefined` 是一個「丟失的值」或「還沒有值」

在 JS 中，`null` 是一個保留字／關鍵字（keyword），然而 `undefined` 卻可以當作一個合法的識別字（identifier），所以務必小心這類操作：
```js
let undefined = "UNDEFINED?";
console.log(undefined); // "UNDEFINED?"

let null = "B";
// SyntaxError: Unexpected token 'null'
```

### `void` 運算子
使用 `void` 運算子的表達式，永遠會回傳 `undefined`，它不會修改任何已經存在的值，只是確保不會有值返回。

在一些環境下它非常有用：
```js
function doSomething() {
  if (!APP.ready) {
    // 如果還未 ready，什麼都不返回，且稍後再試一次
    return void setTimeout(doSomething, 100);
  }

  var result;
  // ... 執行某些運算
  return result;
}

if (doSomething()) {
  // 開始執行任務
}
```

為了避免 `setTimeout()` 返回值，`doSomething` 函式內加上了 `void` 以避免 `if (doSomething())` 判斷語句給出一個成立的誤報。跟以下程式碼效果是相同的：
```js
if (!APP.ready) {
  setTimeout(doSomething, 100);
  return;
}
```

因此當某個地方存在值，但它又必須是 `unefined` 時， `void` 運算子就顯得非常好用。

---

## 特殊相等
正如前面提到的，在使用相等比較時，如 `NaN` 和 `-0` 等特殊值會出現非預期的結果，因此必須使用一些特殊方法驗證。

ES6 以後，JS 新增了 `Object.is` 方法，能夠驗證兩個值的相等性，且「沒有」任何例外：
```js
var a = 2 / "foo";
var b = -3 * 0;

console.log(Object.is(a, NaN));  // true
console.log(Object.is(b, -0));   // true
console.log(Object.is(b, 0));    // false
```

ES6 以前的填補：
```js
if (!Object.is) {
  Object.is = function (v1, v2) {
    // 驗證 `-0`
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    // 驗證 `NaN`
    if (v1 !== v1) {
      return v2 !== v2;
    }
    // 其他
    return v1 === v2;
  };
}
```

> 在已知安全的情況下，使用 `==` 或 `===` 可能會高效得多，這些運算子更常見，也能夠應付絕大多數情況，`Object.is` 更多時候是為了特殊相等的情況而準備的。

---

## 型別與引用

在某些語言中，可以宣告對一個變數的引用（reference，中文有時也稱參考），這就像是一個特殊的指針（pointer），指向另一個變數。如果沒有聲明一個引用參數，被傳遞的將會是拷貝的值（不論它是否是一個複合值），而不是一個引用。

JS 則不具有上述能夠指向變數的指針，它的引用指向一個（共享的）值，如果有多個不同的引用，它們都指向唯一的那個值，而不會指向另一個引用。

JS 的基本型別（非物件型別）執行的是傳值操作，也就是通過拷貝值來進行傳遞；而複合值（物件型別）則執行傳址／傳參，通過拷貝引用來傳遞，JS 的引用永遠指向底層的值，而不曾指向其他的變數或引用。

在 JS 中，沒有語法上的宣告來控制傳值或傳址，而是通過「型別」來判斷值的傳遞是通過拷貝值，還是拷貝引用。

```js
var a = 2;
var b = a; // 對 number 進行了值的拷貝
b++;
console.log(a); // 2
console.log(b); // 3

var c = [1, 2, 3];
var d = c; // 對 array 進行了引用的拷貝
d.push(4);
console.log(c); // [1,2,3,4]
console.log(d); // [1,2,3,4]
```

JS 的引用指向的是值本身，而不是指向另一個變數，因此改變變數的引用，並不會影響另一個變數原先的引用。

```js
var a = [1, 2, 3];
var b = a;
console.log(a); // [1,2,3]
console.log(b); // [1,2,3]

b = [4, 5, 6];
console.log(a); // [1,2,3]
console.log(b); // [4,5,6]
```

`b` 並不是一個指向變數 `a` 的指針，它指向的是底層的陣列值。這樣的困惑最常見於函式：

```js
function foo(x) {
  x.push(4);
  console.log(x); // [1,2,3,4]

  x = [4, 5, 6];
  x.push(7);
  console.log(x); // [4,5,6,7]
}

var a = [1, 2, 3];
foo(a);

console.log(a); // [1,2,3,4] 而不是 [4,5,6,7]
```

想要改變 `a` ，無法藉由改變 `x` 的引用來達成，只能修改 `a` 和 `x` 同時指向的那個引用：
```js
function foo(x) {
  x.push(4);
  console.log(x); // [1,2,3,4]

  x.length = 0;
  x.push(4, 5, 6, 7);
  console.log(x); // [4,5,6,7]
}

var a = [1, 2, 3];
foo(a);
console.log(a); // [4,5,6,7]
```

反之，想要像引用一樣傳遞一個基本型別，必須將它包裝在複合值（`object`、`array` 等等）中，讓它可以通過拷貝引用來傳遞：
```js
function foo(wrapper) {
  wrapper.a = 42;
}

var obj = {
  a: 2
};

foo(obj);

console.log(obj.a); // 42
```

基於物件傳參的特性，我們將目光放到包裝物件上，如果將基本類型以內建物件包裹，是否能獲得傳參的特性呢？

```js
function foo(x) {
  x++;
  console.log(x); // 3
}

let a = 2;
let b = new Number(a);

foo(b);
console.log(b.valueOf()); // 2
```

很遺憾，基本型別的底層值是不可變的（immutable），如果一個 `Number` 物件持有一個 `2` 的值，那這個 `Number` 就不可能持有另一個值，只能創建一個新的 `Number` 物件。

```js
function foo(x) {
  let y = x;

  x++;
  console.log(x); // 3

  console.log(x === y); // false
  console.log(typeof y); // object
  console.log(typeof x); // number
}

let a = 2;
let b = new Number(a);

foo(b);
console.log(b.valueOf()); // 2
```

在程式碼中加入 `y` 以後能更清楚地看到，`x++;` 操作中已經自動將 `x` 從 `object` 轉換為 `number`，在函式內部執行的  `x++;` 實際上是 `2++;` ，是一個對 `number` 的操作，顯然無法影響外面 `b` 指向的底層值。

引用在某些情況下顯得礙事，有時它們又十分好用。JS 中只有型別能夠決定引用與值的拷貝方式，也就是說，我們只能藉由選擇的型別，來影響值如何被賦值和傳遞。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 2: Values](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch2.md)
- [你不懂JS：类型与文法 | 第二章：值](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch2.md)
