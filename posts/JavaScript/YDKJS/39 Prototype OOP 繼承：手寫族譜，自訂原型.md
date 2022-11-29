---
title: 'Title'
date: '2022-10-24'
---

這章終於來到原型基礎物件導向的另一個核心概念：「繼承
（Inheritance）」。

繼承主要的目的，就是為了讓一個物件能夠使用另一個物件的屬性和方法，如此能夠提高程式碼的複用性，在減少重複的同時，也能夠實現下層物件的差異化。

---

## 原型繼承（Prototypical Inheritance）
前面已經提過，JS 是原型基礎物件導向（Prototype-based OOP）語言，繼承的方式是架構原型鍊，讓下層物件能夠繼承上層物件的屬性和方法。

在 JS 中，手動綁定原型關係的方式，是將一個物件指為另一個物件的原型。

### 自訂原型繼承

以下為自訂原型繼承的範例：
```js
function Shape() { }

Shape.prototype.duplicate = function () {
  console.log("duplicate")
}

function Circle(radius) {
  this.radius = radius
}

// 讓 Shape 成為 Circle 的原型
Circle.prototype = Object.create(Shape.prototype)

const c = new Circle(1);
c.duplicate(); // duplicate
```

在上面的程式碼中，我們使用 `Object.create` 手動將 `Shape.prototype` 指定為 `Circle.prototype` 的原型，兩者在原型鍊上達成繼承關係，於是 `Circle` 實例化後的物件 `c` 便能夠使用 `duplicate` 方法。

在這裡有個微妙的細節，要繼承給下層物件的屬性和方法，必須定義在 `prototype` 上，否則追溯原型鍊尋找屬性時無法被取得。

如以下程式碼，猜猜看最後幾行分別會印出什麼？

```js
function Shape() {
  this.duplicate1 = function () {
    console.log("duplicate1")
  }
}

Shape.duplicate2 = function () {
  console.log("duplicate2")
}

Shape.prototype.duplicate3 = function () {
  console.log("duplicate3")
}

function Circle(radius) {
  this.radius = radius
}

// 讓 Shape 成為 Circle 的原型
Circle.prototype = Object.create(Shape.prototype)

const s = new Shape();
const c = new Circle(1);

s.duplicate1();
s.duplicate2();
s.duplicate3();

c.duplicate1();
c.duplicate2();
c.duplicate3();
```

解答如下：

```js
s.duplicate1(); // duplicate1
s.duplicate2(); // TypeError: s.duplicate2 is not a function
s.duplicate3(); // duplicate3

c.duplicate1(); // TypeError: c.duplicate1 is not a function
c.duplicate2(); // TypeError: c.duplicate2 is not a function
c.duplicate3(); // duplicate3
```

如前面所說，只有定義在 `prototype` 上面的 `duplicate3` 能夠順利被下層從原型鍊上取得。

`duplicate1` 則被定義在 `Shape` 內部，因此 `Shape` 的實例 `s` 能夠取得，但 `Circle` 的實例物件 `c` 卻無法取得，因為 `duplicate1` 並不在原型鍊上，因此無法找到這個方法，程式返回錯誤。

而 `duplicate2` 則是直接定義在 `Shape` 上，自然也要從 `Shape` 上呼叫，因此必須寫出 `Shape.duplicate2()` 才能順利打印出 `duplicate2`。

以上驗證了，實例化物件雖然能夠使用 `constructor` 屬性找到原始的建構子函式，但兩者之間實際上還是倚靠 `prototype` 連結起來的。實例化物件並非直接取得建構子函式，而是建構子函式創造了這類型物件的 `prototype` 之後，藉由 `prototype` 將物件串聯在原型鍊上。


### 重設 `constructor`
自訂原型時另外要注意的一點，在於手動替物件綁定原型後，會出現 `constructor` 丟失的問題，需要一併手動綁上：

```js
function Shape() { }
Shape.prototype.duplicate = function () {
  console.log("duplicate in prototype")
}

function Circle(radius) {
  this.radius = radius
}

const c1 = new Circle(1);
console.log(c1.__proto__.constructor.name) // Circle
console.log(c1.__proto__.__proto__.constructor.name) // Object

// 讓 Shape 成為 Circle 的原型
Circle.prototype = Object.create(Shape.prototype)
const c2 = new Circle(1);
// 因為重新指定 __proto__ 原本的 constructor 丟失
console.log(c2.__proto__.constructor.name) // Shape
console.log(c2.__proto__.__proto__.constructor.name) // Shape

// Circle.prototype 已被覆寫，constructor 需要手動指定
Circle.prototype.constructor = Circle;
const c3 = new Circle(1);
console.log(c3.__proto__.constructor.name) // Circle
console.log(c3.__proto__.__proto__.constructor.name) // Shape
```

> `__proto__` 屬性已廢棄，被強烈建議只用於偵錯時檢視，不要使用 `Circle.__proto__ = Object.create(Shape.prototype)` 等賦值操作。

從上面 `Circle` 的三個實例化可以看到，在未綁定 `prototype` 前， `c1` 從原型鍊上找到的 `constructor` 是 `Circle` ，再往上一層是 `Object`。

而將原型指向 `Shape` 後，由於 `Circle` 原本的 `prototype` 已被覆蓋，於是兩層物件的 `constructor` 都變成了 `Shape` 。此時就需要一併手動綁定 `Circle.prototype.constructor`，將其重新指向 `Circle`。

總結來說，使用自訂原型繼承時有三個要點：
- 使用 `Object.create` 創造以另一個物件為原型的新物件，並將這個新物件指定為下層物件的 `prototype`
- 由於 `prototype` 被覆蓋，原本附於 `prototype` 上的 `constructor` 也一並丟失，需要手動綁回
- 要繼承給下層物件的屬性和方法必須定義在 `prototype` 上，否則無法在原型鍊中取得

### 繼承原型建構子的屬性和方法
除了直接將屬性和方法定義在 `prototype` 以外，還有另一種方法可以讓下層建構子繼承屬性，即是在下層建構子中使用 `call` 函式：
```js
function Shape(color) {
  this.color = color;
}

function Circle(radius, color) {
  // super constructor
  Shape.call(this, color);
  this.radius = radius
}

Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.constructor = Circle;

const c = new Circle(1, "red");
console.log(c.color) // red
```

### 中間函式繼承 Intermediate Function Inheritance
如果程式中有複數地方需要用到繼承，我們同樣可以將繼承行為包裝成函式：
```js
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child;
}

function Shape() { }
Shape.prototype.duplicate = function () {
  console.log("duplicate")
}

function Circle(radius) {
  this.radius = radius
}
extend(Circle, Shape);

function Square(size) {
  this.size = size
}
extend(Square, Shape);

const c = new Circle(1)
const s = new Square(2);
c.duplicate(); // duplicate
s.duplicate(); // duplicate
```

像上面這樣，定義了 `extend` 以後，每次要綁定繼承時只要呼叫 `extend` 函式就好。

### `setPrototypeOf`
ES6 以後，JS 新增了 `Object.setPrototypeOf` 方法，用法與 `Object.create` 十分相似，能夠將一個物件直接指為另一個物件的原型：
```
function Shape() { }
function Circle() { }

Circle.prototype = Object.create(Shape.prototype)
Object.setPrototypeOf(Circle.prototype, Shape.prototype);

// 重新指定 prototype 導致 constructor 丟失
const c1 = new Circle();
console.log(c1.__proto__.constructor.name) // Shape
// 補回 constructor
Circle.prototype.constructor = Circle;
const c2 = new Circle();
console.log(c2.__proto__.constructor.name) // Circle
```

### 避免擴充內建物件
在 JS 中，我們同樣能夠修改新增內建物件擁有的屬性或方法：

```js
Array.prototype.shuffle = function () {
  console.log("shuffle");
}

const arr = []
arr.shuffle() // shuffle
```

但這樣的行為應該是要避免的，因為新增的屬性有可能會和某個引入的套件或框架方法重複，造成除錯困難；而修改既有方法，可能在後續維護時沒注意到原本的方法已被修改，導致程式出現非預期的結果。

「不要改變不屬於你的物件」是撰寫 JS 時應遵循的一個守則。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
