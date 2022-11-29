---
title: 'Title'
date: '2022-10-04'
---

## 隱含綁定（Implicit Binding）
`this` 綁定的另一種方法，是讓函式調用時擁有一個環境物件（context object），或稱擁有者（owner object）／容器物件（containing object)）。 

參考以下範例：

```
function foo() {
	console.log( this.a );
}

var obj = {
	a: "in object",
	foo: foo
};

var a = "in global";

obj.foo(); // in object
foo(); // in global
```

在上面的程式碼中，`obj.foo()` 是作為 `obj` 的屬性被調用的，也就是說 `obj` 成為了 `foo()`  的執行環境。

此時 `obj` 便會被綁定為 `foo` 函式內部的 `this` 指向對象，引擎在執行 `obj.foo()` 時，`foo` 內的 `this.a` 便等同於 `obj.a` 。

如果是多層物件進行屬性查找的話，函式的調用點環境則會指向最後一層物件：

```
function foo() {
	console.log( this.a );
}

var obj2 = {
	a: "in obj2",
	foo: foo
};

var obj1 = {
	a: "in obj1",
	obj2: obj2
};

obj1.obj2.foo(); // in obj2
```

### 隱含丟失（Implicitly Lost）
當函式不是在擁有者物件底下被調用，而是將參考賦值給另一個變數後，原本的環境物件便不再存在，導致隱含綁定丟失，此時會退回默認綁定：

```
function foo() {
	console.log( this.a );
}

var obj = {
	a: "in obj",
	foo: foo
};

var bar = obj.foo; // 賦值內容為函式參考，而非物件內的值！

var a = "in global";

bar(); // "in global"
```

同樣的，函式的參數也是一種賦值：
```
function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// fn 純粹是函式 foo 的引用
	fn(); // 調用點
}

var obj = {
	a: 2,
	foo: foo
};

var a = "in global";;

doFoo( obj.foo ); // "in global";
```

以下的函式 `foo` 也同樣是指向一個參考：
```
var obj = {
	a: "in obj",
	foo: function (){
	  console.log(this.a)
	}
};

var bar = obj.foo; 

var a = "in global";

bar(); // "in global"
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
