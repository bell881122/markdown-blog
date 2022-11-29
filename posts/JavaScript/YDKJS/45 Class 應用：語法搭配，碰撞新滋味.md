---
title: 'Title'
date: '2022-10-30'
---

## 私有屬性／方法

JS 的 `class` 雖然實踐了更直觀的繼承語法以及靜態方法，但至目前為止（2022 年 10 月）尚未引入 `private` 關鍵字，也就是說，`class` 無法擁有私人方法或屬性。

如 TypeScript 這樣屬於 JS 超集合（superset）的語言，已經引入了 `private` 關鍵字，可以直接與 `class` 搭配使用，但如果使用 JS 原生方法，要如何實踐 `private` 呢？

以下分別介紹使用 `Symbol` 和使用 `WeakMap` 的兩種方法。

### 使用 Symbol
`Symbol` 是 JS 在 ES6 新增的型別，用以表示一個獨一無二的值。使用 `Symbol()` 建立出來的每個值都是獨特的，絕對不會和其他的任何值重複。

```js
const a = Symbol();
const b = Symbol();

console.log(a === b) // false
console.log(a == b) // false
console.log(Symbol() === Symbol()) // false
console.log(Symbol() == Symbol()) // false
```

如此一來，就能夠借助 `Symbol` 這種特性，建立無法藉由拼湊字面值取得的屬性／方法，搭配 `Object.getOwnPropertySymbols` 模擬出私有屬性／方法：
```js
const _radius = Symbol();
const _draw = Symbol();

class Circle {
  constructor(radius) {
    this.radius = radius * 2;
    this[_radius] = radius * 3;
  }

  [_draw]() {
    console.log("draw")
  }
}

const c = new Circle(1);
// 取得一般屬性
console.log(Object.getOwnPropertyNames(c)); // [ 'radius' ]
console.log(Object.getOwnPropertyNames(c.__proto__)); // [ 'constructor' ]

// 取得 Symbol 屬性
console.log(Object.getOwnPropertySymbols(c)); // [ Symbol() ]
console.log(Object.getOwnPropertySymbols(c)[0] === _radius); // true
console.log(Object.getOwnPropertySymbols(c.__proto__)); // [ Symbol() ]
console.log(Object.getOwnPropertySymbols(c.__proto__)[0] === _draw); // true

console.log(c.radius); // 2
console.log(c[_radius]); // 3
c[_draw](); // draw
```

### 使用 WeakMap
`WeakMap` 是 ES6 新增的一種特殊物件，與一般物件不同的點在於，普通 `Object` 只能使用字串作為鍵值（屬性名稱），但 `WeakMap` 卻是接受一個物件作為鍵值：

```js
const wm = new WeakMap();

const obj1 = {}, obj2 = {}, obj3 = {};
wm.set(obj1, "obj1");
wm.set(obj2, ["obj2"]);
wm.set(obj3, { prop: "obj3" });

console.log(wm.get(obj1)); // "obj1"
console.log(wm.get(obj2)); // [ 'obj2' ]
console.log(wm.get(obj3)); // { prop: 'obj3' }
```

藉著 `WeakMap` 的特性，同樣模擬出私有屬性／方法：
```js
const _radius = new WeakMap();
const _move1 = new WeakMap();
const _move2 = new WeakMap();

class Circle {
  constructor(radius) {
    _radius.set(this, radius)
    _move1.set(this, function () {
      console.log("move1", this)
    })
    // 箭頭函式
    _move2.set(this, ()=> {
      console.log("move2", this)
    })
  }

  draw() {
    console.log(_radius.get(this))
  }
  move1() {
    _move1.get(this)();
  }
  move2() {
    _move2.get(this)();
  }
}

const c = new Circle(1);
c.draw(); // 1
c.move1(); // move1 undefined
c.move2(); // move2 Circle {}
```

另外，從上面 `move1` 和 `move2` 兩個方法中可以看到，由於 `move1` 實際上執行的是 `_move1.get(this)();` ，而 `_move1` 內部的 `this` 已不同於 `move1` 指向的 `this`，因此最後的結果是 `undefined`。

如果想要和外層函式指向同樣的 `this`，則需要像 `_move2` 一樣使用箭頭函式綁定。

---

## 取值／設值器（Getters / Setters）

還記得在介紹屬性描述器（Property Descriptors）時，提到了 `get` 和 `set` 這兩個特殊屬性：
```js
var obj = {
	get propA() {
		return this.privateProp;
	},
	set propA(val) {
		this.privateProp = val * 2;
	}
};

obj.propA = 2;
console.log(obj.propA); // 4
```

在 `class` 中也能夠以相同語法使用 `get` 和 `set`，定義實例在取得或設置該屬性時調用的方法：
```js
const _radius = new WeakMap();
const _move1 = new WeakMap();
const _move2 = new WeakMap();

class Circle {
  constructor(radius) {
    _radius.set(this, radius)
  }

  get radius() {
    return _radius.get(this);
  }
  set radius(value) {
    if (typeof value !== "number" || value <= 0)
      throw new Error("invalid radius!")
    _radius.set(this, value)
  }
}

const c = new Circle(1);
console.log(c.radius); // 1
c.radius = 2
console.log(c.radius); // 2
c.radius = "3" // Error: invalid radius!
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Appendix A: ES6 class](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/apA.md)
- [你不懂JS：this 与对象原型 | 附录A: ES6 class](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/apA.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [Symbol | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [JavaScript ES6 Map and WeakMap Object 物件](https://www.fooish.com/javascript/ES6/Map-and-WeakMap.html)
