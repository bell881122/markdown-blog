---
title: 'Title'
date: '2022-11-09'
---

## 類陣列（Array-Likes）
類陣列與陣類相似但有所不同，在 JS 中被歸類為「物件」，`Array.isArray` 的檢測為 `false`。主要有以下特徵：
- 可以使用索引取值
- 擁有 `length` 屬性
- 可被枚舉

JS 常見的類陣列物件如下：
- 函式內部的 `arguments`
- DOM 物件列表（NodeList）

### 函式內部的 `arguments`
```js
function func() {
  console.log(arguments);
  // { '0': 'A', '1': 'B' }

  const arr = Array.prototype.slice.call(arguments);
  arr.push("C");
  console.log(arr);
  // [ 'A', 'B', 'C' ]
}

func("A", "B");
```

上面的 `Array.prototype.slice.call(arguments);` 在 ES6 以後，也可以用下面兩種寫法取代。

使用 `Array.from`：
```js
const arr = Array.from(arguments);
```

使用 `...` 運算符：
```js
const arr = [...arguments];
```

---

## 字串（String）
字串與陣列有些相似的地方，比方說它們擁有一些相同的屬性和方法：

```js
var a = "foo";
var b = ["f", "o", "o"];

console.log(a.length);  // 3
console.log(b.length);  // 3

console.log(a.indexOf("o"));  // 1
console.log(b.indexOf("o"));  // 1

console.log(a.concat("bar"));  // "foobar"
console.log(b.concat(["b", "a", "r"]));  // ["f","o","o","b","a","r"]
```

這樣的話，可以將字串簡單視為字符的陣列嗎？顯然不完全是這樣：
```js
var a = "abc";
var b = ["a", "b", "c"];

console.log(a[1]);  // "b"
console.log(b[1]);  // "b"

a[1] = "B";
b[1] = "B";

console.log(a); // "abc"
console.log(b); // [ 'a', 'B', 'c' ]
```

JS 的 `string` 是純值，也就是不可變的（immutable），沒有任何方法可以原地修改一個 `string` 的內容，而是永遠都會返回一個新的字串。

`array `則能夠被原地修改，它只是調整了值槽裡的值，整個 `array` 依然指向同個參考：
```js
var a = "abc";
var b = ["a", "b", "c"];

c = a.toUpperCase(); // "ABC"
console.log(a === c); // false
console.log(a); // "abc"
console.log(c); // "ABC"

b.push("!");
console.log(b); // [ 'a', 'b', 'c', '!' ]
```

另外，由於兩者具有的相似性，`string` 可以向 `array` 借用某些方法：
```js
var a = "abc";
var b = ["a", "b", "c"];

console.log(a.join); // undefined
console.log(a.map); // undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function (v) {
  return v.toUpperCase() + ".";
}).join("");

console.log(c); // "a-b-c"
console.log(d); // "A.B.C."
```

不過在某些方法上則無法奏效，原因也就在於 `string` 是不可變的，無法原地修改：
```js
var a = "abc";
var b = ["a", "b", "c"];

b.reverse();
console.log(b); // [ 'c', 'b', 'a' ]

Array.prototype.reverse.call(a);
// TypeError: Cannot assign to read only property '0' of object '[object String]'
```

這時候就必須使用迂迴方法，將 `string` 轉為 `array`，接著再轉回 `string`：
```js
var a = "abc";
var c = a.split("").reverse().join("");

console.log(c); // "cba"
```

另外，由於編碼轉換問題，這種方法無法處理含有 `unicode` 字符的字串。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 2: Values](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch2.md)
- [你不懂JS：类型与文法 | 第二章：值](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch2.md)
- [什麼是Array-like?](https://medium.com/on-my-way-coding/%E4%BB%80%E9%BA%BC%E6%98%AFarray-like-1fa605ddd001)
