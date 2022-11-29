---
title: 'Title'
date: '2022-10-31'
---

對於 `class` 這個語法糖，以下再繼續進行一些考察。

---

## `this` 的考察

```js
class Circle1 {
  draw() { return this }
}

function Circle2() {
  this.draw = function () { return this }
}

const c1 = new Circle1();
const c2 = new Circle2();
const c3 = {
  draw: function () { return this }
}

// Method Call
console.log(c1.draw() === c1); // true
console.log(c2.draw() === c2); // true
console.log(c3.draw() === c3); // true

// Function Call
const draw1 = c1.draw;
console.log(draw1());  // undefined，而非指向全域物件
const draw2 = c2.draw;
console.log(draw2()); // Window，即全域物件
const draw3 = c3.draw;
console.log(draw3()); // Window，即全域物件
```

從上面可以看到，不論是建構子函式或者 `class` ，兩者的實例在調用時都是指向調用當下的環境，也就是 `c1` 和 `c2`，跟 `c3` 互相對照，`this` 依循隱含綁定規則指向調用的物件。

但將物件內部函式的參考複製出來執行後，`draw2()` 跟 `draw3()` 同樣指向了全域物件，`draw1` 則指向 `undefined`，等同於 `class` 的 `this` 綁定默認使用嚴格模式，這點是 `class` 與建構子函式不同的部分。

---

## 提升的考察

### 函式的提升
函式宣告（Function Declaration）會有提升（Hoisting），因此可以在宣告前呼叫：
```js
sayHello(); // Hello
function sayHello() { console.log("Hello") }
```

函式表達式（Function Expression）則在執行時期才會賦值，因此無法在宣告前呼叫：
```js
sayGoodbye();
// Cannot access 'sayGoodbye' before initialization
const sayGoodbye = function() { console.log("sayGoodbye") }
```

### `class` 的提升
`class` 宣告（Class Declaration）並沒有提升，無法在宣告前調用：
```js
const c = new Circle()
// Cannot access 'Circle' before initialization
class Circle { }
```

`class` 表達式（Class Expression）也一樣，宣告前無法調用：
```js
const s = new Square()
// Cannot access 'Square' before initialization
const Square = class { };
```

---

## `class` 總結

### `class` 關鍵字帶來的優點
- 使用 `extend` 明確宣告繼承，而且實踐的方法非常自然，不像用 `Object.create`、` __proto__` 或 `Object.setPrototypeOf` 來替換 `prototype` 指向的物件那樣，充滿複雜而令人困惑的邏輯
- `super` 提供了實踐「相對多態」的能力，也就是讓物件能夠引用原型鍊上「上一個層級」的同名方法
- 引入 `class` 語法僅對繼承方法進行了優化，屬性則沒太大改變。這點從另一個角度來看，由於屬性大部分時候不應該存在於原型鍊末端以外，也就是實例以外的地方，所以反而能夠防止錯誤

### `class` 關鍵字帶來的缺點：
- 容易誤導使用者以為 JS ES6 以後的版本出現了「類導向」機制，但它其實只是原型／委託的語法糖
- 由於父類和子類的關係並不是拷貝而是原型／委託，在更改「父類」上的方法後，「子類」同樣會受到影響
- 僅提供靜態方法（僅屬於「類」的方法），而沒有靜態屬性（僅屬於「類」的屬性），這表示如果不同實例需要共享一個屬性，依然需要回歸到 `prototype` 語法
- `class` 將「類機制」在 JS 中模擬得更加維妙維肖，同時也將物件彼此的鏈結關係與行為委託隱藏在 `class` 語法之下，因此衍生出許多更難以察覺的陷阱

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Appendix A: ES6 class](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/apA.md)
- [你不懂JS：this 与对象原型 | 附录A: ES6 class](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/apA.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
