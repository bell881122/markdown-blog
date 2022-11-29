---
title: 'Title'
date: '2022-10-16'
---

上一篇介紹過了屬性描述器，這裡詳細介紹資料與訪問描述器兩者共享的屬性特徵，以及資料描述器擁有的屬性特徵，並在下一篇說明訪問描述器。

---

## 共享的描述器
資料與訪問描述器兩者共享的屬性特徵有兩個，分別是 `enumerable` 和 `configurable`：

### enumerable 可枚舉性
`enumerable` 控制屬性能否在枚舉操作中出現，比方說物件的 `for...in` 循環。

如果某個屬性的 `enumerable` 被設置為 `false`，則這個屬性仍能夠被正常訪問，但無法出現在枚舉操作中：

```js
var obj = { a: 1 };

Object.defineProperty(obj, "b",
  { enumerable: true, value: 2 }
);

Object.defineProperty(obj, "c",
  { enumerable: false, value: 3 }
);

console.log(obj.c); // 3
console.log(("c" in obj)); // true
console.log(obj.hasOwnProperty("c")); // true

for (var k in obj) {
  console.log(k, obj[k]);
}
// "a" 1
// "b" 2
```

除了 `getOwnPropertyDescriptor` 之外，還有一個函式 `propertyIsEnumerable` 可以用以檢測某個屬性是否能夠枚舉。

```js
var obj = { a: 1 };

Object.defineProperty(obj, "b",
  { enumerable: false, value: 2 }
);

console.log(
  obj.propertyIsEnumerable("a"),  // true
  obj.propertyIsEnumerable("b"),  // false
  Object.keys(obj),               // [ 'a' ]
  Object.getOwnPropertyNames(obj) // [ 'a', 'b' ]
); 
```

從上面同時可以看到，使用 `getOwnPropertyNames` 依然能夠取得 `b` 這個屬性，但 `enumerable` 被設置為 `false`，就不會在 `Object.keys()` 這樣的枚舉操作中出現了。

### configurable 可配置性
`configurable` 控制了一個屬性的配置能否修改，要注意的是，將 `configurable` 調整為 `false` 是「不可逆」的操作，因為這個屬性的可配置性已經被關上了。

```js
var obj = { a: 2 };

obj.a = 3;
console.log(obj.a); // 3

Object.defineProperty(obj, "a", {
  value: 4,
  writable: true,
  configurable: false, // 可配置性調整為 false
  enumerable: true
});

console.log(obj.a);  // 4
obj.a = 5;
console.log(obj.a);  // 5 ← 依然能夠修改值

Object.defineProperty(obj, "a", {
  value: 6,
  writable: true,
  configurable: true,
  enumerable: true
});
// TypeError: Cannot redefine property: a
```

與此同時，`delete` 方法對 `configurable` 為 `false` 的屬性也是無效的：

```js
var obj = { a: 2, b: 3 };

Object.defineProperty(obj, "a", {
  configurable: false,
});

delete obj.b;
console.log(obj); // { a: 2 }

delete obj.a;
console.log(obj); // { a: 2 }
```

在嚴格模式底下則會丟出錯誤：
```js
"use strict"
var obj = { a: 2, b: 3 };

Object.defineProperty(obj, "a", {
  configurable: false,
});

delete obj.b;
console.log(obj); // { a: 2 }

delete obj.a;
console.log(obj);
// TypeError: Cannot delete property 'a' of #<Object>
```

---

## 資料描述器（data descriptor）

### writable 可寫性
`writable` 控制了一個屬性的值能否被改變。

```js
var obj = {};

// 新增一個屬性 a，writable 為 false
Object.defineProperty(obj, "a", {
  value: 2,
  writable: false,
  configurable: true,
  enumerable: true
});

obj.a = 3;
console.log(obj.a); // 2
```

如果是在 `strict mode` 下修改，則程式會更為直接地丟出一個錯誤，回報說 `a` 是一個唯讀屬性，因此無法被修改：

```js
"use strict";
var obj = {};

// 新增一個屬性 a，writable 為 false
Object.defineProperty(obj, "a", {
  value: 2,
  writable: false,
  configurable: true,
  enumerable: true
});

obj.a = 3;

console.log(obj.a);
// TypeError: Cannot assign to read only property 'a'
```

---

### value 屬性值

`value` 用以設置屬性的值：

```js
var obj = {};

Object.defineProperty(obj,"prop1",{
  value:'This is prop1',
    writable: true,
    enumerable: true,
    configurable: true
})

console.log(obj.prop1); // This is prop1
```

`value` 是屬性描述器中最普遍使用的，甚至不需要 `Object.defineProperty` 就能夠直接存取：

```js
var obj = { prop1: 'This is prop1' };
console.log(obj.prop1) // This is prop1

obj.prop1 = 'prop1 is changed!'
console.log(Object.getOwnPropertyDescriptor(obj, "prop1"))
// {
//   value: 'prop1 is changed!',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
- [Object.defineProperty() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [属性标志和属性描述符](https://zh.javascript.info/property-descriptors)
- [JavaScript - 屬性描述器 (1)](https://ithelp.ithome.com.tw/articles/10197826)
- [JavaScript - 屬性描述器 (2)](https://ithelp.ithome.com.tw/articles/10197827)
