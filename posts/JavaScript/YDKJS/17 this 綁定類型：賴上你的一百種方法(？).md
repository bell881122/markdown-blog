---
title: 'Title'
date: '2022-10-02'
---

## 呼叫點 & 呼叫堆疊

前面說到，`this` 綁定的對象與作用域無關，而是決定於與函式如何調用，也就是呼叫時建立的執行環境（Execution context）。

因此在進入 `this`  的綁定之前，這裡來釐清呼叫點（Call-site）以及建立起執行環境的呼叫堆疊（Call Stack）：

```
function fun1() {
  // 呼叫堆疊：window -> func1
  console.log( "fun1" );
  fun2(); // fun2 的調用點，位於 fun1 的作用域內
}

function fun2() {
  // 呼叫堆疊：window -> func1 -> func2
  console.log( "fun2" );
  fun3(); // fun3 的調用點，位於 fun2 的作用域內
}

function fun3() {
  // 呼叫堆疊：window -> func1 -> func2 -> func3
  console.log( "fun3" );
}

fun1(); // fun1 的調用點，位於全域作用域
```

> 內建有開發者工具的瀏覽器，如 chrome 的呼叫堆疊在「Source」頁籤內，當程式執行時，如果有下中斷點，就能夠在「Call Stack」裡面查看當前的呼叫堆疊。

---

## `this` 綁定類型
上一篇說明了為什麼要有 `this` ，也釐清調用點和調用環境的判別後，從下一篇開始依序說明，`this` 擁有的綁定的方法：

- 默認綁定（Default Binding）
- 隱含綁定（Implicit Binding）
- 明確綁定（Explicit Binding）
	- 硬绑定（Hard Binding）
	- 軟綁定（Softening Binding）
- `new` 綁定（`new` Binding）
- 箭頭函式綁定（Arrow-function Binding）(ES6+)

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
