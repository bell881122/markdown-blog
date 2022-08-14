---
title: '【JS】IIFE 立即呼叫函式'
date: '2021-09-19'

coverImage: ''
---

IIFE 全稱為
Immediately Invoked Function Expression
中文翻譯成**立即呼叫函式**或**即刻調用函式運算式**

立即執行函式的長相：
`(function foo(){...})();`

第一眼看到這段程式碼時，
或許會覺得難以理解，
但先看看一般函式調用方式：
```
// 定義函式
function sayHi(){
console.log('Hi')
}

// 呼叫函式
sayHi();
```

上面呼叫的部分，
用以下寫法其實是一樣的
```
(sayHi)()
```

這樣一來，以下的 function 就不難理解了
```
(function foo(){ 
	var a = 3;
	console.log( a ); // 3
})(); 
```

可以看到上面的架構和前面的 `(sayHi)()` 其實是一樣的，
只是它在被定義時同時就被執行，
這就是所謂的立即執行函式（Immediately Invoked Function Expression）。

要細分的話，
IIFE 另外又分成**具名立即執行函式**
與**匿名立即執行函式**，
差別僅是有沒有指定名稱：
```
// 具名
(function foo(){ 
	var a = 3;
	console.log( a ); // 3
})();

// 匿名
(function (){ 
	var a = 2;
	console.log( a ); // 2
})();
```

不論有沒有指定名稱，
IIFE 都會在當下立刻調用執行。

比較要注意的是，
如上的 foo 雖然有被宣告，
但包在被執行的 `()` 號中，
所以在執行完會馬上釋放掉記憶體，
之後要再呼叫 foo() 的話，
會報 `foo is not defined` 的錯誤。

以上總結出 IIFE 兩個特性：
-   立刻執行
-   無法在函式外被再次執行

因為 IIFE 會立即調用，
因此在賦值時，變數接收到的是執行完畢回傳的值。
```
var x = (function IIFE(){
	return 42;
})();

x;	// 42
```


## IIFE 的其他功能
指定範疇：將傳入的參數當作作用域
```
var a = 2;

(function IIFE(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
})(window);

console.log(a); // 2
```

確保 undefined 的正確性
```
undefined = true;

(function IIFE(undefined) {
  var a;
  if (a === undefined) {
    console.log('Undefined 在這裡很安全！');
  }
})();
```

反轉順序 UMD（Universal Module Definition）
```
var a = 2;

(function IIFE(def) {
  def(window);
})(function def(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
});
```

## 參考資料
- [【你不懂JS：入门与进阶】第二章：进入JavaScript](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/up%20%26%20going/ch2.md)
