---
title: 'Title'
date: '2022-10-26'
---

前面已經提到，繼承最大的優點就是提高程式的複用性，減少重複程式碼。但從反向來看，其缺點也在於上層物件與下層物件之間高度關聯性，改動原型鍊上層物件的內容會影響到下層物件，也就是高耦合的問題。

因此使用繼承時，除了盡量保持只有一層繼承關係，不讓程式碼變得過於複雜以外，另一項通則則是「組合優於繼承（Favor Composition over Inheritance）」。

物件組合不但具備繼承減少重複程式碼的特性，同時也降低了程式碼耦合性，可說是兼具兩者的優點，而這樣的設計方法便稱為「混合（Mixins）」。

混合的範例：
```js
const canEat = {
  eat: function () {
    this.hunger--;
    console.log("eating");
  }
}
const canWalk = {
  walk: function () {
    console.log("walking");
  }
}
const canSwim = {
  swim: function () {
    console.log("swimming");
  }
}

function mixin(target, ...sources) {
  Object.assign(target, ...sources);
}

function Person() { }
mixin(Person.prototype, canEat, canWalk)
const person = new Person();
person.eat(); // eating
person.walk(); // walking

function Fish() { }
mixin(Fish.prototype, canEat, canSwim);
const fish = new Fish();
fish.eat(); // eating
fish.swim(); // swimming
```

如上程式碼中分別定義了三個包含方法的物件：`canEat`、`canWalk` 和 `canSwim`，又分別只撿選想要的物件，利用 `Object.assign` 混合成到建構子的 `prototype` 上，如此一來物件就能只繼承想要的屬性或方法，而不再受到上層物件的影響，同時也做到減少重複程式碼。

由於 `Object.assign` 會覆蓋已有的屬性，也可以自訂方法來避免這一點：
```

```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
