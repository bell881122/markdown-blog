---
title: 'Title'
date: '2022-11-24'
---

理解完 `Promise` 物件以後，這裡來看看 `Promise` 擁有的幾種方法，並在本文中分別介紹它們：
- `Promise.all()`
- `Promise.race()`
- `Promise.resolve()`
- `Promise.reject()`

---

## Promise.all(iterable)

`Promise.all()` 接受一個可迭代的參數（比如 `array` 或 `string`），大多時候是一個陣列，陣列內容可以為 `Promise` 物件或其他值，如果為 `Promise` 物件，在 `Promise.all()` 執行後會被展開。

`Promise.all()` 在陣列內所有值成功返回時成功，並回傳一個陣列，內部依序是原陣列的所有返回值。

若有任意 `Promise` 被拒絕時，`Promise.all()` 也會立刻拒絕，並獲得這個拒絕的失敗訊息。

`Promise.all()` 方法會返回所有展開後的 `Promise` 或非 `Promise` 的原始值，適合在需要一次取得多個 `Promise` 結果時使用：
```js
Promise.all([
  // 成員一
  Promise.resolve(3),
  // 成員二
  1337,
  // 成員三
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  })
]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```

> 上面 `setTimeout` 的使用方式為 `setTimeout( callback, delay, returnValue )` 。


任意 `Promise` 被拒絕時 `Promise.all()` 也跟著立刻拒絕，並獲取錯誤訊息：
```js
Promise.all([
  // 成員一
  Promise.reject("Be rejected."),
  // 成員二
  1337,
  // 成員三
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  })
]).then(values => {
  console.log(values);
}).catch(err => {
  console.log(err); // Be rejected.
});
```

當傳入陣列為空時，同樣返回一個空陣列：
```js
const p = Promise.all([])
  .then(values => {
    console.log(values); // []
  });

console.log(p) // Promise {<pending>} 

setTimeout(function () {
  console.log('the stack is now empty');
  console.log(p); // Promise {<fulfilled>: []}
});
```

---

## Promise.race(iterable)

`Promise.race` 同樣接受一個可迭代的參數，陣列內容可為 `Promise` 物件或其他值，並且在任意 `Promise` 被拒絕時立即拒絕。

與 `Promise.all` 不同的是，`Promise.race` 只接受「第一個」完成並返回的值。傳入的陣列內容彼此之間是競爭關係，在出現第一位贏家後，其他的值就會被捨棄。

```js
Promise.race([
  Promise.resolve(33),
  Promise.resolve(44)
]).then(val => {
  console.log(val); // 33
});
```

上面的 `Promise.resolve(33)` 直接就是完成狀態，因此在 `Promise.race` 收到它後立即就接受了這個結果，並捨棄了其他 `Promise`。

下面來看看實際比賽搶快的 `Promise.race`：
```js
Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "later")
  }),
  new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "earlier")
  })
]).then(val => {
  console.log(val); // "earlier"
});
```

較早調用 `resolve` 返回的 `"earlier"` 勝出，成為最後唯一贏家。

其實不論成功或失敗，`Promise.race` 都只接受第一個解析完畢的結果（當然如果為失敗，就會進入拒絕流程）：
```js
// 解析為成功的 Promise 先抵達
Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "resolved")
  }),
  new Promise((resolve, reject) => {
    setTimeout(reject, 1000, "rejected")
  })
]).then(
  val => {
    console.log(val); // "resolved"
  },
  err => {
    console.log(err);
  }
);

// 解析為失敗的 Promise 先抵達
Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "resolved")
  }),
  new Promise((resolve, reject) => {
    setTimeout(reject, 500, "rejected")
  })
]).then(
  val => {
    console.log(val);
  },
  err => {
    console.log(err); // "rejected"
  }
);
```

另外，`Promise.race` 需要至少一名競賽的「跑者（racer）」，當傳入陣列為空時，它將永遠無法被完成：
```js
const p = Promise.race([])
  .then(values => {
    console.log(values);
  });

console.log(p)
// Promise {<pending>} 

setTimeout(function () {
  console.log('the stack is now empty');
  console.log(p); 
});
// the stack is now empty
// Promise {<pending>}
```

---

## Promise.resolve(value)

`Promise.resolve(value)` 會回傳一個解析狀態為成功的 `Promise`，完成的返回值為 `value`。
```js
Promise.resolve('Success')
  .then(function (value) {
    console.log(value); // "Success"
  });
```

由於 `Promise` 在傳入 `thenable` 物件（可以調用 `then()` 方法的物件）後會被解析展開，在不確定 `value` 是否為 `Promise` 物件，或者想將某個值作為  `Promise` 物件使用時，可以用 `Promise.resolve` 將其包裹起來。
```js
var original = Promise.resolve(33);
var cast = Promise.resolve(original);
cast.then(function (val) {
  console.log(`value: ${val}`);
});
console.log('original === cast ? ' + (original === cast));

// original === cast ? true
// value: 33
```

---

## Promise.reject(message)

`Promise.reject(message)` 會回傳一個解析狀態為失敗的 `Promise`，完成的返回訊息為 `message`。
```js
Promise.reject(new Error('fail'))
  .catch((err) => {
    console.log(err); // Stacktrace(Error: fail)
  });
```

---

## 參考資料
- [You Don't Know JS: Async & Performance | Chapter 3: Promises](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md)
- [你不懂JS：异步与性能 | 第三章: Promise](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/async%20%26%20performance/ch3.md)
- [Promise | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise.all() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promise.race() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Promise.resolve() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve#%E5%88%A4%E5%AE%9A%E5%8F%A6%E4%B8%80%E5%80%8B_promise)
- [Promise.reject() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
