---
title: 'Title'
date: '2022-10-15'
---

## 屬性描述器（Property Descriptors）

我們已經知道，物件內藉由儲存屬性這樣一個參考來指向實際值／內容。

JS 在 ES5 的版本以後，新增了「屬性描述器（Property Descriptors）」這個功能。讓物件內的屬性同時不再只是一個記憶體位置的參考，而能夠自由配置一個屬性該如何被存取，擁有非常強大的靈活性。

屬性描述器主要分成資料描述器（data descriptor）與訪問描述器（accessor descriptor）兩種，且只能選擇一種屬性描述方式，**兩者無法相容**。以下介紹描述器擁有的配置選項：

- 資料與訪問描述器共享：
	- enumerable：屬性能否被枚舉
	- configurable：屬性能否改變描述器設置
- 資料描述器：資料擁有一個 `value`，並由 `writable` 決定 `value` 是否能被覆蓋
	- value：設置屬性值／內容，預設為 `undefined`
	- writable：屬性能否被覆寫
- 訪問描述器：屬性的值由取值器（getter）和設值器（setter）決定
	- get：由一個取值器函式表述屬性如何取得，沒有設置的話則回傳 `undefined`
	- set：由一個設值器函式表述屬性如何覆寫，函式接收一個賦值給屬性的值作為唯一參數，沒有設置的話則回傳 `undefined`。

---

## `Object.getOwnPropertyDescriptor`

使用 `Object.getOwnPropertyDescriptor()` 這個函式可以檢視物件特性屬性的屬性描述器，使用方式如下：
```js
var obj = {
	a: "objProA"
};

Object.getOwnPropertyDescriptor( obj, "a" );
// {
//    value: "objProA",
//    writable: true,
//    enumerable: true,
//    configurable: true
// }
```

從上面程式碼可以看到，使用字面值定義的物件，預設使用資料描述器，以下方法的範例也都使用資料描述器作介紹。

---

## `Object.defineProperty`

我們可以使用 `Object.defineProperty` 手動修改某個已有屬性的配置，也可以新增某個屬性同時增添它的配置：

```js
var obj1 = {
  a: "objProA"
};

Object.defineProperty(obj1, "a", {
  writable: false
})

Object.defineProperty(obj1, "b", {
  value: "objProB",
  writable: true,
})

Object.defineProperty(obj1, "c", {})

console.log(
  Object.getOwnPropertyDescriptor(obj1, "a"),
  Object.getOwnPropertyDescriptor(obj1, "b"),
  Object.getOwnPropertyDescriptor(obj1, "c"),
)

// {
//   value: 'objProA',
//   writable: false,
//   enumerable: true,
//   configurable: true
// }
// {
//   value: 'objProB',
//   writable: true,
//   enumerable: false,
//   configurable: false
// }
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

從上面能夠看到，當使用字面值直接新增屬性時，`writable`、`enumerable`、`configurable` 預設皆為 `true` 。

不過如果一個屬性是藉由 `defineProperty` 新增的，則未配置的內容會預設為 `false`，如果新增時未指定 `value` 內容，便預設為 `undefined` 。

---

## `Object.getOwnPropertyDescriptors`
`Object.getOwnPropertyDescriptors` 可一次獲取所有屬性的描述符。

```js
var obj = { prop1: 'prop1', prop2: 'prop2' };
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   prop1: {
//     value: "prop1",
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   prop2: {
//     value: "prop2",
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
```

---

## `Object.defineProperties`
使用 `Object.defineProperties` 可以一次配置多個屬性的描述符：

```js
var obj = { prop1: 'prop1' };
Object.defineProperties(obj, {
  prop1: {
    writable: false,
  },
  prop2: {
    value: 'prop2',
    writable: true,
    enumerable: true,
    configurable: true
  },
})

console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   prop1: {
//     value: 'prop1',
//     writable: false,
//     enumerable: true,
//     configurable: true
//   },
//   prop2: {
//     value: 'prop2',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
```

如果將 `Object.getOwnPropertyDescriptors` 與 `Object.defineProperties` 一起使用，則可以複製原物件的屬性描述符：

```js
var obj = {};
Object.defineProperties(obj, {
  prop1: {
    value: 'prop1',
    writable: false,
    enumerable: true,
    configurable: true
  },
  prop2: {
    value: 'prop2',
    writable: true,
    enumerable: false,
    configurable: true
  }
})

var clone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(obj)
);
console.log(Object.getOwnPropertyDescriptors(clone));
// {
//   prop1: {
//     value: 'prop1',
//     writable: false,
//     enumerable: true,
//     configurable: true
//   },
//   prop2: {
//     value: 'prop2',
//     writable: true,
//     enumerable: false,
//     configurable: true
//   }
// }
```

---

## 內層物件不共享屬性描述器

屬性描述器是屬於物件本身的，如果屬性的值指向另一個物件，則下層物件內的屬性不會分享上層物件的屬性描述器。

```js
var obj = {};
var innerObj = { innerProp: 'This is innerProp' };

Object.defineProperty(obj, 'prop1', {
  value: innerObj,
  writable: false,
});

// 試圖覆寫 obj.prop1 -> 失敗
obj.prop1 = 'prop1 changed!';
console.log(obj.prop1);
// { innerProp: "This is innerProp" }

// 試圖覆寫 obj.prop1.innerProp -> 成功
obj.prop1.innerProp = 'innerProp changed!';
console.log(obj.prop1);
// { innerProp: "innerProp changed!" }
```

---

## 總結：
終於來到第 30 天了，首先是恭喜自己完賽～（灑花慶祝）
然後就是整個讀書筆記還遠遠沒有完結，只好繼續努力吧（哭）

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
- [Object.defineProperty() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [属性标志和属性描述符](https://zh.javascript.info/property-descriptors)
- [JavaScript - 屬性描述器 (1)](https://ithelp.ithome.com.tw/articles/10197826)
- [JavaScript - 屬性描述器 (2)](https://ithelp.ithome.com.tw/articles/10197827)
