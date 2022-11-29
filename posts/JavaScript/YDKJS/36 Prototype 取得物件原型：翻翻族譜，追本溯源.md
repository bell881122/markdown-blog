---
title: 'Title'
date: '2022-10-21'
---

前面提到了，JS 是實作原型基礎物件導向程式設計（Prototype-based OOP）的語言，那麼這個最重要的原型（Prototype）究竟是什麼？

在 JS 裡面，有幾種取得原型的方法：
- 取得物件的原型
	- `Object.getPrototypeOf(obj)`
	- `__proto__`（由於效能等原因已被棄用，目前建議僅用於偵錯時檢視物件原型）
- 取得建構子函式的原型：
	- 使用 `prototype` 屬性，如 `String.prototype`

> 事實上在 JS 中，所有函式都擁有一個不可枚舉的屬性 `prototype`，且 `prototype` 可以被指向任何物件。

以下為使用範例，檢視物件與陣列的原型：
```js
const obj = {};
const arr = [];

console.log(
  Object.prototype === Object.getPrototypeOf(obj), // true
  Object.prototype === obj.__proto__, // true
  Object.getPrototypeOf(obj) === obj.constructor.prototype, // true
  Array.prototype === Object.getPrototypeOf(arr), // true
  Array.prototype === arr.__proto__, // true
  Object.getPrototypeOf(arr) === arr.constructor.prototype, // true
)
```

從以上程式碼可以看到，`obj` 和 `arr` 等實例所找到的原型，和建構子函式 `Object` 與 `Array` 連結到的 `prototype` 是同樣的東西。

知道如何取得原型後，就可以開始來檢視原型鍊了，我們來看看一般物件：
```js
let x = {}

console.log(x.__proto__.toString()) // [object Object]
console.log(x.__proto__.__proto__) // null

console.log(Object.getPrototypeOf(x).toString()) // [object Object]
console.log(Object.getPrototypeOf(Object.getPrototypeOf(x))) // null

console.log(Object.prototype.toString()) // [object Object]
console.log(Object.prototype.__proto__) // null，因為根物件沒有 prototype 這個屬性，只能調用 __proto__
```

在上面可以看到，不管用哪種方法，一個使用字面值定義的一般物件，原型鍊連結的都是 `Object` 這個內建物件的 `prototype`，這個連結到的物件又稱為「根物件（Root Object）」，從根物件再往上追溯則是 `null`，是整個原型鍊的終點。

同樣檢查自訂建構子函式的原型鍊：
```js
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw");
  }
}
const c = new Circle(1);

console.log(
  c.__proto__ === Circle.prototype, // true
  c.__proto__.__proto__ === Object.prototype, // true
  c.__proto__.__proto__.__proto__ === null, // true
)
```

被實例化出來的物件 `c`，原型鍊找到了 `Circle` 的 `prototype`，再往上同樣是 `Object.prototype`，除了少數特例狀況，大多數物件都是直接或間接繼承自這個根物件，最後才遇到了 `null`，抵達原型鍊終點。

這種上下如同樹系的連結關係，就是 JS 中的原型與原型鍊原理。

---

## 檢查物件原型
除了取得物件原型外，JS 還擁有 `isPrototypeOf` 方法，能夠檢視一個物件是否位於一個物件的原型鍊上。
```js
function ObjA() {}
function ObjB() {}
function ObjC() {}

ObjB.prototype = Object.create(ObjA.prototype);
ObjC.prototype = Object.create(ObjB.prototype);

var objC = new ObjC();

console.log(ObjC.prototype.isPrototypeOf(objC)); // true
console.log(ObjB.prototype.isPrototypeOf(objC)); // true
console.log(ObjA.prototype.isPrototypeOf(objC)); // true
console.log(Object.prototype.isPrototypeOf(objC)); // true
```

---

## `Object.create`
`Object.create` 是 ES5 才出現的方法，效果等同於如下函式：

```js
function createObject(obj) {
  function F(){}
  F.prototype = obj;
  return new F();
};
```

除了指定新物件的原型外，`Object.create` 還能在創造物件的同時定義屬性描述器：

```js
var objProto = {
  a: 2
};

var obj = Object.create(objProto, {
  b: {
    enumerable: false,
    writable: true,
    configurable: false,
    value: 3
  },
  c: {
    enumerable: true,
    writable: false,
    configurable: false,
    value: 4
  }
});

console.log(Object.getOwnPropertyDescriptors(obj))
// {
//   b: {
//     value: 3,
//     writable: true,
//     enumerable: false,
//     configurable: false
//   },
//   c: {
//     value: 4,
//     writable: false,
//     enumerable: true,
//     configurable: false
//   }
// }

console.log(obj.a); // 2
console.log(obj.b); // 3
console.log(obj.c); // 4
```


---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
- [繼承與原型鏈 | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Object.prototype.isPrototypeOf() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
