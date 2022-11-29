---
title: 'Title'
date: '2022-10-25'
---

多型這個字的英文「Polymorphism」意為「多結構」，放在程式設計當中，指的是同樣名稱的方法擁有不同行為。一般是指改寫父類別衍生的子類別方法，達成多型的效果。

使用多型的好處，在於省略複雜的 `if...else` 判斷，或 `switch/case` 陳述式，不同物件使用同樣方法的名稱，就能按照物件特性執行不同的方法內容。

多型需要靠覆寫（Override）來實踐，被覆寫過的方法會改變調用時的行為。

> 另一種和覆寫類似的行為是「多載（Overload）」，是倚靠同名方法但不同數量或型別的參數來實踐，但 JS 中同名方法在原型鍊上會被遮蔽，而函式宣告只會被單純覆蓋，所以 JS 沒有多載，只能夠模擬出與多載類似的效果。

在 JS 中，多型嚴格來說不算藉由真正的覆寫來實踐的，而是利用原型鍊查找僅會返回第一個結果的特性，在下層物件中定義同名方法，藉此「遮蔽」原型鍊上層的方法。

JS 的遮蔽範例：
```js
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child;
}

function Shape() { }
Shape.prototype.duplicate = function () {
  console.log("duplicate shape")
}

function Circle() { }
extend(Circle, Shape);
Circle.prototype.duplicate = function () {
  Shape.prototype.duplicate.call(this)
  console.log("duplicate circle")
}

const s = new Shape()
s.duplicate();
// duplicate shape
const c = new Circle()
c.duplicate();
// duplicate shape
// duplicate circle
```

從上面的程式碼中可以看到，`s` 和 `c` 這兩個實例物件表現出來的 `duplicate` 方法並不相同，下層物件的方法遮蔽了上層物件的同名方法。

使用這種方式，我們就能讓繼承同樣原型的物件，擁有相同名稱但不同行為的方法：

```js
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child;
}

function Shape() { }
Shape.prototype.duplicate = function () {
  console.log("duplicate shape")
}

function Circle() { }
extend(Circle, Shape);
Circle.prototype.duplicate = function () {
  console.log("duplicate circle")
}

function Square() { }
extend(Square, Shape);
Square.prototype.duplicate = function () {
  console.log("duplicate square")
}

const shapes = [
  new Circle(),
  new Square()
]

for (let shape of shapes)
  shape.duplicate();
// duplicate circle
// duplicate square
```

同時，多型也可以用  `if...else` 或 `switch/case` 陳述式來達成相同結果：

```js
for (let shape of shapes) {
  if (shape instanceof Circle)
    console.log("duplicate circle")
  else if (shape instanceof Square)
    console.log("duplicate square")
  // ...其他形狀判斷
}
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
