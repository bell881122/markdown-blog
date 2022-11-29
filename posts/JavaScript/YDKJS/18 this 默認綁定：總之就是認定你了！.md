---
title: 'Title'
date: '2022-10-03'
---

## 默認綁定（Default Binding）

當函式未使用其他綁定方式，獨立被調用時，它所在的環境即是默認的全域環境，此時函式內部執行環境的 `this` 便預設指向全域物件。

```
function foo() {
	console.log( this.a );
}

var a = "global";

foo(); // global
```

### 嚴謹模式
但在嚴謹模式下，默認綁定會失效，如果沒有指名 `this` 的綁定對象，函式內的 `this` 最後會指向一個 `undefined`。

在全域使用嚴謹模式：
```
"use strict"
function foo() {
  console.log( this.a );
}

var a = "global";

foo();
// TypeError: Cannot read properties of undefined (reading 'a')
```

或在特定函式內使用：
```
function foo1() {
  "use strict"
  console.log( this );
}

function foo2() {
  console.log( this.a );
}

var a = "global";

foo1(); // undefined
foo2(); // global
```

要注意的是，嚴謹模式只和執行環境相關，與調用點無關：
```
function foo1() {
  "use strict"
  foo2() // 調用點
}

function foo2() {
  // 執行環境
  console.log(this.a);
}

var a = "global";

foo1(); // global
```

### 巢狀作用域裡的 `this`
在巢狀作用域中，關於 `tihs` 有個常會碰到的陷阱：

```
function outer() {
  console.log(
    "outer equal to obj:",
    this === obj
  );

  function inner() {
    console.log(
      "inner equal to obj:",
      this === obj
    );
    console.log(
      "inner equal to window:",
      this === window
    );
  }

  inner();
}

var obj = { outer }
obj.outer();

// outer equal to obj: true
// inner equal to obj: false
// inner equal to window: true
```

上面的程式碼在執行 `obj.func1()` 時隱含綁定（參考下一篇）了 `func1()` 的 `this` 指向 `obj`，但等到 `func2()` 執行時並沒有明確指定綁定對象，此時就會採用「預設綁定（Default Binding ）」，也就是指向全域物件。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
