---
title: 'Title'
date: '2022-10-12'
---

### 內建物件是什麼？
在 JS 中，所謂的內建物件（Built-in Objects）其實是一系列的內建函式，它們每個都可以被當成建構子（Constructor）使用（也就是可以通過 new 呼叫的函式），並創造出一個相應的新物件（而非基本類型值）。

```js
var strPrimitive = "I am a string";
typeof strPrimitive;            // "string"
strPrimitive instanceof String;	// false

var strObject = new String( "I am a string" );
typeof strObject;            // "object"
strObject instanceof String; // true

Object.prototype.toString.call( strObject ); // [object String]
```

從以上程式碼中可以看到，`strObject` 屬於內建物件 `String` 的實例，但是 `strPrimitive` 的內容是字串，是一個字串純值。如果對 `strObject` 調用 `toString`，可以得知它是一個字串物件（Strings Object）。


### 物件包裹器（wrapper）
在一些必要的情況下，比方說調用 `length` 檢查某個字串的長度，就需要使用 `String` 物件包裝原本的字串，才能訪問  `String` 物件的 `length` 屬性。

這時 JS 會自動將基本型別 `string`  強制轉換為內建物件 `String` ，因此在 JS 當中，幾乎不需要手動創建基本型別的內建物件。

```js
var strPrimitive = "I am a string";

console.log( strPrimitive.length );			// 13
console.log( strPrimitive.charAt( 3 ) );	// "m"
```

其他例子像是：一個數字 `42` 包裝成物件會是  `new Number(42)`，而一個布林值 `true` 的包裝物件則是 `new Boolean(true)`。

這些基本型別需要使用內建屬性與方法時，JS 會自動調用 `new` 建立對應型別的內建物件，並使用這些物件裡的屬性與方法，這就是基本型別包裹器（Primitive Wrapper）。

#### `null` 和 `undefined`
`null` 和 `undefined` 僅有基本型別值，它們沒有屬於自己的物件包裹器。

#### 非基本型別
某些型別，如 `Date` 僅能以使用 `new` 的構造形式創建，因為它沒有對應的字面值（literal）形式。

另外，`Error` 物件很少被手動建立，它通常在程式拋出錯誤時自動被創建。

---

## JS 內建物件
以下僅列出常見或常用類型，其餘內建物件可參考 [MDN 連結](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects)。
- `String`
- `Number`
- `Boolean`
- `Object`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Error`
- `Map` (ES6+)
- `Set` (ES6+)

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 3: Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
- [你不懂JS：this 与对象原型 | 第三章: 对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch3.md)
