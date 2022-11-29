---
title: 'Title'
date: '2022-10-13'
---

## 傳值 v.s. 傳址
在程式中，傳遞內容基本上有兩種方法，一種是傳值，另一種則是傳址（又稱傳參）：

- 傳址／傳參（Call by reference / Pass by reference）：傳遞的內容為記憶體參考，而非實際值。
- 傳值（Call by value / Pass by value）：傳遞的內容為除 `object` 外的任意基本型別，非變數也非物件屬性的「純值」。

使用傳址的好處是節省記憶體，不需要開闢那麼多額外空間，而且使用非常方便，只要對應同個參考就好，如果多個地方共用相同的內容，要修改時也只需要更改一處，非常方便。

與此相對的，由於記憶體指向的是同一個位置，容易不小心改變某個由多個物件共用參考的內容，而非專屬於該物件的內容。

---

## 複製物件
前面已經提過，JS 物件實際上並不儲存任何值，而是將這些值的記憶體參考作為「屬性」存在物件內部，也就是所謂的「傳址／傳參」。

因此在複製物件時，如果僅複製記憶體參考，兩個物件內部的值實質上是指向同一個記憶體空間，就稱為「淺拷貝」。

而「深拷貝」則是將原本的值本身完整複製出來，並放到另一個記憶體空間，其結果會與原複製物件指向完全不同的參考。

- 淺拷貝：僅複製了參考，複製內容共用同個記憶體空間，概念類似於超連結。
- 深拷貝：完整複製了值與結構，複製內容使用不同記憶體空間，概念類似於克隆。

---

## 淺拷貝（Shallow Copy）

淺拷貝是 JS 中物件最常見的複製方式，參考以下範例：

```js
function anotherFunction() { /*..*/ }

var anotherObject = {
	c: true
};

var anotherArray = [];

var myObject = {
	a: 2,              // 純值
	b: anotherObject,  // 參考
	c: anotherArray,   // 參考
	d: anotherFunction // 參考
};
```

上面程式碼中，我們最後得到了一個新物件 `myObject`，它的 `a` 是個數字純值，但 `b`、`c`、`d` 都只是指向內容儲存位置的參考，因此這三個屬性的內容都屬於淺拷貝。

以下就來介紹一些淺拷貝的常見方式：

### Object.assign()
使用 `Object.assign()` 時，可以複製一個或多個物件自身的屬性到另一個目標物件上，回傳值為該目標物件。

```js
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }，回傳一個新物件
console.log(o1);  // { a: 1, b: 2, c: 3 }，目標物件本身也被改變
```

當合併物件包含同名屬性時，後傳入的物件屬性會覆蓋前面：
```js
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

傳入 `undefined` 和 `null` 作為參數時會被忽視：
```js
var o1 = { a: 1 };

var obj = Object.assign({}, null, undefined, o1);
console.log(obj); // { a: 1 }
```

傳入基本類型作為參數時，只有可枚舉的類型（字串）會被複製：
```js
var o1 = Object.assign({}, "abc");
var o2 = Object.assign({}, true);
var o3 = Object.assign({}, 10);
var o4 = Object.assign({}, Symbol('foo'));

console.log(o1); // { '0': 'a', '1': 'b', '2': 'c' }
console.log(o2); // {}
console.log(o3); // {}
console.log(o4); // {}

```

### 使用展開運算符
使用展開運算符「`...`」是另一種快速複製物件的方法，具體用法可參考[這篇文章](https://ithelp.ithome.com.tw/articles/10269997)。

---

## 深拷貝（deep copy）
由於物件可以有多層形式，在許多常見的狀況下，物件的拷貝經常都是淺拷貝，複製的是記憶體參考而非值本身。

如果要進行深拷貝，一個最常見且安全的方式是使用 JSON 格式轉換。也就是將一個物件序列化為一個 JSON 字串，之後再重新解析為擁有相同結構和值的物件：

```js
var obj = { a: "A" };
var jsonStr = JSON.stringify(obj);
var newObj = JSON.parse(jsonStr);

console.log(obj);  // { a: 'A' }
console.log(newObj); // { a: 'A' }
console.log(obj === newObj); // false
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
- [MDN-Object.assign()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [關於JS中的淺拷貝(shallow copy)以及深拷貝(deep copy)](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)
- [[JavaScript] Javascript中的傳值 by value 與傳址 by reference](https://medium.com/itsems-frontend/javascript-pass-by-value-reference-sharing-5d6095ae030b)
- [Object.assign() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 
