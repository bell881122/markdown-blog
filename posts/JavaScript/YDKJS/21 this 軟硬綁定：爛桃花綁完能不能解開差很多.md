---
title: 'Title'
date: '2022-10-06'
---


## 硬绑定（Hard Binding）
硬绑定算是明確綁定的變種，效果等同於 `bind`。由於在 ES5 之前的 JS 版本，還沒有 `bind` 這個函式方法，使用硬綁定的方式，可以防止函式丟失原本的 `this` 綁定，因此反過來也可以看做是 `bind` 方法的填補（Polyfill）。

以下是範例：
```
function func() {
	console.log( this.a );
}

var obj = {
	a: "in obj"
};

// bindHelper 將 func 的 this 硬綁定給 obj
var bindHelper = function() {
	func.call( obj );
};

bindHelper(); // in obj
setTimeout( bindHelper, 100 ); // in obj

// 硬綁定後的函式無法被覆蓋
bindHelper.call( window ); // in obj
```

`bindHelper` 的內部固定呼叫強制綁定了 `obj` 的 `func` ，因此不論如何調用 `bindHelper`，或者試著更改它的 `this`，它都固定會調用綁定了 `obj` 的 `func` ，這種方法便稱之為「硬綁定」。

另一個例子：
```
function func(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var addObjNum = function() {
	return func.apply( obj, arguments );
};

var objNumAddThree = addObjNum( 3 ); // 2 3
console.log( objNumAddThree ); // 5
```

或創造一個可複用的函式：
```
function func(something) {
	console.log( this.a, something );
	return this.a + something;
}

function bindHelper(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var binder = bindHelper( func, obj );

var result = binder( 3 ); // 2 3
console.log( result ); // 5
```

ES5 以後，JS 新增了 `bind` 函式，硬綁定成為 JS 內建功能：

```
function func(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var binder = func.bind( obj );

var result = binder( 3 ); // 2 3
console.log( result ); // 5
```

> `bind` 方法生成的函式擁有一個特別的屬性「 `name` 」，來源於原始的「目標函式（Target Function）」。比方說 `bar = foo.bind(obj)` ，`bar` 會擁有一個 `name` 屬性，它的值為 `"bound foo"`，這個值同樣會顯示在執行堆疊追蹤（stack trace）裡面。

### API 調用的「環境」
有些函式提供一個可選參數，用以綁定調用時的「環境」，在不使用 `bind` 的前提下，確保 `this` 指向特定對象。

```
function func(el) {
	console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// 綁定 obj 為 this 指向的物件
[1, 2, 3].forEach( func, obj );
// 1 awesome  2 awesome  3 awesome
```

---

## 軟綁定（Soft Binding）
硬綁定雖然確定了 `this` 不會指向無意義的值或全域物件，但在同時也降低了函式的靈活性，我們無法手動使用隱含綁定或其他明確綁定來覆蓋 `this` 。

因此除了硬綁定之外，我們也可以為「默認綁定」提供除了全域物件或 `undefined` 以外的預設值，讓函式能夠通過隱含綁定或明確綁定來手動綁定 `this` 。

```
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}
```

上面新增的 `softBind` 方法回傳一個包裝過的函式，在調用這個函式時會檢查 `this` 綁定的對象，如果它是全域物件或 `undefined`，就使用預設的 `obj`，除此之外不改變 `this` ，這種方法就稱為「軟綁定（Soft Binding）」。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 2: this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md)
- [你不懂JS：this 与对象原型 | 第二章: this 豁然开朗！](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
- [What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
- [What's THIS in JavaScript ? [下]](https://kuro.tw/posts/2017/10/20/What-is-THIS-in-JavaScript-%E4%B8%8B/)
