---
title: 'Title'
date: '2022-10-11'
---

## 物件的宣告
JS 物件有兩種宣告形式：

- 宣告形式（declarative / literal form）
```
var myObj = {
	key: value
	// ...
};
```

- 構造形式（constructed form）
```
var myObj = new Object();
myObj.key = value;
```

---

## 創造物件
在 JS 中，創造物件主要有三種方式：
- 使用 `{}`
- 使用 `new Object()`
- 使用 `Object.create()` (ES5+)

以上三者有何不同呢？以下來比較看看：
```js
var objA = { a: "A" };
var objB = new Object({ b: "B" });
var objC = Object.create({ c: "C" });
var objD = Object.create(null);

console.log(objA.__proto__ === Object.prototype); // true
console.log(objA instanceof Object); // true
console.log(objA.__proto__); // [Object: null prototype] {}

console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true
console.log(objB.__proto__); // [Object: null prototype] {}

console.log(objC.__proto__ === Object.prototype); // false
console.log(objC instanceof Object); // true
console.log(objC.__proto__); // { c: 'C' }

console.log(objD.__proto__ === Object.prototype); // false
console.log(objD instanceof Object); // false
console.log(objD.__proto__); // undefined
```

具體來說，前兩者基本上沒有區別，其 `__proto__` 都指向了 `Object.prototype` 。只是比起 `new Object()`，使用字面值 `{}` 的物件，內部函式的 `this` 不會指向回傳的物件。

而使用 `Object.create`，則會將傳入的物件參數作為原型物件。如果傳入的參數為 `null`，則創造的物件會是個完全的空物件，不會繼承 `Object.prototype` 上如 `hasOwnProperty()`、`toString()` 等任何方法。

因此如果想創造一個完全的空物件，使用 `Object.create(null)` 會比其他方式「空」得更加徹底。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
- [Object.create()、new Object()和{}的区别](https://juejin.cn/post/6844903917835436045)
