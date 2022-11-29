---
title: 'Title'
date: '2022-10-22'
---

就如同前面所說，JS 是實踐物件導向設計的語言，使用物件模擬真實世界，因此如何創造和操縱物件可說是 JS 的核心。

先前已經提過，JS 中有幾種方法能夠創造物件，然而，如果是要創造擁有相同屬性和方法，只是值不同的物件，有什麼方法呢？

其一是已知的使用 `new` 關鍵字調用建構子，第二個則叫做「工廠函式」，這兩種方法都能創造出擁有相同結構的物件，那它們有什麼不同呢？

以下來比較看看：

**建構子函式 Constructor Function**
```js
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  }
}

const circle = new Circle(1);
circle.draw();
```

**工廠函式（Factoriy Function）**
```js
function createCircle(radius) {
  return {
    radius,
    draw: function() {
      console.log("draw");
    }
  }
}

const circle = createCircle(1);
circle.draw();
```

具體來說它們有什麼差別呢？

從上面可以看到，工廠函式使用函式閉包方法，回傳了一個擁有固定屬性，卻可以藉由參數傳入屬性值的的物件。

之所以會有工廠函式，實際上是試圖在 JS 環境中模擬出類（class），並使用這個模擬的類創造出一個物件。

而 JS 特有的建構子函式，實際上並不是真正意義上的建構子，更不是類，而純粹是一個函式，只是具備以下特點：
- 必須使用 `new` 關鍵字來調用（不然就只是個單純的函式）
- 會創造並回傳一個新的空物件，而函式內部的 this 指向這個物件
- 產生的物件會被連到物件原型鍊上

其中最大的差別就在最後一項，物件是否會被連結到原型鍊上，以下來檢視看看：
```js
// 建構子函式
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw");
  }
}
const constructorCircle = new Circle(1);
constructorCircle.draw(); // draw

// 工廠函式
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log("draw");
    }
  }
}
const factoryCircle = createCircle(1);
factoryCircle.draw(); // draw
console.log(
  constructorCircle.constructor === Circle, // true
  Object.getPrototypeOf(constructorCircle) === Circle.prototype, // true
  factoryCircle.constructor === createCircle, // false
  Object.getPrototypeOf(factoryCircle) === createCircle.prototype, // false
)
```

從上面可以看到，`constructorCircle` 和 `Circle` 兩者都位於原型鍊上，擁有連結關係能夠找到彼此，但 `factoryCircle` 和 `createCircle` 就沒有這樣的連結關係。

而被放在原型鍊上有什麼好處？最顯著的一點，就是底層的物件共享上層物件的所有屬性和方法，並且能夠利用「遮蔽」設置下層物件特有的屬性和方法。

當然，除了享有上述的好處之外，原型鍊這種設計模式也有其本身的限制性，但 JS 的開發者也找到了混合（Mixins）等解套方法，這部分就在後文詳述了。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
- [[JavaScript] 建構子 / 工廠函式（factory function）創造物件？](https://hackmd.io/@s_jpXuNwRQiUuGCOQAOZuA/ryVK_oUUt)
-[JavaScript 工廠函式 vs 建構函式](https://www.itread01.com/hkyplyy.html) 
