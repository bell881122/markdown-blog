---
title: 'Title'
date: '2022-10-01'
---

這章開始，我們要探索另一個 JS 裡的重大謎團──總是讓人搞不清楚是這個還是那個的 `this` 。

### 為什麼要有 `this`？
在介紹 `this` 之前，首先來看看 `this`的出現究竟想解決什麼問題。

```
const person1 = {
  name: 'Amy'
}

const person2 = {
  name: 'Jack'
}

function speak(context) {
  console.log(`Hello, I'm ${context.name}`)
}

speak(person1); // Hello, I'm Amy
speak(person2); // Hello, I'm Jack
```

在上面的程式碼中，如果要取得物件中的 `name`，必須在調用函式時將物件作為參數傳入。

但當整個模式與架構變得複雜時，像這樣將執行環境以參數傳遞的方式會變得難以識讀，而 `this` 的功能，就是帶來更優雅乾淨的 API 設計。

---

## 所以什麼是 `this`？
關於 `this` ，根據 ECMAScript 的定義，`this` 的值指向「當前執行環境的 `this` 綁定」，這是什麼意思呢？

讓我們用 `this` 改寫上面的程式碼試試：

```
const person1 = {
  name: 'Amy',
  speak,
}

const person2 = {
  name: 'Jack',
  speak,
}

function speak() {
  console.log(`Hello, I'm ${this.name}`)
}

person1.speak(); // Hello, I'm Amy
person2.speak(); // Hello, I'm Jack
```

回顧一下這段神奇的程式碼，在調用 `speak()` 的時候並沒有傳入任何參數，`teacher` 和 `student` 的名字卻可以順利被打印出來。

`this` 是什麼神奇的魔法，為什麼能夠找到這兩個人的名字？

回顧 `speak` 這個函式的調用過程，我們從結果往回推論，不難導出 `teacher.speak()` 和 `student.speak()` 的 `this` 分別指向了 `teacher` 和 `student` 這兩個物件。

也就是說，當 `teacher` 內部的 `speak` 被調用時，`this` 指向了 `teacher` 物件，而調用 `student` 的 `speak` 時，函式內的 `this` 就指向了 `student` 物件。

當調用的外部環境改變， `this` 所指的對象也跟著改變。

接著再來看看，如果 `speak` 被單獨調用會發生什麼？

```
speak(); // Hello, I'm undefined
```

此時 `this.name` 回傳的值變成了 `undefined` 。

這裡把函式稍微調整一下，用更直接的方式看看 `this` 的真面目：
```
function callThis() {
  console.log(this)
}

const person1 = {
  name: 'Amy',
  callThis,
}

const person2 = {
  name: 'Jack',
  callThis,
}

person1.callThis();
// { name: 'Amy', callThis: [Function: callThis] }

person2.callThis();
// { name: 'Jack', callThis: [Function: callThis] }

callThis();
// Window
```

在最後一個單獨調用的 `callThis`，我們發現它的 `this` 指向了 `Window`，也就是全域物件（在 Node.js 內就會是 `global` 物件），因為全域變數就是全域物件的屬性，所以函式去尋找 `Window` 底下的 `name` 這個變數但一無所獲，於是最後回傳了 `undefined` 。

---

## `this` 的特徵
初步了解 `this` 之後，以下總結它的幾個特徵：

### `this` 不是
- `this` 指向的不是包覆它的函式。
- `this` 指向的不是包覆它的函式的作用域，也無法進行詞法作用域查找
- `this` 與包覆它的函式如何宣告無關

### `this` 是
- `this` 是一個 JS 的保留字／關鍵字
- `this` 在函式執行時產生
- `this` 隨著函式的調用方式不同而改變
- `this` 指向一個物件，該物件在函式被調用時綁定在 `this` 上
- 大部分時候，`this` 指向調用這個函式的物件（或者說調用時該函式所屬的物件）

下一章，我們接著來看看 JS 中，那些能夠指定 `this` 綁定對象的方法。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 1: this Or That?](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch1.md)
- [你不懂JS：this 与对象原型 | 第一章: this 是什么？](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch1.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
