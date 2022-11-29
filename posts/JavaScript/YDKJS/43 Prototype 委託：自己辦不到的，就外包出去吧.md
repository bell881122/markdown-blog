---
title: 'Title'
date: '2022-10-28'
---

前面已經說明過了原型在 JS 中是如何實踐的，與類導向不同，原型導向並不會進行類似父類與子類間的複製，原型實際是一種存在於物件上的內部連結，其作用是指向另一個物件，這種物件間彼此的連結就是所謂的「原型鍊」。

在尋找物件上的屬性或方法時，如果該屬性／方法沒有在物件內部，就會將該屬性／方法「委託」出去，藉由物件之間的連結，也就是著沿著「原型鍊」繼續查找。以下是一個說明「委託」的範例：

```js
var Task = {
  setID: function (ID) { this.id = ID; },
  outputID: function () { console.log(this.id); }
};

// 使用 Task 為原型創建 obj（也就是將 obj 委託到 Task 上）
var obj = Object.create(Task);

obj.prepareTask = function (ID, Label) {
  this.setID(ID);
  this.label = Label;
};

obj.outputTaskDetails = function () {
  this.outputID();
  console.log(this.label);
};

obj.prepareTask("12345", "id")
obj.outputTaskDetails()
// 12345
// id
```

`obj.prepareTask` 內部調用了 `setID` 這個方法，由於 `obj` 本身並沒有這個方法，於是沿著原型鍊網上找到 `Task` 擁有的 `setID`，同時，由於調用點是 `obj.prepareTask`，`setID` 內部的 `this` 於是指向了 `obj`，`obj.outputTaskDetails` 內部的 `outputID` 也是依循同樣原理執行。

從上面可以看到，當一個屬性或方法無法在 `obj` 上找到時，程式會將屬性／方法「委託」出去，最終在原型鍊上的 `Task` 找到這個方法。

這樣的特性又稱為「行為委託（Behavior Delegation）」，或也常被簡稱為「委託（Delegation）」。

### 模擬類導向 v.s. 物件連結

這是一個使用 JS 模擬類導向的範例：
```js
function Person(who) {
  this.me = who;
}
Person.prototype.identify = function () {
  return "I am " + this.me;
};

function Student(who) {
  Person.call(this, who);
}
Student.prototype = Object.create(Person.prototype);

Student.prototype.speak = function () {
  console.log("Hello, " + this.identify() + ".");
};

var s1 = new Student("s1");
var s2 = new Student("s2");

s1.speak(); // Hello, I am s1.
s2.speak(); // Hello, I am s2.
```

以下則是直接使用物件連結的範例：
```js
var Person = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
};

var Student = Object.create( Person );
Student.speak = function() {
	console.log( "Hello, " + this.identify() + "." );
};

var s1 = Object.create( Student );
s1.init( "s1" );
var s2 = Object.create( Student );
s2.init( "s2" );

s1.speak(); // Hello, I am s1.
s2.speak(); // Hello, I am s2.
```

從上面可以看到，省略了使用 `new` 等模擬類導向語言的方法後，利用單純的物件連結，可以更清楚地看到所有的「建構子」都僅僅是單純的物件。

`Object.create` 創造的新物件並沒有複製原型物件上的任何屬性或方法，而是創造出物件之間的連結。物件與物件之間實際上沒有上下關係，只是藉由原型鍊連結起來，藉此定義出物件使用屬性／方法時的規則。

當某個物件上找不到屬性／方法時，可以藉由與其他物件的連結將屬性／方法「委託」出去，在原型鍊上執行查找，簡化代碼的同時保有了本身的靈活性。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 6: Behavior Delegation](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch6.md)
- [你不懂JS：this 与对象原型 | 第六章: 行为委托](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch6.md)
