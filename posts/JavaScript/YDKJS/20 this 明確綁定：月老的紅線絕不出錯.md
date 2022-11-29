---
title: 'Title'
date: '2022-10-05'
---

檢視明確綁定之前，讓我們先回到之前出現過的範例：

```
const person1 = {
  name: 'Amy'
}

const person2 = {
  name: 'Jack'
}

function speak(context) {
  console.log(`Hello, I'm ${context.name}`)
}

speak(person1); // Hello, I'm Amy
speak(person2); // Hello, I'm Jack
```

前面說過，如果不使用 `this`，函式要取得某個物件的內容，就必須像上面那樣，將整個物件當成參數傳遞給函式調用。

如果要使用隱含綁定，又必須額外將函式加入物件中，再使用物件的屬性鍊查找後調用函式：

```
const person1 = {
  name: 'Amy',
  speak
}

const person2 = {
  name: 'Jack',
  speak
}

function speak() {
  console.log(`Hello, I'm ${this.name}`)
}

person1.speak(); // Hello, I'm Amy
person2.speak(); // Hello, I'm Jack
```

不想要這麼麻煩的話，JS 當中提供了三個函式方法，可以在執行函式時指定 `this` 綁定對象，分別是 `call`、`apply` 和 `bind`（ES5+） ，這時的 `this` 綁定便屬於「明確綁定」，或稱「顯式綁定」。

## 明確綁定（Explicit Binding）

### `call`、`apply`、`bind`

由於  `call` 和 `apply` 用法相近，下面先說明這兩個函式的用法：

```
const person1 = {
  name: 'Amy'
}

const person2 = {
  name: 'Jack'
}

function speak() {
  console.log(`Hello, I'm ${this.name}`)
}

speak.call(person1); // Hello, I'm Amy
speak.apply(person2); // Hello, I'm Jack
```

從上面可以看到，使用 `call`和 `apply` 之後，不需要額外再把 `speak` 函式加入物件內，然後從物件的屬性鍊找出調用。而是在呼叫 `speak` 時直接指定要綁定 `this` 的物件，在函式內部就能夠取得預期要從 `person1` 和 `person2` 取得的內容。

這樣一來 `call`和 `apply` 乍看之下好像並無不同，其實這兩者的差異在於傳入參數的方法，它們的第一個參數都指向綁定 `this` 的物件，但之後的參數使用略有差異：

```
const person1 = {
  name: 'Amy'
}

const person2 = {
  name: 'Jack'
}

function speak(num, str) {
  console.log(`My name is ${this.name}`)
  console.log(`I'm ${num} years old.`)
  console.log(`I have a/an ${str}.`)
}

speak.call(person1, 35, "apple");
// My name is Amy
// I'm 35 years old.
// I have a/an apple.

speak.apply(person2, [67, "cat"]);
// My name is Jack
// I'm 67 years old.
// I have a/an cat.
```

`call` 所傳入的參數，第二以後則依序是函式接收到的參數，也就是`call` 的第二個參數會是 `speak` 函式接收到的第一個參數，傳入的第三個參數是接收的第二個參數......以此類推。

`apply` 則總共只接受兩個參數，第一個參數綁定 `this`，第二個則是一個陣列，接收所有要傳入 `speak` 的參數，和函式內部物件 `arguments` 是完全對應的，可以想成 `apply` 傳遞的第二個陣列參數，就是函式內部取得的 `arguments` ，只是 `arguments` 屬於類陣列（Array-like），所以能夠操作的方法與陣列略有不同。

> [arguments](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/arguments) 是 JS 的關鍵字之一，是函式內部對應所有傳入參數的類陣列物件，簡單來說就是所有參數的集合。

介紹完 `call`和 `apply` ，接著來看看 `bind`：
```
const person1 = {
  name: 'Amy'
}

const person2 = {
  name: 'Jack'
}

function speak(num, str) {
  console.log(`My name is ${this.name}`)
  console.log(`I'm ${num} years old.`)
  console.log(`I have a/an ${str}.`)
}

speak.bind(person1)(35, "apple");
// My name is Amy
// I'm 35 years old.
// I have a/an apple.

speak.bind(person1, 14)("grape");
// My name is Amy
// I'm 14 years old.
// I have a/an grape.

const person2_Speak = speak.bind(person2);
person2_Speak(67, "cat");
// My name is Jack
// I'm 67 years old.
// I have a/an cat.
```

與 `call`和 `apply` 不同的是，`bind` 所回傳的並不是函式的執行結果，而是綁定 `this` 後的函式，從上面第二個例子可以看到 `speak.bind(person2)` 將綁定了 `person2` 的函式賦值給 `person2_Speak`，因此後者在調用時能夠讓 `this` 指向我們給定的物件。

另外比較特別的是，從 `speak.bind(person1, 14)("grape")` 可以看到，使用 `bind` 時可以指定部分參數，接著在調用 `bind` 回傳的函式時繼續傳入後面的參數，並且依序排在 `bind` 時給予的參數後面。

---

## 明確綁定的例外

在明確綁定時，如果傳入要綁定 `this` 的參數是 `null` 或 `undefined` 則會被忽略，改為默認綁定：

```
function foo() {
	console.log( this.a );
}

var a = "global";

foo.call( null ); // global
```

另一種狀況是，綁定的參數使用 `number`、`string`、`boolean` 等基本型別，則這個值會被包入該基本型別的物件包裹器（Wrapper）／物件類型（Object-form）中：

```
function foo() {
	console.log( this );  // Boolean {true}
	console.log( this.a );  // undefined
}

var a = "global";
foo.call( true ); 
```

不希望出現這種狀況的話，加上 `use strict` 就不會轉換為物件了。
```
"use strict"
function foo() {
	console.log( this );  // true
	console.log( this.a );  // undefined
}

var a = "global";
foo.call( true ); 
```

### 安全的綁定方法
還有一種方法是，為 `this` 綁定準備一個空物件，以保證不會對程式碼產生副作用：

```
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

var ø = Object.create( null );

foo.apply( ø, [2, 3] ); // a:2, b:3

var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
- [[JavaScript] 理解 JS中的arguments 與 parameters](https://dean34520.medium.com/%E7%90%86%E8%A7%A3-javascript%E4%B8%AD%E7%9A%84arguments-%E8%88%87-parameters-5028336976f6)
