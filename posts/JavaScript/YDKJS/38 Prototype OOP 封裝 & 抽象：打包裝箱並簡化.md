---
title: 'Title'
date: '2022-10-23'
---

在進入到原型的第一章節時，說明了 JS 是以物件導向為基本設計概念的語言，在前幾章也陸續說明了原型作用機制與相關概念，以下就來實際檢視一下，物件導向在 JS 中究竟如何實現。

這裡再條列一次物件導向主要的幾個概念：
- 封裝（Encapsulation）
- 抽象（Abstraction）
- 繼承（Inheritance）
- 多型（Polymorphism）

本篇會用 JS 實際案例說明封裝與抽象。

---

## 封裝（Encapsulation）
即是將相關的變數與方法放入物件中，減少程式碼複雜度，增加可復用性。

直接舉個例子：
```js
let baseSalary = 30_000;
let overtime = 10;
let rate = 20;

function getWage(baseSalary, overtime, rate) {
  return baseSalary + (overtime * rate)
}

let wage = getWage(baseSalary, overtime, rate);
```

以上程式碼毫無疑問是可以運作的，但有沒有更好的優化方法呢？讓程式碼更加便於維護，一看上去更加簡單明瞭。

可以看到這段程式碼中，`baseSalary`、`overtime` 和 `rate` 這幾個變數和參數反覆出現，而其實它們僅使用於 `getWage` 內部，實際上可以進行「封裝」，將它們全部包在一起：

```js
let employee = {
  baseSalary: 30_000,
  overtime: 10,
  rate: 20,
  getWage: function () {
    return this.baseSalary + (this.overtime * this.rate)
  }
}

let wage = employee.getWage();
```

進行封裝以後，不但調用的方式變得更簡單了，更能夠一目了然地知道 `baseSalary`、`overtime` 和 `rate` 都附屬於同個物件 `employee` 本身，大大降低了程式碼的複雜度。

---

## 抽象（Abstraction）
抽象的反面是具體，因此抽象化同時也可以說是「降低具體程度」，隱藏內部計算細節，只公開簡化過的必要操作。

抽象化具有以下優點：
- 更簡單的介面／接口，降低操作成本
- 阻絕（內部）變動造成的影響，也就是內部的更改不影響外部操作
- 防止從外部意外改動內部操作
- 減少程式複雜度

抽象化前：
```js
function Circle(radius) {
  this.radius = radius;
  this.defaultLocation = { x: 0, y: 0 };
  this.doSomeCompute = function () {
    console.log("Do some compute. Location:", this.defaultLocation);
  }
  this.draw = function () {
    console.log("Start drawing.");
    this.doSomeCompute()
  }
}

const circle = new Circle(10);
circle.draw();
// Start drawing.
// Do some compute. Location: { x: 0, y: 0 }

// 僅用於內部計算，不應開放給外部的屬性
circle.defaultLocation = { x: 100, y: 100 }
circle.draw();
// Start drawing.
// Do some compute. Location: { x: 100, y: 100 }
```

把只用於內部的屬性和方法私有化（Privatisation）：

```js
function Circle(radius) {
  this.radius = radius;
  const defaultLocation = { x: 0, y: 0 };
  const doSomeCompute = function () {
    console.log("Do some compute. Location:", defaultLocation);
  }
  this.draw = function () {
    console.log("Start drawing.");
    doSomeCompute()
  }
}

const circle = new Circle(10);
// 外部無法改動內部私有的屬性
circle.defaultLocation = { x: 100, y: 100 }
circle.draw();
// Start drawing.
// Do some compute. Location: { x: 0, y: 0 }
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
