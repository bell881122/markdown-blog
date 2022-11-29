---
title: 'Title'
date: '2022-10-10'
---

講完 `this` 之後，接著就來說說 `this` 指向的物件了。

在 JS 中，主要有 7 種型別，外加 2 種物件的子型別。
- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `symbol` (ES6+)
- `object`
	- `function`（一種可調用的物件）
	- `array`（一種使用索引儲存內容的物件）

除了 `object` 之外，以上其他都屬於「基本型別（primary types）」，將在型別的部分另作討論。

---

## 物件（Object）
- 定義了多組屬性／鍵（property / key）和值／內容（value / content）的集合
- 物件不保存任何值，實質上只是儲存屬性名稱的容器
- 物件的屬性名稱必須符合 JS 識別字規則，其作用與變數相似，是指向值具體儲存位置的參考（reference）

### 屬性存取 property access
- 使用「`.`」
	- 只能用來存取符合識別字（Identifier）規則的屬性名稱，如： `myObject.a;`
- 使用「`[]`」
	- 可以存取所有符合 `UTF-8/unicode` 標準的屬性名字串，如：`myObject["default-data"];`
	- 使用字串值來指定參考，因此可以使用變數或其他方式動態組合而成，如：`var a = "foo"; myObject[a + "2"];`

---

## 陣列（Array）
陣列是物件的子類型之一，採用非負整數做為「索引（Index）」對應值的位置。

由於陣列也是物件的一種，因此能夠添加屬性，增加新屬性後，不會改變陣列 `length` 所回傳的值（`length` 本身也是陣列固有的一個屬性）。

```js
var myArray = [ "foo", 42, "bar" ];

myArray["a"] = "A";
myArray.length;	// 3
myArray.a;		// "A"
myArray;        // Array(3) [ "foo", 42, "bar" ]
```

但如果新增的屬性能夠轉換為數字，則陣列本身的值會被改變：
```js
var myArray = [ "foo", 42, "bar" ];

myArray["3"] = "baz";
myArray.length;	// 4
myArray[3];		// "baz"
myArray;        // Array(4) [ "foo", 42, "bar", "baz" ]
```

---

## 函式 Function
函式是一種能夠「被調用」的物件，並且函式在宣告後會自動添加 `name` 屬性：

```js
// 函式宣告
function foo() { };
foo.name;   // foo

// 函式表達式
var foo2 = function () { };
foo2.name; // foo2

// 函式表達式（具名）
var foo3 = function foo4() { };
foo3.name;  // foo4
```

---

## 總結：
JS 系列終於來到物件的部分，是一個比 `this` 還大的篇章，同樣會分好幾篇討論物件和物件屬性。

話說回來，整個文章的進度截至目前為止還不到一半，我這是要把鐵人 30 寫成鐵人 60 了嗎......

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
