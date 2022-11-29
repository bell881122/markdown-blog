---
title: 'Title'
date: '2022-10-08'
---

ES6 以後，JS 新增了一個完全跳脫原本 `this` 規則的特殊函式，也就是「箭頭函式（Arrow-Function）」。

它不透過 `function` 關鍵字宣告，而是使用大箭頭操作符（ Fat-arrow Operator）`=>` 創建，可視作一種縮寫的匿名函式，除此之外，它的 `this` 綁定遵守自己的特殊規則。

箭頭函式的 `this` 將固定指向圍繞它的函式作用域，或者說，宣告它時外圍作用域的 `this` 是誰，它的 `this` 就跟著指向誰。

```js
function foo() {
  return () => console.log(this.a);
}

var obj1 = { a: "obj1" };

var obj2 = { a: "obj2" };

var bar = foo.call(obj1);
bar.call(obj2); // obj1
```

執行 `foo.call(obj1)` 時，`() => console.log(this.a)` 捕捉到外圍作用域的 `this` 指向 `obj1`，於是將 `obj1.a` 的值鎖進了內部。當這個箭頭函式被賦值給 `bar` 並執行後，它找到的 `a` 依舊屬於 `obj1` ，而非 `bar.call(obj2)` 執行時傳入的 `obj2` ，這裡的 `this` 指向便回到了閉包。

在 ES6 出現箭頭函式之前，也常見的類似實作方法：

```js
function func1() {
  setTimeout(function () {
    console.log(this.a);
  }, 100);
}

function func2() {
  // 在詞法作用域規則下取得 this 當前的值
  var self = this;
  setTimeout(function () {
    console.log(self.a);
  }, 100);
}

var a = "in global"

var obj = {
  a: "in obj"
};

func1.call(obj); // in global
func2.call(obj); // in obj
```

事實上，ES6 新增的箭頭函式可說是 `self = this` 這段程式碼的語法糖，且箭頭函式的 `this` 無法被其他任何綁定規則覆蓋，實質上完全跳脫了原本的 `this` 綁定規則。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
- [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
