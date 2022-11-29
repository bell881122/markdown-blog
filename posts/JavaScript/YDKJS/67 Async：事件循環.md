---
title: 'Title'
date: '2022-11-21'
---

## 單線程的 JS
在進入異步（Asynchronous），或稱非同步之前，需要了解 JS 的一部分底層邏輯。最大的核心重點就在於，JS 引擎是單線程／單執行緒的（Single threaded），也就只能夠進行同步（Synchronous）作業，一次只會執行一段，無法同時執行多段程式碼。

JS 也沒有自己獨立的運行環境，而是運行在宿主環境中，大多數時候是瀏覽器，也可能是透過 Node.js 運行在其他環境中。而 JS 中的異步行為，正是搭配外部環境提供的功能來達成。

---

## 事件循環（Event Loop）
單線程的 JS 引擎本身沒有時間的概念，只是任意一段代碼的按需（on-demand）執行環境。而像瀏覽器這樣的宿主環境提供其中的一項機制，正是替 JS 引擎決定所有「事件」的優先順序，告知 JS 引擎現在該執行哪一段代碼，這種機制被稱為「事件循環／事件輪詢（Event Loop）」。

當 JS 需要發送一個異步請求時，會將這個請求連同回調函式（如果有的話）一起發送出去，而宿主環境會替這個請求指派一個監視器，並同時不斷輪詢（polling）各個監視器，以確認異步請求是否完成，並將完成後收到的回應看作一個「事件」，連同回調函式一起傳入「事件循環」交給 JS 引擎執行。

事件循環是一個「先進先出」的事件隊列，在概念上類似於這樣的迴圈：
```js
const eventLoop = [
  function () { ... },
  function () { ... },
  ...
];

// JS 引擎隨時監看工作佇列中是否有等待執行的任務
while (true) {
  let event;
  
  if (eventLoop.length > 0) {
    // 從事件隊列取出下一個事件
    event = eventLoop.shift();

    // 執行當前事件
    try {
      event();
    }
    catch (err) {
      throw Error(err);
    }
  }
}
```

比方說 `setTimeout` 這個方法，嚴格來說並不是在指定時間後「執行」回調函式，而是等到指定時間後，將這個回調「放入」事件循環。

如果在這之前有其他任務排隊等待執行，這個回調就必須等候它們全部結束，接著才會輪到它。

`setTimeout` 是保證這個事件會在指定時間「以後」執行，而不是讓它在指定時間「當下」執行，也就是說，`setTimeout` 所設定的時間，是指「最少」需要等待的時間。

```js
console.log(1)

setTimeout(function(){
  console.log(2)
}, 1000)

setTimeout(function(){
  console.log(3)
}, 500)

setTimeout(function(){
  console.log(4)
}, 500)

console.log(5)

// 1
// 5
// 等待 0.5 秒後
// 3
// 4
// 再過 0.5 秒後
// 2
```

如上程式碼中，`2`、`3`、`4` 都在指定時間後才被放入工作佇列中，等著事件循環將它們傳給 JS 引擎執行，在此之前 `1` 和 `5` 就已經在工作佇列中，而 `2` 更是在倒數完一秒後才被放入工作佇列，因此排在最後才被執行。

---

## 工作佇列（Job queue）

工作佇列是專門為異步行為引進的概念，在異步請求中，並不是寫在前面的程式碼先執行，而是透過監視器監看異步是否完成，完成的任務就被排入工作佇列中，等候事件循環機制傳遞給 JS 引擎處理。

> 工作佇列又稱任務隊列，除了 Job queue 之外，也有 Event queue 、Task queue 或 Callback queue 幾項說法。

以下列出幾種會被放入工作佇列的事件：
- DOM Event：使用者瀏覽網頁時觸發的種種事件。
- `XMLHttpRequest`：預設為異步取得資料的方法，但也可執行同步行為。
- `fetch`：使用異步請求取得資料的方法。
- `setTimeout`、`setInterval`：實際上是屬於瀏覽器的 Web API，提供給 JS 調用以設置計時器，時間到了之後會將傳入的回調函式回傳至工作序列中，等待事件循環機制將其傳給 JS 引擎執行。

---

## 參考資料
- [[JS] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式](https://pjchender.dev/javascript/js-event-loop-stack-queue/)
- [[筆記] 談談JavaScript中的asynchronous和event queue](https://pjchender.blogspot.com/2016/01/javascriptasynchronousevent-queue.html)
- [[JavaScript] Javascript 的事件循環 (Event Loop)、事件佇列 (Event Queue)、事件堆疊 (Call Stack)：排隊](https://medium.com/itsems-frontend/javascript-event-loop-event-queue-call-stack-74a02fed5625)
- [所以說event loop到底是什麼玩意兒？](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [JavaScript 深入淺出 Event Loop、Job Queue](https://shawnlin0201.github.io/JavaScript/JavaScript-Event-Loop-and-Job-Queue/)
- [解釋 Event Loop ( 上 ) --- Call Stack](https://ithelp.ithome.com.tw/articles/10260433)
- [解釋 Event Loop ( 下 ) --- Task Queue ( Callback Queue )](https://ithelp.ithome.com.tw/articles/10261593)
