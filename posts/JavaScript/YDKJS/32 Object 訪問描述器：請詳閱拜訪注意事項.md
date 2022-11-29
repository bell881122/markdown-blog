---
title: 'Title'
date: '2022-10-17'
---


## 屬性訪問

程式在執行物件屬性訪問（property accesses）時有一個的細節。比方說 `obj.a` 並不只是找到一個 `obj` 物件，然後取得它的 `a` 屬性，它實際上調用了一個內建函式，並依照某些特定條件執行。

1. 首先它會檢查物件，尋找物件內部是否有符合名稱的屬性。
2. 物件內部沒有找到的話，程式會遍歷該物件的原型鍊繼續尋找。
3. 如果最後找到了該屬性，則會返回相應的值。如果到最後都沒有找到，就會返回一個 `undefined`。

```js
var obj = {
	a: undefined
};

console.log(obj.a); // undefined
console.log(obj.b); // undefined
```

以上程式碼內，從結果上來說查詢 `obj.a` 和 `obj.b` 同樣返回 `undefined`，但在底層的操作中，查詢 `obj.b` 實際多了一些處理步驟。

除此之外，物件屬性查找與變數查找的一個明顯不同是，作用域內如果找不到變數，會返回 `ReferenceError`，但物件屬性查找不會出現 `ReferenceError`，而是在失敗後返回一個 `undefined` 。

---

## 屬性設置
與屬性訪問相同，物件在修改屬性時，同樣會調用一個內部的函式，並根據屬性是否已經存在，表現出不同行為。

1. 如果屬性存在，會檢查這個屬性是否為一個訪問描述器（accessor descriptor），並且是否為一個 `setter`，如果是，就調用這個 `setter`。
2. 如果這個屬性擁有 `writable` 為 `false` 這個屬性描述符，在非嚴格模式下無聲地失敗，在嚴格模式下則拋出一個 `TypeError`
3. 如果以上狀況皆未觸發，就直接設置該值。

---

## 取值器 & 設值器

以下就來介紹訪問描述器（accessor descriptor）。在 ES5 以後出現的屬性描述符，可以替屬性設置 `get` 與 `set`，分別可以看做是這個屬性的取值器（getter）與設值器（setter）。

`get` 與 `set` 的內容都是一個函式，前者會在對屬性取值時被調用，後者會在屬性設值時被調用。

它們可以藉由字面值定義，也可以使用 `Object.defineProperty` 定義：

```js
var obj = {
  get a() {
    return 2;
  }
};

Object.defineProperty(
  obj,
  "b",
  {
    get: function () { return this.a * 2 },
  }
);

console.log(obj.a); // 2
console.log(obj.b); // 4
console.log(Object.getOwnPropertyDescriptor(obj, "b"));
// {
//   get: [Function: get],
//   set: undefined,
//   enumerable: false,
//   configurable: false
// }
```

設置取值器後，訪問該屬性會自動調用取值器函式，函式返回的值就是屬性訪問獲得的結果：

```js
var obj = {
  get a() { 
    return 2;
   }
};

obj.a = 3;
obj.a; // 2
```

以上程式碼中，將 `obj.a` 重新賦值並不會報錯，只會讓賦值無聲地失敗。所以大多時候，我們會同時設置取值器與設值器，只有他們單一任一個經常會導致非預期的結果。

設置取值器與設值器的範例：
```js
var obj = {
	get a() {
		return this.privateProp;
	},
	set a(val) {
		this.privateProp = val * 2;
	}
};

obj.a = 2;
console.log(obj.a); // 4
```

在上面的程式碼中，我們利用了 `this` 的隱含綁定設置 `privateProp` 這個屬性，並在取值和設值時訪問該屬性。

### 資料或訪問描述二擇一
屬性的描述符風格只能在資料描述符與訪問描述符中則一，如果一個屬性設置了 `get` 或 `set` 或兩者都有，它便不能同時具備 `writable` 或 `value` 描述符，否則會拋出 `TypeError`：

```js
var obj = {};

Object.defineProperty(obj, "prop1",
  {
    get: function () { return 2; },
    writable: false,
  }
);

// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
- [属性的 getter 和 setter](https://zh.javascript.info/property-accessors)
- [JavaScript - 屬性描述器 (1)](https://ithelp.ithome.com.tw/articles/10197826)
- [JavaScript - 屬性描述器 (2)](https://ithelp.ithome.com.tw/articles/10197827)
