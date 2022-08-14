---
title: '【Dev】物件類型：mutable 與 Immutable'
date: '2021-10-07'

coverImage: ''
---

## mutable 與 Immutable 比較
### Immutable object 不可變物件
- 物件被創造後，其 value 無法被改變
- 物件以**傳值**（by value）方式被儲存
- 如 JavaScript 的原始型別 number、string、null、undefined、boolean 等
### Mutable object 可變物件
- 物件被創造後，參考固定，但參考的記憶體內容可以改變
- 物件以**傳址**（by reference）方式被儲存
- 如 JavaScript 的參考型別 Object、Array、Function 等
- 如果要完全複製值而非參考，必須使用「深拷貝（deep clone / deep copy）」技術

---

## 何謂可變與不可變？
### Mutable 可變的
Mutable object 屬於**傳址**型資料，
在 JavaScript 中又被稱為「參考型別」，
特色是以「鍵／值」（key/value）方式存取內容。

這種物件的值實際是指向一個「參考」，
因此在存取 Mutable object 時，
返回的其實是一個參考位址，
參考指向的記憶體位置才是真正的值，
因此稱為「傳址」。

如果某個變數儲存的是 Mutable object，
則當我們改變它的值時，
參考本身並沒有變動，
而是參考裡面指向的真正的值，
其儲存位址裡的內容被改變了。

對程式來說物件還是同個物件，
內容卻已經不一樣了，
因此被稱為「可變物件」。

---

### Immutable 不可變的
Immutable object 屬於**傳值**型的資料，
在 JavaScript 中又被稱為「原始型別」。

Immutable object 本身
就是一個無法變動的純粹的值，
如果變數內儲存的是 Immutable object，
當變數重新賦值時，
並不會更動到原本的值，
因此被稱為 Immutable。

```
let str = 'Hello, you!!';
let ianHello = str;
ianHello += 'ian';

// not changed
console.log(str); // Hello, you!!
console.log(ianHello); // Hello, you!!ian
```


















原本的 Immutable object 會直接被廢棄，
用新的值去取代它。

原本的值和後來的值是完全獨立的關係，
Immutable object 只會產生和消失，
不會發生改變，因此稱為「不可變物件」

```js
let stringA = "This is a string";
let stringB = stringA;
stringA = "The string has changed";

console.log(stringA); //The string has changed
console.log(stringB); //This is a string
console.log(stringA === stringB); //false
```

簡單來說，想要改動 Immutable 物件時，
同個記憶體位置的舊值會被新值取代；
而改變 Mutable 物件時，
記憶體還是一樣的「參考」，
而參考指向的值內容其實已經不一樣了。

---

### 為什麼需要 Immutable？
優點
- 可預期
- 便於偵測改變
- 可並行（Concurrency）
缺點
- 性能較差
- Memory Overhead

Immutable 在建立實體之後無法改變，
因此內容是單純、可預期的，
不會發生對相同的資料進行操作
而造成非預期的行為。

JavaScript 的參考型別則就屬於 Mutable，
在操作時某個變數的內容
常常會非預期地被改變了卻沒有察覺。

Immutable objects 在讀取和儲存時也更有效率，
但在改變 values 時因為是重新創造一個 object，
代價則會相較 mutable objects 要來得多。

> JavaScript 的 `const` 關鍵字無法創造 Immutable objects，它的作用是防止重新賦值。

---

## 參考資料
- [理解 mutable VS immutable 物件](https://snh90100.medium.com/%E7%90%86%E8%A7%A3-mutable-vs-immutable-%E7%89%A9%E4%BB%B6-20ed802b6283)
- [Buzz Word 3 : Immutable vs. Mutable Data](https://ithelp.ithome.com.tw/articles/10234357)
- [[Python 基礎教學] 什麼是 Immutable & Mutable objects](https://www.maxlist.xyz/2021/01/26/python-immutable-mutable-objects/)
- [前端的immutable設計樣式](https://blog.yyisyou.tw/c30df041/)
- [[JavaScript] 型別系統 — Primitive & Object/Reference Type](https://medium.com/@lifeanne19904/javascript-%E5%9E%8B%E5%88%A5%E7%B3%BB%E7%B5%B1-primitive-object-reference-type-c7fdb38694a4)
- [Immutable 對於 React 重要性](https://ianccy.com/immutable/)
