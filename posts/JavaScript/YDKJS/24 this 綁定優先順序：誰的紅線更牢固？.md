---
title: 'Title'
date: '2022-10-09'
---

這裡稍微複習一下，JS 中的 `this` 會由於調用方式不同而改變指向的物件，基本上有以下幾種：

- 默認綁定（Default Binding）：`this` 在 `strict mode` 下指向 `undefined`，除此之外指向全域物件
- 隱含綁定（Implicit Binding）：函式通過環境物件被調用
- 明確綁定（Explicit Binding）：透過 `call`、`apply` 或 `bind` 調用函式
- `new` 綁定（`new` Binding）：綁定的物件透過 `new` 調用（建構子調用）產生
- 箭頭函式綁定（Arrow-function Binding）(ES6+)：綁定的 `this` 固定指向外圍函式的詞法作用域。

那麼，當不同綁定同時出現時，會以何者為優先呢？

## 誰的紅線更牢固？

首先是**默認綁定**，這個在最開始就說了，當函式未使用其他綁定方式時，`this` 便會指向默認值，因此無疑是所有綁定中優先度最低的。

接著來看看**隱含綁定**和**明確綁定**：
```
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: "obj1",
	foo: foo
};

var obj2 = {
	a: "obj2",
	foo: foo
};

obj1.foo(); // obj1
obj2.foo(); // obj2

obj1.foo.call( obj2 ); // obj2
obj2.foo.call( obj1 ); // obj1
```

從以上的結果看來，明確綁定毫無疑問優先於隱含綁定。

再來是 **`new` 綁定**和**隱含綁定**：

```
function foo(something) {
  this.a = something;
}

var obj1 = { foo: foo };

var obj2 = {};

obj1.foo("Implicit Binding");
var bar = new obj1.foo("new Binding");

console.log(obj1.a); // Implicit Binding
console.log(bar.a); // new Binding
```

這裡也是毫無疑問的， `new` 綁定優先於隱含綁定。

那麼最後的最後，明確綁定和 `new` 綁定誰先誰後呢？

由於 `new foo.call(obj1)` 這樣的程式碼並不合法，也就是說無法同時執行明確綁定和 `new` 綁定，因此下面用 `bind` 方法回傳一個新的函式來進行比較：

```
function foo(something) {
  this.a = something;
}

var obj1 = {};

var bindHelper = foo.bind(obj1);
bindHelper("Explicit Binding");

var newBinding = new bindHelper("new Binding");

console.log(obj1 === newBinding); // false
console.log(obj1.a); // Explicit Binding
console.log(newBinding.a); // new Binding
```

上面可以看到，用 `new` 調用函式的物件，和原本 `bind` 在 `bindHelper` 方法上的 `obj` 是不同的物件，也就是說 使用 `new` 創造的物件與原本綁定的物件完全無關，可說是直接覆蓋了 `bind` 給 `bindHelper` 函式的物件。

這樣一來，我們就能知道當同時出現不同綁定方式時，該如何判定它們彼此的優先順序了：

1. `new` 綁定：如果函式是透過 `new` 關鍵字調用的，那它的 `this` 就指向函式建構出來的新物件。
2. 明確綁定：通過 `call`、`apply` 調用，或者由 `bind` 包裝的函式，則 `this` 指向傳入  `call`、`apply` 或  `bind` 的物件。
3. 隱含綁定：函式透過環境物件被調用。
4. 默認綁定：沒有使用其他綁定方法下的預設綁定方法。
- 不排名：箭頭函式是匿名函式，綁定的 `this` 固定指向詞法作用域。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
