---
title: 'Title'
date: '2022-11-23'
---

## （保證）一個未來的值
ES6 新增了 `Promise` 物件，它本身的功能是取得一個「未來的值」，也就是執行異步以後「保證（Promise）」會返回的答案，不論異步本身是成功還是失敗。

這裡再來看一次使用回調的異步：
```js
console.log("Step 1");
setTimeout(() => {
  console.log("Step 2")
}, 0);
console.log("Step 3");
// "Step 1"
// "Step 3"
// "Step 2"
```

由於 `setTimeout` 跳到了外部環境，執行完異步後才回到主線程，因此最後的結果與我們大腦獲取的線性資訊不同，打印出了 `1`, `3`, `2`。

如果我們希望異步的執行能夠「阻塞（blocking）」，也就是獲得異步結果後再繼續下去，讓整段程式以線性結果呈現呢？`Promise` 物件在此就派上用場了：
```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Step 2")
  }, 0);
}).then((value) => {
  // 獲取異步結果後執行
  console.log("Step 1");
  console.log(value);
  console.log("Step 3");
});
// "Step 1"
// "Step 2"
// "Step 3"
```

從上面可以看到，`Promise` 讓程式確保在獲得異步結果後才繼續執行，我們取得了 `resolve()` 回傳的結果，並按照想要的方式處理，並讓程式如預期般地打印出 `1`, `2`, `3`。

### 取回控制權
`Promise` 提供了一個流程控制機制，我們不再需要把回調與異步行為一起送出，然後殷切期盼回調能夠順利地按照預期方式被執行；整個流程改為由 `Promise` 取回異步結果，並讓我們按照任何想要的方式處理這個回覆，不再有把回調送出後緊張等待的過程。

想像一下，如果這個回調是關於處理扣款或其他金流流程，而且你完全不曉得，第三方工具會在何時心血來潮地做個「微小」更新，或者上傳錯誤的程式碼到正式環境.......

`Promise` 消除了控制反轉問題，讓控制權回到開發者的手中！

---

## 使用 Promise
了解到 `Promise` 提供的用途後，接著來看看到底該如何使用它。

```js
new Promise(
  /* executor */
  function (resolve, reject) { ... }
);
```

從調用方式能夠看出來，`Promise` 是一個內建建構子函式，它接受一個函式參數作為「處理器（executor）」，函式內容即是執行的異步行為。

這個函式本身也擁有兩個參數，第一個是完成處理器（Fulfillment handler），慣例寫作 `resolve`，第二個是拒絕處理器（Rejection handlers），慣例寫作 `reject`。

調用 `resolve(x)` 表示異步成功，`x` 就是 `Promise` 完成後回傳的結果，當然也可以不設參數只調用 `resolve()`，這樣依然視為成功，`then()` 則會接收到一個 `undefined`。

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Some data.');
  }, 0);
});

p.then((val) => {
  console.log(val); // "Some data."
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 0);
});

p2.then((val) => {
  console.log(val); // undefined
});
```

而調用 `reject()` 則視為異步失敗， 它同樣可以傳入一個參數，比方說傳遞一個訊息，告知失敗的原因：
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Some data.');
  }, 1000);
  setTimeout(() => {
    reject('Time Out!');
  }, 500);
});

p.then(
  // 完成／成功處理器
  (val) => {
    console.log(val);
  },
  // 拒絕／失敗處理器
  (err) => {
    console.log(err);
  }
);

// Time Out!
```

在上面可以看到，`then()` 函式接受兩個函式作為參數，當 `Promise` 結果為成功時調用第一個函式，若是失敗則調用第二個，除了主動調用 `reject` 之外，執行異步過程如果出現程式錯誤也同樣視為失敗，會調用 `then` 的第二個函式，並回傳 `Error`：
```js
const p = new Promise((resolve, reject) => {
  foo(); // Oops!
});

p.then(
  // 完成／成功處理器
  (val) => {
    console.log(val);
  },
  // 拒絕／失敗處理器
  (err) => {
    console.log(err);
  }
);

// ReferenceError: foo is not defined
```

---

## 鏈式流程（Chain Flow）
調用 `then()` 這個行為，其實創造並返回了一個新的 `Promise` 物件，因此在 `then()` 的內部能夠繼續執行其他行為，接著在後面加上另一個 `.then()` ，就能獲取第二個步驟回傳的結果。

```js
// 這裡直接調用 "resolve" 屬性返回一個完成的 Promise
const p = Promise.resolve(21);

// p 是一個 Promise 物件
const p2 = p.then(function (v) {
  console.log(v);	// 21
  return v * 2;
});

// p2 也是一個 Promise 物件
p2.then(function (v) {
  console.log(v); // 42
});
```

也可以直接寫成鏈式串在一起：
```js
Promise.resolve(21)
  .then(function (v) {
    console.log(v);	// 21
    return v * 2;
  })
  .then(function (v) {
    console.log(v);	// 42
  });
```

上面還可以繼續加上 `p3`、`p4`、`p5`......想加多少都可以無限延長下去。

而我們知道了 `Promise()`、`Promise.resolve()` 和 `then()` 最終都回返回一個 `Promise` 物件，那麼，如果在 `then()` 內部回傳一個 `Promise` 會發生什麼事？

```js
Promise.resolve(21)
  .then(function (v) {
    console.log(v);	// 21

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(v * 2)
      }, 0)
    });
  })
  .then(function (v) {
    console.log(v);	// 42
  });
```

從上面可以看到，這個 `Promise` 被展開（也就是執行完畢並返回結果），由下一個 `then()` 接收時已經獲得了 `resolve` 所返回的值。

因此，整條 `Promise` 鏈將可以是無限步驟的異步，並且全都按照線性順序執行。

---

## 處理失敗流程

前面提到了 `then()` 實質上接受兩個函式參數，第二個參數是拒絕處理器，在異步被拒絕或失敗時被調用：
```js
Promise.resolve(21)
  .then(function (v) {
    // 未定義的 foo 
    foo();
    return v * 2;
  })
  .then(
    function (val) {
      // 不會到這裡來
      console.log(val); 
    },
    function (err) {
      console.log("Something's wrong.");
      console.log(err);
    }
  );

// Something's wrong.
// ReferenceError: foo is not defined
```

`then()` 的拒絕處理器（reject handler）還有另一個特性，也就是能夠接受前面所有 `Promise` 鏈上的 `reject`，當某個 `Promise` 的路線走向 `reject` 後，會由鏈上第一個有定義的拒絕處理器捕捉：

```js
// Step 1
Promise.resolve(21)

  // Step 2
  .then((val) => {
    // 未定義的 foo 
    foo();
    return val * 2;
  })

  // Step 3
  .then((val) => {
    return val / 3;
  })

  // Step 4
  .then(
    // 完成／成功處理器給予空值
    null,
    // 拒絕／失敗處理器
    (err) => {
      console.log("Something's wrong.");
      console.log(err);
      // Something's wrong.
      // ReferenceError: foo is not defined
      return "Next Step";
    }
  )
  
  // Step 5
  .then((val) => {
    console.log(val); // Next Step
  });
```

由於 Step 2 內部產生錯誤，`Promise` 跳過 Step 3 直接走進了拒絕路線，由有定義拒絕處理器的 Step 4 捕捉並處理錯誤，並且在捕捉之後重新回到完成狀態，並不會讓系統因為報錯而停下。

### `catch`
像這樣純粹定義拒絕處理器的寫法：
`then( null, rejectHandler )` 

能夠簡寫為：
`catch( rejectHandler )` 

由於 `catch()` 大多時候只單純用以列印錯誤，所以常見於鏈式的最尾端。

如果要在 `catch()` 內部執行其他操作，就要自行評估是否需要另外加上一層錯誤捕捉了。

```js
Promise.resolve(21)
  .then((val) => {
    foo();
  })
  .catch((err) => {
    console.log(err); // ReferenceError: foo is not defined
    foo2(); // Oops!
  });
```

---

## 參考資料
- [You Don't Know JS: Async & Performance | Chapter 3: Promises](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md)
- [你不懂JS：异步与性能 | 第三章: Promise](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/async%20%26%20performance/ch3.md)
- [Promise | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
