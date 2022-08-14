---
title: '【JS】Behavior Delegation 行為委派'
date: '2021-09-17'

coverImage: ''
---

## 定義
訪問一個物件上的屬性時，
如果物件沒有該屬性，
就會執行**委派**，
讓引擎順著原型鍊向上查找，
並返回第一個名稱相符的屬性，
或者在整個原型鍊查找完畢後，
返回找不到該屬性，
這整個行為就稱作「行為委派」。

## 要點
- 藉由原型鍊(Prototype chain)達成
- 原型鍊（子物件與原型物件的關聯性）在創造時就會產生

## 範例
```
// 宣告一個 foo
var foo = {
	a: 42
};

// 以 foo 為原型創造一個 bar
var bar = Object.create( foo );
bar.b = "hello world";

bar.b;		// "hello world"
bar.a;		// 42 <-- 委派給 `foo`，發生行為委派
```

## 參考資料
- [你不懂JS](https://github.com/CuiFi/You-Dont-Know-JS-CN)
