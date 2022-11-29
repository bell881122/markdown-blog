---
title: 'Title'
date: '2022-11-22'
---

所謂的回調（callback），就是作為參數被傳遞的函式，函式並非在當前環境調用，而是被傳遞到另一個執行環境中，在該環境執行的函式。由於異步需要跳出當前線程（thread），在另一個環境中執行，因此使用回調是最常見的異步模式。

以下是一個使用 `setTimeout` 的簡單回調：
```js
console.log(1);
setTimeout(function () {
  console.log(2);
}, 0);
console.log(3);
// 1
// 3
// 2
```

即便 `setTimeout` 的等待設置為 `0` 秒鐘，它依然離開了主線程的執行，等到異步執行完畢，回調函式進入工作佇列等待，直到 `1` 和 `3` 被打印完畢後，才被事件循環機制推入主線程執行。

---

## 巢狀／鏈式回調（Nested/Chained Callbacks）
回調另一個常見的用法，是多個異步依序執行，也就是回調內嵌著另一個回調：
```js
// DOM 事件
listen("click", function handler(evt) {
  // 計時器
  setTimeout(function request() {
    // 異步請求
    ajax("http://some.url.1", function response(text) {
      // 處理回覆
      if (text == "hello") {
        handler();
      }
      else if (text == "world") {
        request();
      }
    });
  }, 500);
});
```

有時候，巢狀回調可能超過三個五個甚至更多，一不小心眼睛就看花了，根本不知道目前在哪一層，這樣的代碼常被稱作「回調地獄（callback hell）」。

這裡將上面的代碼改為不使用嵌套的方式：
```js
// DOM 事件
listen("click", handler);

// 計時器
function handler() {
  setTimeout(request, 500);
}

// 異步請求
function request() {
  ajax("http://some.url.1", response);
}

// 處理回覆
function response(text) {
  if (text == "hello") {
    handler();
  }
  else if (text == "world") {
    request();
  }
}
```

上面的程式碼脫離了巢狀模式，但閱讀時依然需要上下來回移動目光，才能明白整段程式碼在做什麼。

---

## 控制反轉
回調還有另一個問題，也就是「控制權」的喪失。很多時候，異步行為倚賴的是第三方工具，我們將回調函式交出去，也因此無法控制在何時調用、是否調用、以及是否禁止重複調用等問題。

像這樣把自己程序的一部分拿出來，將它的控制權移交給另一個第三方時的情況，稱為「控制反轉（IOC, Inversion of Control）」。

控制反轉具有低耦合的優點，但缺點也顯而易見，最終我們無法確實控制自己撰寫的回調將如何被調用。

---

## 更安全的嘗試

### 分離的回調
有些 API 為了彌補控制權喪失的問題，會接受兩個回調，一個處理成功，一個處理失敗（ES6 的 `promise` 即是採用此方式）：
```js
function success(data) {
  console.log(data);
}

function failure(err) {
  console.error(err);
}

ajax("http://some.url.1", success, failure);
```

以這種模式設計的 API，錯誤處理器通常是可選的，如果不提供錯誤處理器的話，API 在呼叫失敗後會沉默地吞掉錯誤。

### 錯誤優先
另一種常見的回調模式是「錯誤優先風格（error-first style）」（Node.js 的 API 常採用此種模式）。

回調的第一個參數保留給 `error`，第二個以後的參數才是成功取得的資料。如果異步執行成功，第一個參數會是空的或為 `falsy`，接著就能處理獲得的資料；而如果失敗的話，第一個參數將為 `true`，或得到一個 `error` 回報。

```js
function response(err, data) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(data);
  }
}

ajax("http://some.url.1", response);
```

### 設置超時取消
還有另一種方法，是將送出的異步在一定時間後取消，避免呼叫逾時的問題：
```js
function timeoutify(fn, delay) {
  let intv = setTimeout(function () {
    intv = null;
    fn(new Error("Timeout!"));
  }, delay)
    ;

  return function () {
    if (intv) {
      clearTimeout(intv);
      fn.apply(this, [null].concat([].slice.call(arguments)));
    }
  };
}

function foo(err, data) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(data);
  }
}

ajax("http://some.url.1", timeoutify(foo, 500));
```

---

## 總結

對 JS 來說，回調是最基本的異步模式；但對開發者來說，回調並不是人腦自然的思考流動方式，大腦更偏好具有順序、阻塞的、單線程的方式處理，而回調卻是非線性、非順序的。

更重要的是，回調造成的控制反轉，讓我們失去對自己撰寫的程式碼的控制權，無法信任第三方提供的 API 。

除了回調之外，JS 在 ES6 新增了 `Promise` 和 `generator`，以及 ES7 的 `async` 和 `await` 來處理異步行為，這些功能都在試圖解決回調隱含的問題，並提供了更友善的異步模式。

---

## 參考資料
- [You Don't Know JS: Async & Performance | Chapter 2: Callbacks](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch2.md)
- [你不懂JS：异步与性能 | 第二章: 回调](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/async%20%26%20performance/ch2.md)
