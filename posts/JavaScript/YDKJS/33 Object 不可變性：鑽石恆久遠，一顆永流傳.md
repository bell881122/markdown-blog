---
title: 'Title'
date: '2022-10-18'
---

# 不可變性（Immutability）
有的時候，我們會希望將物件或物件屬性設置為不可變的，以防止意外地改變了其內容。JS 在 ES5 加入了幾種方法，讓我們能夠做到這點。

> 以下所有方法僅影響物件和直屬於它的屬性，如果物件內包含對另一個物件的參考（不論是物件、陣列或函式），則該物件的內容不會受到影響。

---

## 屬性常數化
將物件屬性參數的 `writable` 和 `configurable` 都設置為 `false`，實質上就創建了一個常數屬性（無法改變值、改變屬性配置或刪除該屬性）。

```js
var obj = {};

Object.defineProperty( obj, "a", {
	value: 2,
	writable: false,
	configurable: false,
	enumerable:true,
} );

obj.a = 3;
console.log(obj.a); // 2

Object.defineProperty( obj, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable:true,
} );
// TypeError: Cannot redefine property: a
```

---

## 防止擴展（Prevent Extensions）
如果只是想防止一個物件被添加新的屬性，但不影響已經存在的屬性，可以使用 `Object.preventExtensions()`，讓物件新增屬性時無聲地失敗：

```js
var obj = {
  a: 2
};

Object.preventExtensions(obj);
obj.b = 3;
console.log(obj.b); // undefined
```

---

## 封印（Seal）
`Object.seal()` 會將物件「封印」，實際上等同於執行 `Object.preventExtensions()` 並將屬性參數改為 `configurable: false`。

```js
var obj = {
  a: 2
};

Object.seal(obj);
obj.b = 3;
console.log(obj.b); // undefined
console.log(Object.getOwnPropertyDescriptors(obj, "a"));
// {
//   value: 2,
//   writable: true,
//   enumerable: true,
//   configurable: false
// }
```

---

## 凍結（Freeze）
`Object.freeze()` 則是將物件「凍結」，等同於執行 `Object.preventExtensions()` 並將屬性參數 `configurable` 與 `writable` 都改為 `false`。

```js
var obj = {
  a: 2
};

Object.freeze(obj);
obj.b = 3;
console.log(obj.b); // undefined
console.log(Object.getOwnPropertyDescriptors(obj, "a"));
// {
//   value: 2,
//   writable: false,
//   enumerable: true,
//   configurable: false
// } 
```

`Object.freeze()` 方法是能對物件本身達到最高級別的不可變性，但依然不包含物件內部另外參考的物件。

如果要把整個物件做「深度凍結」，可以遞迴迭代調用 `Object.freeze()` 凍結它的內部物件，但要留意整個鏈結中可能影響的所有物件。

---

## 檢測不可變性
以上幾種設置物件不可變性的內建方法，皆有對應的檢測函式：

| Immutability | Test Function|
|:--|:--|
| Object.preventExtensions |  Object.isExtensible|
| Object.seal | Object.isSealed |
| Object.freeze | Object.isFrozen |

用法範例如下：
```js
var obj1 = { a: "A" };
var obj2 = { b: "B" };
var obj3 = { c: "C" };

Object.preventExtensions(obj1);
console.log(Object.isExtensible(obj1));
// false，物件無法擴充屬性

Object.seal(obj2)
console.log(Object.isExtensible(obj2));
// false，物件無法擴充屬性
console.log(Object.isSealed(obj2));
// true，物件已被封印

Object.freeze(obj3)
console.log(Object.isExtensible(obj3));
// false，物件無法擴充屬性
console.log(Object.isSealed(obj3));
// true，物件已被封印
console.log(Object.isFrozen(obj3));
// true，物件已被凍結
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
- [Object.isExtensible() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
- [Object.isSealed() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
- [Object.isFrozen() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
