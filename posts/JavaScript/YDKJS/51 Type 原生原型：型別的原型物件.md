---
title: 'Title'
date: '2022-11-05'
---


## 原生原型（Native Prototypes）
延續之前對物件原型的討論，每個內建型別建構子也都擁有自己的 `prototype` 物件，如 `Array.prototype`、`String.prototype` 等等。

而借助原型委託（prototype delegation），任何字串都能訪問 `String.prototype` 上的方法；所有函式都能訪問定義在 `Function.prototype` 上的 `apply()`、`call()` 和 `bind()`，而所有物件也都能夠調用 `toString` 方法。

```js
const obj = {};
console.log(obj.__proto__ === Object.prototype);  // true
console.log(obj.toString === obj.__proto__.toString);  //true
console.log(obj.toString === Object.prototype.toString);  //true

const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);  // true
console.log(arr.__proto__.__proto__ === Object.prototype);  // true
console.log(arr.__proto__.__proto__.__proto__);  // null

function f() { }
console.log(f.__proto__ == Function.prototype);  // true
console.log(f.__proto__.__proto__ == Object.prototype);  // true
```

除此之外，有些內建型別的原型並不僅僅是單純的物件：
```js
console.log(Array.isArray(Array.prototype));  // true
console.log(Array.prototype.length);  // 0
console.log(typeof Function.prototype);  // "function"
Function.prototype();  // 一個能夠調用的空函式
```

從上面可以看到，`Function.prototype` 是一個空函式，而 `Array.prototype` 則是一個空陣列。


## 原型作為默認值
當一個物件的原型為這種型別的空狀態，這讓它們很適合成為賦值給變量的「默認」值。

```js
function isThisCool(arr, fn) {
  arr = arr || Array.prototype;
  fn = fn || Function.prototype;
  return { arr, fn }
}

console.log(isThisCool());
// { arr: Object(0) [], fn: {} }

console.log(
  isThisCool(
    ["a", "b", "c"],
    function (v) { return v.toUpperCase(); }
  )
);
// {
//   arr: ['a', 'b', 'c'],
//   fn: ƒ(v)
// }
```

這裡要留意的是，不要對「後續會做修改的值」使用 `Array.prototype` 作為默認值，`Array.prototype` 賦值的變數應該要是唯讀的，如果對該變數重新賦值，實際上修改的會是 `Array.prototype` 本身。

---

## 不要擴展原生原型
最廣為人知且經典的 JS 最佳準則之一，就是「永遠不要擴展原生原型」。

比方說，將某個自訂方法或屬性加到 `Array.prototype` 上後，如果這是一個有用的、設計良好且命名恰當的新增功能，那它在未來就很有可能會被加進 JS 語言規範中，並且直接和自訂內容衝突。

除非絕對確信這個自訂屬性／方法名稱是整個環境中唯一命名，否則擴展原生原型就是有風險的行為。

---

## 移植原生原型方法
有時候，某些好用的方法只定義在某個原生型別的原型上，因此其他型別無法調用。這時候可以替物件／陣列／函式新增既有方法，讓它同樣能夠使用這個方法：

```js
const obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj.join = Array.prototype.join;

console.log(obj.join(', ')); // Hello,world!
```

說完了型別物件，下篇開始來深入討論 JS 中的幾種型別，以及它們需要留意的地方。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 3: Natives](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch3.md)
- [你不懂JS：类型与文法 | 第三章：原生类型](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch3.md)
- [You Don't Know JS: Types & Grammar | Appendix A: Mixed Environment JavaScript](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/apA.md)
- [你不懂JS：类型与文法 | 附录A：与环境混合的 JavaScript](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/apA.md)
- [Native prototypes | MDN](https://javascript.info/native-prototypes)
