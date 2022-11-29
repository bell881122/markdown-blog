---
title: 'Title'
date: '2022-11-26'
---

`async/await` 是繼 `Promise` 和 `Generator` 之後，JS 對異步提出的新解決方案。與 `Generator` 設置標記並暫停跳出的概念不同，`async/await` 所做的是「等待」異步直到完成，也就是達成了對程式的「阻塞（blocking）」，等到獲得異步結果後才繼續接下來的動作。

如果說最基礎的 `Promise` 物件是在送出異步後，再手動將 `Promise` 展開以確認解析結果，那 `async/await` 就是送出異步後站在原地等待，等到解析完畢後由程式自動打開 `Promise` 的結果送到你眼前。

以下就來看看 `async/await` 的使用方法。

### `async`
`async` 函式的本質是 `Promise` 的語法糖，因此 `async` 函式調用後返回的也是一個  `Promise` 物件。如果 `async` 函式執行成功，返回的便是成功並帶有  `async` 回傳值的 `Promise` ；如果 `async` 函式收到錯誤或拒絕，則會返回拒絕狀態的 `Promise` ：
```js
async function async1() {
  return 1
}
const resolvedPromise = async1();
resolvedPromise.then(val => console.log(val));
// 1

async function async2() {
  foo();
}
const rejectedPromise = async2();
rejectedPromise.catch(err => console.log(err));
// ReferenceError: foo is not defined
```

### `await`
`await` 則是（只）能夠在 `async` 函式內使用的關鍵字，當程式遇到 `await` 時，會暫停函式的執行，等待傳遞給  `await` 的內容解析完畢返回時才繼續執行。如果傳遞給 `await` 的表達式是一個 `Promise`，就會將 `Promise` 展開後返回解析獲得的結果：
```js
const p = new Promise(resolve => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

async function asyncFunc() {
  var rv = await p; // 等待 2 秒取得 resolved value
  console.log(rv); // 10
  return rv * 2;
}

asyncFunc().then(val => {
  console.log(val); // 20
});
```

在沒使用 await 時，程式不會暫停等待異步，而是持續執行直到完畢：
```js
// 使用 IIFE 直接調用
(async function () {
  let i = 0;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      i++;
      resolve();
    }, 0);
  });
  console.log(i); // 0
})();
```

`await` 則可以讓程式停下等待異步，直到返回結果後才繼續執行：
```js
// 使用 IIFE 直接調用
(async function () {
  let i = 0;
  // 程式暫停等待 Promise 解析完畢
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      i++;
      resolve();
    }, 0);
  });
  
  // 異步解析完畢後才往下執行
  console.log(i); // 1
})();
```

另外 `await` 使用的位置，對等待順序來說會有著微妙的差別：
```js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  const a = await resolveAfter2Seconds("o");
  const b = await resolveAfter2Seconds("o");
  return x + a + b;
}

add1("f").then(v => {
  console.log(v); // prints "foo" after 4 seconds.
});

async function add2(x) {
  const p_a = resolveAfter2Seconds("a");
  const p_b = resolveAfter2Seconds("r");
  return x + await p_a + await p_b;
}

add2("b").then(v => {
  console.log(v); // prints "bar" after 2 seconds.
});
```

上面的 `add1` 等完 `a` 之後才去排隊 `b`，總共耗時 `4` 秒，`add2` 則是一次等待兩個 `Promise`，總共耗時 `2` 秒。

`await` 如果收到非 `Promise`，則會將其視為已解析的 `Promise`：
```js
(async function f2() {
  var y = await 20;
  console.log(y); // 20
})();
```

`Promise` 所屬的方法當然也可以使用：
```js
async function foo(x, y, z) {
  const p1 = await Promise.all(x);
  const p2 = await Promise.race(y);
  const p3 = await Promise.resolve(z);
  return [p1, p2, p3];
}

foo([1, 2, 3], ["A", "B"], true).then(v => {
  const [p1, p2, p3] = v;
  console.log(p1); // [ 1, 2, 3 ]
  console.log(p2); // "A"
  console.log(p3); // true
});
```

---

## 錯誤處理
如果 `Promise` 失敗或被拒絕，`async` 會丟出 `Error` 並返回 `reject()` 收到的訊息：
```js
async function foo() {
  try {
    var p = await Promise.reject("rejected");
  } catch (err) {
    console.log(err); // "rejected"
  }
}
foo();
```

由於 `async` 返回的是一個 `Promise`，因此也可以用 `Promise` 的拒絕處理流程來捕捉報錯：
```js
async function foo() {
  var p = await Promise.reject("rejected");
}
foo().catch(err => {
  console.log(err); // "rejected"
});
```

---

## 參考資料
- [async function | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)
- [await | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/await)
- [簡單理解 JavaScript Async 和 Await](https://www.oxxostudio.tw/articles/201908/js-async-await.html)
- [[JS] Async and Await in JavaScript](https://pjchender.dev/javascript/js-async-await/)
