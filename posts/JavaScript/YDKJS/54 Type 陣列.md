---
title: 'Title'
date: '2022-11-08'
---

## 陣列（Array）
所謂的陣列，就是一個以數字作為索引的集合。與其他語言相比，JS 的陣列具有以下特色：
- 同個陣列內不限制元素的型別
	- JS 並非強型別的語言，因此陣列的內容同樣不限制型別，任何類型的值都可以放入同個陣列中
- 不限制陣列的長度
	- 陣列的長度不需要在宣告時指定，可以在任何時候增加或減少

### 陣列的使用注意事項

##### 屬性（Properties）
JS 的陣列是物件的子型別，因此同樣能夠添加屬性，但非數字的鍵值不會計算進 `length` 中：
```js
var a = [];
a[0] = 1;
a["foo"] = "FOO";

console.log(a.length);	// 1
console.log(a["foo"]);	// FOO
console.log(a.foo);     // FOO
```

##### 陣列與 `length`
陣列的 `length` 是可以手動指定的，如果指定的 `length`  與原本的陣列長度不同，超過的會填入空值（empty item），少於則等同刪除溢出長度的元素：
```js
var a = [];
a.length = 3
console.log(a); // [ empty × 3 ]

var b = ["A", "B", "C"];
b.length = 1
console.log(b); // [ "A" ]
```

##### 屬性強制轉型
一個容易踩到的陷阱是，如果使用可以被強制轉型為 10 進制數字的字串作為陣列鍵值，JS 會將它自動轉型為數字，並作為數字索引使用：

```js
var a = [];
a["13"] = 42;
console.log(a.length); // 14
console.log(a); // [ empty × 13, 42 ]
```

因此使用陣列時建議不要添加字串的鍵／屬性，而是將陣列單純作為數字索引的集合使用。

##### 刪除陣列屬性
對陣列使用 `delete` 與物件一樣，會刪除這個鍵值及其內容，但 `delete` 並不會更新 `length`，`delete` 既有的數字鍵值等同於賦予一個空值（empty item），或者更準確來說，創造了一個空值槽（empty slots）：

```js
var a = [];
a[0] = 1;
a[2] = 3;
console.log(a.length);  // 3
console.log(a[1]);  // undefined

delete a[2];
console.log(a[2]);  // undefined
console.log(a.length); // 3
console.log(a);  // [ 1, empty × 2 ]
```

##### 陣列與空值
陣列的空值是個微妙的狀態，當你試圖呼叫一個空值，會發現程式沒有任何回應：
```js
var a = [];
a.length = 3
console.log(a);  // [ empty × 3 ]
a.forEach(x => console.log(x)); // 程式無反應
```

這種狀況實際上能夠理解為，`a` 這個陣列改變了 `length` 的值，實際上卻沒有添加任何包括數字的屬性／鍵值，`a` 的內容實際上是這樣的：
```js
var a ={
  length: 3
}
```

這種狀況與 `undefined` 不同，`undefined` 具有值，只是值的內容是 `undefined`：
```js
var b = [1, undefined, undefined]
b.forEach(x => console.log(x)); // 1 undefined undefined
```

`b` 的內容是這樣的：
```js
var b = {
  0: 1,
  1: undefined,
  2: undefined,
  length: 3
}
```

所以當一個陣列的內容擁有空值時，可以想像為丟失了該數字索引的鍵值，比方說以下的 `c`：
```js
var c = [];
c[0] = "A";
c[2] = "C";
console.log(c.length); // 3
c.forEach(x => console.log(x)); // A C
```

`c[2] = "C";` 這個操作讓 c 的 `length` 變成 `3`，但實際上 `c` 並沒有 `1` 這個屬性／鍵值：
```js
var c = {
  0: "A",
  2: "C",
  length: 3
}
```

因此在使用陣列時，要留意會製造出空值的操作，像這樣帶有至少一個空值槽的陣列被稱為「稀疏陣列（sparse array）」，執行它們時可能會帶來意料之外的執行結果。

```js
var a = new Array(3);
var b = [undefined, undefined, undefined];

console.log(a.join("-")); // "--"
console.log(b.join("-")); // "--"

console.log(a.map(function (v, i) { return i; })); // [empty × 3]
console.log(b.map(function (v, i) { return i; })); // [ 0, 1, 2 ]
```

如上程式碼中，`new Array(3);` 操作指定了陣列值卻沒有填入內容，創造了擁有三個空值槽的陣列。

`a` 與 `b` 使用 `join("-")` 的結果相同，使用 `map` 的結果卻不同，因為 `a` 的值槽根本沒有實際的內容，所以 `map` 也沒有東西能迭代。

而 `join` 的邏輯則類似於下方，是以 `length` 執行迴圈實現的，所以不受空值影響：
```js
function fakeJoin(arr, connector) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    if (i > 0) {
      str += connector;
    }
    if (arr[i] !== undefined) {
      str += arr[i];
    }
  }
  return str;
}

var a = new Array(3);
console.log(fakeJoin(a, "-")); // "--"
```

---

## 類陣列（Array-Likes）
類陣列是與陣類相似但有所不同的物件，主要有以下特徵：
- 可以使用索引取值
- 擁有 `length` 屬性
- 可被枚舉

JS 常見的類陣列物件如下：
- 函式內部的 `arguments`
- DOM 物件列表（NodeList）

### 函式內部的 `arguments`
```js
function func() {
  const arr = Array.prototype.slice.call(arguments);
  arr.push("C");
  console.log(arr); // [ "A", "B", "C" ]
  console.log(arr[1]); // "B"
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

這樣的話，可以將字串簡單視為儲存 `string` 的陣列嗎？顯然不完全是這樣：
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

`array `卻能夠被原地修改，它只是調整了值槽裡的值，整個 `array` 依然指向同個參考：
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

這時候就必須使用迂迴方式，將 `string` 轉為 `array`，接著再轉回 `string`：
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
