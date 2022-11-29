---
title: 'Title'
date: '2022-11-03'
---

## 封箱（Boxing）

在前面的文章有提到，像是 `"abc"` 這樣非物件的純值，要取得 `length` 等屬性，就需要物件包裹器（wrapper）來將這段字串包裹為物件，接著才能取得屬性。

對大多數的基本型別，如 `string`、`number`、`boolean` 等，想要對它們存取屬性或方法時，JS 引擎會自動地為這些純值進行封箱，將它們放進包裹器，獲得一個能夠調用屬性或方法的物件。

```js
console.log("abc".length); // 3
```

我們也能手動創造一個字串包裝物件：

```js
var str1 = "abc";
console.log(str1.length);   // 3

var str2 = new String("abc");
console.log(str2.length);   // 3
console.log(typeof str2);   // object
console.log(str2);   // [String: 'abc']

console.log(str2 === str1);  // false
console.log(str2.valueOf() === str1);  // true
```

從上面兩者的比較可以更清楚地看到，`str1.length` 執行的過程中，其實程式執行了自動封箱（Autoboxing），偷偷替 `str1` 的值裹上 `String` 這個內建函式。而 `str2` 則是手動調用 `String` 建立的，本身就是個物件，同樣能夠調用 `length` 屬性，並藉由 `valueOf` 方法取得原值。

除了使用 `new` 運算子之外，要建立一個基本類型值，也可以直接使用 `Object` 函式：

```js
var a = "abc";
var b = new String(a);
var c = Object(a);

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

console.log(Object.prototype.toString.call(b)); // "[object String]"
console.log(Object.prototype.toString.call(c)); // "[object String]"
console.log(a === b.valueOf()); // true
console.log(a === c.valueOf()); // true
```

### 封箱的陷阱
一般來說，由於基本類型值調用屬性和方法時，JS 會自動進行封箱，因此在非必要情況下，並不建議對這些值進行手動封箱，否則可能會遇到像這樣的陷阱：

```js
var a = new Boolean(false);

if (!a) {
  // a 是一個物件，所以永遠不會進入這裡
  console.log("Oops");
}
```

---

## 開箱（Unboxing）

想要取出一個包裝物件底層的基本類型值，可以使用 `valueOf` 方法：
```js
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );

console.log(a.valueOf()); // "abc"
console.log(b.valueOf()); // 42
console.log(c.valueOf()); // true
```

使用 `toString` ，則可以獲得基本類型值的字串：
```js
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

console.log(a.toString()); // "abc"
console.log(b.toString()); // "42"
console.log(c.toString()); // "true"
```

如果以基本型別值的方式來操作一個包裝物件，JS 也會自動執行開箱作業（實際上來說是執行了「強制轉型」）：
```js
var a = new Number(2);
var b = a + 1;

console.log(b) // 3
console.log(typeof a) // object
console.log(typeof b) // number

var c = new String( "abc" );
var d = c + "";

console.log(d) // abc
console.log(typeof c) // object
console.log(typeof d) // string
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 3: Natives](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch3.md)
- [你不懂JS：类型与文法 | 第三章：原生类型](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch3.md)
