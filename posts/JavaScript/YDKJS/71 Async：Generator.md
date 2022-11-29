---
title: 'Title'
date: '2022-11-25'
---

生成器（Generator）是一種特殊的函式，可以多次進入與離開函式，並且在離開到再次進入期間，生成器內的環境（變數狀態）會被保存下來。

---

## `function*`
生成器函式在宣告時，`function` 關鍵字後面會多個 `*` 號，像是下面這樣：
```js
function* generator(i) { ... }
```

與普通函式不同的是，調用生成器時並不是執行函式內容，而是回傳一個針對這個函式的迭代器物件（iterator object），這個迭代器物件會在每次呼叫 `next()` 方法時，將函式迭代至下一個 `yield`。

```js
let i = 0;

function* generator() {
  i++;
  yield; // Pause 1
  i++;
  yield; // Pause 2
  i++;
}

const gen = generator();

console.log(i); // 0
gen.next(); // 執行至 Pause 1
console.log(i); // 1
gen.next(); // 繼續執行至 Pause 2
console.log(i); // 2
gen.next(); // 繼續執行到完畢
console.log(i); // 3
```

生成器內部的每個 `yield` 都像是一個書籤標記，啟動函式直到遇見 `yield` 時會暫停，保留內部環境狀態後跳出函式，直到再次調用  `next()` 方法，才從原本暫停的位置繼續執行，直到碰見下個 `yield` ，或到函式執行完畢為止。

### `value` 與 `done` 
`next()` 方法被調用時會產生一個物件，這個物件上擁有 `value` 與 `done` 兩個屬性。`value` 能夠取得 `yield` 的返回值；`done` 則返回一個布林值，告知函式是否已經執行完畢：
```js
function* generator(i) {
  yield i;      // Pause 1，返回 i
  yield i + 10; // Pause 2，返回 i+10
  yield;        // Pause 3，返回 undefined
}

const gen = generator(5);

const g1 = gen.next(); // 執行至 Pause 1
console.log(g1.value); // 5
console.log(g1.done);  // false

const g2 = gen.next(); // 執行至 Pause 2
console.log(g2.value); // 15
console.log(g2.done);  // false

const g3 = gen.next(); // 執行至 Pause 3
console.log(g3.value); // undefined
console.log(g3.done);  // false

const g4 = gen.next(); // 執行至結束
console.log(g4.done);  // true
```

### `return` 跳出
當函式內有 `return` 被執行時，會立即結束整個函式並跳出，同時 `done` 屬性也轉為 `true`：
```js
function* generator() {
  yield "Pause and Step out";
  return;  // 結束函式
  yield "never run!";
}

const gen = generator();

console.log(gen.next().value); // "Pause and Step out"
console.log(gen.next().done);  // true
```

### 傳入參數
除了從執行到一半的生成器函式中取得值，也可以反向用 `next()` 從外部傳入參數：
```js
function* logGenerator() {
  console.log(0);
  console.log(`First: ${yield}`);
  console.log(`Second: ${yield}`);
  console.log(`Third: ${yield}`);
}

var gen = logGenerator();

gen.next();  // 0 (函式啟動後還未抵達第一個 yield)
gen.next(1); // First: 1
gen.next(2); // Second: 2
gen.next(3); // Third: 3
```

以下為混合範例：
```js
function* generator() {
  console.log("Print value from next(): ", yield 1)
}

var gen = generator();

const g1 = gen.next();
console.log("Print value from yield: ", g1.value)
const g2 = gen.next(2);
console.log("Finally print the object:", g2)

// Print value from yield:  1
// Print value from next():  2
// Finally print the object: { value: undefined, done: true }
```

---

## `yield*`
一個生成器的內部同樣可以調用另一個生成器，並且這個生成器會加入到原本生成器的迭代中。

巢狀生成器的使用方法，是用 `yield*` 來調用另一個生成器：
```js
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

---

## `return()`
`return(val)` 方法會將 `val` 設置給 `value` 屬性，並將 `done` 屬性轉為 `true`，結束生成器（不論後面是否有其他 `yield` 或尚未執行的內容）：
```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

var gen = generator();

console.log(gen.next());        // { value: 1, done: false }
console.log(gen.return("foo")); // { value: "foo", done: true }
console.log(gen.next());        // { value: undefined, done: true }
```

不論生成器的 `done` 狀態為何，`return()` 方法都能夠調用，並同樣會將 `value` 設置為傳入的參數：
```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

var gen = generator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
console.log(gen.return()); // { value: undefined, done: true }
console.log(gen.return(1)); // { value: 1, done: true }
```

---

## `throw()`
`throw()` 方法用來強制拋出錯誤，它同樣會返回一個帶有 `done` 和 `value` 屬性的物件：
```js
// 一個能夠無限次迭代的生成器
function* generator() {
  while (true) {
    try {
      yield 42;
    } catch (err) {
      console.log("Error caught!");
      console.log(err);
    }
  }
}

const gen = generator();

console.log(gen.next());
// { value: 42, done: false }

const genError = gen.throw(new Error("Something went wrong"));
// "Error caught!"
// Stack trace(Error: Something went wrong)

console.log(genError);
// { value: 42, done: false }
console.log(gen.next());
// { value: 42, done: false }
```

---

## 注意事項
生成器不是建構子函式，無法以 `new` 調用：
```js
function* generator() {}
var obj = new generator;
// TypeError: generator is not a constructor
```

除了函式宣告以外，生成器也可以用函式表達式來定義：
```js
const generator = function* () {
  yield 10;
  yield 20;
};

const gen = generator();
console.log(gen.next()); // {value: 10, done: false}
```

---

## 參考資料
- [You Don't Know JS: Async & Performance | Chapter 4: Generators](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch4.md)
- [你不懂JS：异步与性能 | 第四章: Generator](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/async%20%26%20performance/ch4.md)
- [Generator | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [function* | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/function*)
- [Generator.prototype.return() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)
- [Generator.prototype.throw() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw)
