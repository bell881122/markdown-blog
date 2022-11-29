---
title: 'Title'
date: '2022-10-20'
---

## 實例物件 v.s. 建構子函式

在深入探討原型之前，這裡稍微拉出來講，物件和建構子函式彼此的關係是什麼？

在類導向（Class-orientation）的語言中，物件和建構子的關係是非常清晰明瞭的，建構子是附屬於類的一種特殊方法，接受參數建立並初始化一個的新物件。

然而在 JS 中，廣義上來講，建構子函式也是物件的一種（函式也是物件）；但狹義上來說，建構子函式不是「具體的」物件，也不算是單純的函式，更近於物件抽象化過的藍圖，需要進行實例化後產生實際的物件。就像工廠按照藍圖打造出產品，產品忠實呈現了藍圖上擁有的一切特性，並且能夠在真實世界中使用。

而通過實例化產生的物件，會擁有建構子中定義的屬性和方法，同時也可以調用它們：

```js
function Circle(radius) {
  this.radius = radius;
  this.getRadius = function () {
    console.log(`radius: ${radius}`)
  }
}

const c = new Circle(10);
c.getRadius(); // radius: 10
```

但嚴格來說，物件的實例並不擁有這些屬性和方法，它們透過建構子函式定義，實際上也附在這些建構子而非實例化的物件內部。

如上面 `radius`、`getRadius` 等屬性和方法，都寫在建構子內，當物件調用這些屬性時，實際上是尋找到物件連結的 `constructor`：
```js
console.log(c.constructor); // [Function: Circle]
```

最明顯的例子就在原生型別調用方法：
```js
let one = 1;
console.log(one.toString()); // "1"
```

變數 `one` 的值明明是個數字，為什麼能夠使用 `.` 符號調用 `toString` 方法？

關於這點在前面的說明內建物件時也有提到，使用屬性或方法時，JS 會自動調用 `new` 建立對應型別的內建物件，並使用這些物件裡的屬性與方法，這樣包裝在外面的物件又稱為基本型別包裹器（Primitive Wrapper），在 JS 內即是各種原生型別的內建物件。

與此相同的，被建構子函式實例化的物件，在調用屬性和方法時，最後實際上訪問的是附於建構子函式上的屬性與方法。即便是 `var x = {}` 這樣直接定義字面值的空物件，其實就等同於 `var x = new Object()`。

總結來說，JS 中的建構子函式是一種特地設計被拿來產生物件的函式，被實例化的物件能夠藉由 `constructor` 屬性找到對應的建構子函式，並能夠調用建構子函式內部定義的屬性和方法。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
