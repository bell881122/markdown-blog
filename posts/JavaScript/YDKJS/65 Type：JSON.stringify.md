---
title: 'Title'
date: '2022-11-19'
---

#### `JSON.stringify`
`JSON.stringify` 能夠將一個值序列化為與 JSON 格式相容的 `string`，但它和強制轉型的規則有所不同，並不是單純的 ToString 行為。

對於最簡單的值，`JSON.stringify` 和 `toString()` 轉換的結果是相同的：
```js
console.log(JSON.stringify(42));	// "42"
console.log(JSON.stringify("42"));	// ""42""，一個包含雙引號的字串
console.log(JSON.stringify(null));	// "null"
console.log(JSON.stringify(true));	// "true"
```

陣列和物件則會按照它們具有的結構被轉化為字串：
```js
console.log(JSON.stringify([
  [1, 2, 3],
  ["A", "B", "C"],
  [{}, [], true, null]
]));
// "[[1,2,3],["A","B","C"],[{},[],true,null]]"

console.log(JSON.stringify({
  a: {
    b: {
      c: {}
    }
  }
}));
// "{"a":{"b":{"c":{}}}}"
```

有些型別並不是合法的 JSON 值，直接轉化它們的值時會被 `JSON.stringify` 忽略，獲得單純的 `undefined`；在 `array` 或 `object` 中遇到這些型別時，則會被替換為 `null`：
```js
console.log(JSON.stringify(undefined));	// undefined，不是字串
console.log(JSON.stringify(Symbol(1)));	// undefined
console.log(JSON.stringify(function () { }));	// undefined
console.log(JSON.stringify([1, undefined, Symbol(1), function () { }, 4]));	// [1,null,null,null,4]
console.log(JSON.stringify({ a: 2, b: function () { } }));	// {"a":2}
```

而試著字串化一個循環引用的 `object` ，程式會回報錯誤：
```js
const obj = {}
const obj2 = { b: obj }
obj.a = obj2
console.log(obj)
// <ref *1> { a: { a: [Circular *1] } }
// Node.js 顯示為 Circular，即循環引用

console.log(JSON.stringify(obj));
// TypeError: Converting circular structure to JSON 
```

---

## `toJSON`
如果一個物件擁有自定義的 `toJSON` 方法，那麼執行 `JSON.stringify` 會優先調用這個方法：
```js
var obj = {
  a: "A",
  b: 42,
};

console.log(JSON.stringify(obj));
// {"a":"A","b":42}

// `Object.prototype` 上並未預設這個方法
console.log(Object.prototype.toJSON);
// undefined

obj.toJSON = function () {
  return { b: this.b };
};

console.log(JSON.stringify(obj));
// {"b":42}
```

使用 `toJSON` 這個方法時有個常見的誤解，它的功能並不是返回一個 JSON 字串，而是返回合法於 JSON 的普通值，而 `JSON.stringify` 自己會處理字串化的部分：
```js
var a = {
  val: [1, 2, 3],
  toJSON: function () {
    // 返回一個陣列
    return this.val.slice(1);
  }
};

var b = {
  val: [1, 2, 3],
  toJSON: function () {
    // 返回一個字串
    return "[" +
      this.val.slice(1).join() +
      "]";
  }
};

console.log(JSON.stringify(a));
// "[2,3]"，JSON 字串

console.log(JSON.stringify(b));
// '"[2,3]"'，包在 JSON 字串內的字串
```

---

## 可選參數
另外，`JSON.stringify` 擁有一個可選的第二參數，它是一個替換器（replacer），接受一個 `array` 或者 `function`。這個替換器相當於過濾機制，指定 `object` 的哪個屬性應該或不應該返回。

當第二參數傳入 `array` 時，指定了應該返回的屬性名；傳入 `function` 時則會接收到鍵（key）與值（value）兩個參數：
```js
var obj = {
  a: true,
  b: 42,
  c: "42",
  d: [1, 2, 3]
};

// array 指定應該返回的屬性
console.log(JSON.stringify(obj, ["a", "b"]));
// "{"a":true,"b":42}"

// function 傳入 key 和 value 兩個參數
console.log(JSON.stringify(obj, function (k, v) {
  if (k !== "c") return v;
}));
// "{"a":true,"b":42,"d":[1,2,3]}"
```

傳入的 `function` 在第一次調用時，接收到的是傳入的物件本身，往後才是各個鍵與值；另外，`JSON.stringify` 是遞迴操作，所以陣列的每個值同樣會被傳遞給替換器，並使用數字索引作為 key 值：
```js
var obj = {
  a: true,
  b: 42,
  c: "42",
  d: [1, 2, 3]
};

JSON.stringify(obj, function (k, v) {
  console.log(k, v)
  return v;
});
// { a: true, b: 42, c: '42', d: [ 1, 2, 3 ] }
// a true
// b 42
// c 42
// d [ 1, 2, 3 ]
// 0 1
// 1 2
// 2 3
```

`JSON.stringify` 的第三個參數則是填充符（space），也就是縮排（indentation）。填充符可以是一個正整數或一個字串，如果是一個正整數，則表示了每一級縮排應填入幾個空格符號，如果是一個字串，則每一級縮排會使用它的前 10 個字符：
```js

var a = {
  b: 42,
  c: "42",
  d: [1, 2, 3]
};

console.log(JSON.stringify(a, null, 4));
//"{
//    "b": 42,
//    "c": "42",
//    "d": [
//        1,
//        2,
//        3
//    ]
//}"

// 超出 10 個字符的部分會被忽略
console.log(JSON.stringify(a, null, "-----=====***"));
// "{
//   -----====="b": 42,
//   -----====="c": "42",
//   -----====="d": [
//   -----=====-----=====1,
//   -----=====-----=====2,
//   -----=====-----=====3
//   -----=====]
//   }""
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
- [JSON.stringify() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
