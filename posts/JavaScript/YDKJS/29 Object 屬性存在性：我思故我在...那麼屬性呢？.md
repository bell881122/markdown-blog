---
title: 'Title'
date: '2022-10-14'
---

## 存在性（Existence）

在操作 JS 的物件屬性時，我們有時會有個困惑：

如果存取某個物件的值時返回了 `undefined`，那麼這個屬性到底是本來就不存在，還是它存在著，只是儲存了一個 `undefined` 值？

在 JS 當中，我們擁有一些方法能夠查看物件擁有的屬性，或者辨別一個屬性是否實際存在於物件當中。

---

## 查看物件擁有的屬性

基本上有幾種方法能夠查看物件擁有的屬性：
- `Object.getOwnPropertyNames()`
	- 直接回傳在物件上找到的所有屬性，是查看物件屬性最安全的方法
- `Object.keys()`
	- 回傳物件中**可枚舉**的屬性
	- 不會取得原型鍊上的屬性
- `for...in`
	- 迭代物件中**可枚舉**的屬性，與 `Object.keys()` 不同的是，在原型鍊上的屬性（以及陣列的索引）也會執行迭代

> 可枚舉（enumerable）：參見後面的屬性描述符章節，如果一個屬性的 `enumerable` 被設置為 `false`，則這個屬性就無法被枚舉。

使用方式參考以下範例：
```js
var obj1 = {
  a: 1,
  b: 2,
  c: 3
};

var obj2 = Object.create(obj1)
obj2.d = 4;
obj2.e = 5;

console.log(Object.keys(obj1));
// [ 'a', 'b', 'c' ]

console.log(Object.keys(obj2));
// [ 'd', 'e' ]

console.log(Object.getOwnPropertyNames(obj1));
// [ 'a', 'b', 'c' ]

console.log(Object.getOwnPropertyNames(obj2));
// [ 'd', 'e' ]

for (const key in obj1) {
  console.log(key)
}
// a b c

for (const key in obj2) {
  console.log(key)
}
// d e a b c
```

### 使用於陣列的 `for..in`
`for..in` 操作執行的是迭代物件中的（可列舉的）屬性，使用在陣列上時，它不只會枚舉出所有陣列的屬性，同時還包括所有數字索引：
```js
var obj = ["A", "B", 'C'];
obj.prop1 = "Property1"
obj.prop2 = "Property2"

for (var k in obj) {
  console.log(k, obj[k]);
}
//  0 A
//  1 B
//  2 C
//  prop1 Property1
//  prop2 Property2
```

因此相對來說較安全的操作是：只把 `for..in` 使用在純粹的物件上，而不使用在陣列上。

---

## 查看屬性是否存在
- `in` 操作符
	- 檢查一個屬性是否存在於物件中，或者存在於物件的原型鍊上
- `hasOwnProperty`
	- 檢查一個屬性是否存在於物件內部（不包含原型鍊上的屬性）

使用方式參考以下範例：
```js
var obj1 = {
  a: 1,
};

// 以 obj1 作為原型建立新物件
var obj2 = Object.create(obj1);
obj2.b = 2;

console.log("a" in obj1); // true
console.log("b" in obj1); // false

console.log("a" in obj2); // true
console.log("b" in obj2); // true

console.log(obj1.hasOwnProperty("a")); // true
console.log(obj1.hasOwnProperty("b")); // false

console.log(obj2.hasOwnProperty("a")); // false
console.log(obj2.hasOwnProperty("b")); // true
```

### `in` 操作符的意外性
`in` 操作符在語意上容易被誤會為檢察一個值是否存在，但它實際上是檢查物件的屬性是否存在，在陣列上尤其容易造成誤解：

```js
var arr = [2, 4, 6];

console.log(4 in arr); // false
console.log(0 in arr); // true
console.log(Object.getOwnPropertyNames(arr)); // [ '0', '1', '2', 'length' ]
```

### `hasOwnProperty` 的侷限
由於 `hasOwnProperty` 是存在於 `Object.prototype` 的方法，而使用 `Object.create(null)` 這樣方法創造出來的物件，因為沒有鍊結到 `Object.prototype`，因此無法調用這個方法：
```js
var obj = Object.create(null);
obj.a = 2;

console.log(obj.hasOwnProperty("a"));
// TypeError: obj.hasOwnProperty is not a function
```

這時候的一個補救措施，是使用 `call` 來明確綁定函式的 `this` 來調用該方法：
```js
var obj = Object.create(null);
obj.a = 2;

console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
