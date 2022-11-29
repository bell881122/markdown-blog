---
title: 'Title'
date: '2022-10-07'
---

## `new` 绑定（`new` Binding）

在一般類別導向（class-orientation）的語言中，建構子（constructors）是附在類（class）上的一種特殊方法，當使用 `new` 來初始化一個類時，這個類的建構子就會被調用。

JS 的建構子與類別導向語言的建構子擁有非常相似的使用方法，但兩者並無關係，JS 的建構子僅僅是一個函式。

在 JS 中，任何函式在前面加上 `new` 關鍵字來調用，都會成為建構子調用（constructor call），並改變一部分調用函式時的行為。

建構子調用有以下幾個特徵：
- 調用時會創建一個**全新**的物件
- 這個新創造的物件會被接入原型鏈（Prototype Linked）
- **函式內部的 `this` 會綁定這個新物件**
- 如果函式沒有回傳其他值，將會回傳這個物件

以下範例：
```
function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

在以上程式碼中，通過使用 `new` 來調用 `foo`，我們執行了「建構子調用」產生出一個新物件，同時 `foo` 執行時的 `this` 指向該物件，完成了對該物件 `a` 屬性的賦值。最後將這個新物件賦值給 `bar`，再執行了 `bar.a` 的查找，成功找到 `2` 這個值。

在這裡，調用建構子時產生的 `this` 綁定，便稱之為「`new` 绑定（`new` Binding）」。

> 關於建構子的說明，將在後續的章節做詳細討論。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
