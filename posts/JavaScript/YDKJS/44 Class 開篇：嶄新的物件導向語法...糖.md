---
title: 'Title'
date: '2022-10-29'
---

前面已經提過，JS 本身模擬了一些與類導向很相似的行為，但實際是靠原型實踐繼承，或者說實踐了委託（Delegation）。

`class` 則是在 ES6 引入的一個語法糖，能夠用一種更加簡化的方式去實踐那些模擬類的操作。下面就來將既有的建構子函式改為 ES6 的 `class` 比較看看。

建構子函式：
```js
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw")
  }
}
const c = new Circle(1);
c.draw(); // draw
```

使用 `class` 關鍵字
```js
class Circle {
  // 初始化物件的特殊方法 constructor
  constructor(radius) {
    this.radius = radius;
  }

  // 定義原型上的方法不需要 function 關鍵字
  draw() {
    console.log("draw")
  }
}

const c = new Circle(1);
c.draw(); // draw

// 考察 Circle 的原型和型別
console.log(Object.getOwnPropertyNames(c.__proto__)) // [ 'constructor', 'draw' ]
console.log(typeof Circle) // function
```

從上面可以看到，使用 `class` 語法時，`Circle` 內部出現了 `constructor` 明確定義 `Circle` 擁有的屬性，而方法則不再需要使用 `function` 宣告，更加近似於那些擁有「類導向」語言的語法。

但最後面也驗證了，JS 並沒有出現 `class` 這樣一個新型別，`Circle` 依然是一個 `function`，而 `c.__proto__` 上也依然連結著一個 `constructor` 屬性，`class` 語法的底層依然是依靠原型來實踐的。

---

## 靜態方法
在類導向的語言中有兩種方法，一種是實體方法（Instance Method），一種是靜態方法（Static Method）：

與實體方法相較，靜態方法有以下特徵：
- 只能在 `class` 上取得
- 並非提供給物件，而是附在 class 上的方法，與實例物件無關
- 大多時候都是用來定義工具方法（Utility Function）

JS 提供的 `class` 也實踐了這個特性，使用 `static` 關鍵字就可以定義靜態方法：

```js
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  // Instance Methods
  draw() {
    console.log("draw, radius:", this.radius)
  }

  // Static Methods
  static parse(str) {
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}

const c1 = new Circle(1);
const c2 = Circle.parse('{ "radius": 10 }');
c1.draw(); // draw, radius: 1
c2.draw(); // draw, radius: 10
```

可以看到，上面的 `Circle.parse` 這個靜態方法，使用方式與 JS 內建物件方法十分類似，比方說 `Object.assign` 或 `String.fromCharCode` 等，這些都是與實例物件無關，附屬於內建物件的方法。

要留意的是，JS 的 `class` **沒有**靜態屬性（Static Property），如果需要一個由 `Circle` 所有實例共享的屬性，依然要回到 `prototype` 語法上：

```js
class C {
  constructor() {
    C.prototype.count++;
    console.log("count", this.count);
  }
}

// 在 prototype 上添加共享屬性
C.prototype.count = 0;

var c1 = new C();
// count 1
var c2 = new C();
// count 2

console.log(c1.count); // 2
console.log(c1.count === c2.count); // true
```

---

## 繼承 Inheritance

最後講到了模擬類語言中最重要的「繼承」。JS 直接沿用了 Java 等類導向語言的繼承關鍵字 `extends`，在 `class` 語法中實踐繼承：

```js
class Shape {
  constructor(color) {
    this.color = color;
  }
  move() { console.log("move") }
}

class Circle extends Shape {
  constructor(color, radius) {
    // 使用 super 繼承 color 屬性
    super(color);
    this.radius = radius;
  }
  draw() { console.log("draw") }
}

const c = new Circle("red", 10);
console.log(c.color); // red
console.log(c.radius); // 10
c.draw(); // draw
c.move(); // move

// 檢查 constructor
console.log(c.__proto__.constructor.name) // Circle
console.log(c.__proto__.__proto__.constructor.name) // Shape
```

這裡可以看到，JS 的 `class` 語法和 Java 等類導向語言的語法已經十分類似，因此更要留意兩者的底層邏輯：一個是類導向，一個是原型導向。

---

## 覆寫（Overriding）

以下為 `class` 覆寫的範例：
```js
class Shape {
  constructor(color) {
    this.color = color;
  }
  draw() { console.log("draw Shape") }
}

class Circle extends Shape {
  constructor(color, radius) {
    super();
    // 覆寫 color 屬性
    this.color = "color: " + color;
    this.radius = radius;
  }

  // 覆寫 draw 方法
  draw() {
    super.draw(); // 呼叫原型的 draw 方法
    console.log("draw Circle")
  }
}

const s = new Shape("blue");
console.log(s.color); // blue

const c = new Circle("red", 10);
console.log(c.color); // color: red
c.draw();
// draw Shape
// draw Circle
```

要注意的是，「子類」在使用 `this` 前需要調用 `super()` ，以取得「父類」的 `constructor`，否則程式將會拋出一個錯誤。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Appendix A: ES6 class](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/apA.md)
- [你不懂JS：this 与对象原型 | 附录A: ES6 class](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/apA.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
