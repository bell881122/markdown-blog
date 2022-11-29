---
title: 'Title'
date: '2022-10-19'
---

前面曾經說過，在 JS 中的型別分為兩大類，一類是基本型別，又稱原生型別（Primitive Types），另一類就是物件型別（Object Types）。

物件之所以自己佔了一大類，就因為它是 JS 的核心所在，包含原型鍊、模組等功能，都是倚靠物件作為核心來實現的。

而提到物件，就無法避開 JS 遵循的物件導向程式設計（Object-oriented Programming）。雖然在某些定義中，物件導向應該由類（Class）來實踐，但 JS 依舊沿用了許多基於物件導向的概念，比如繼承（Inheritance）、建構子（Construvtor）、取值器（Getter）和設值器（Setter）等等。

> `class` 關鍵字：JS 並沒有真正的類，ES6 引入的關鍵字 `class` 只是 JS 原有功能的語法糖，並不是實作真正的類功能。

以下就先簡單介紹一下物件導向設計的概念。

## 物件導向程式設計

物件導向程式設計也經常被簡稱為 OOP（Object-oriented Programming），用最簡單的方式來說，就是將一切都化為物件（Object），使用物件來模擬真實世界。

在物件導向中，透過類的建構子進行實例化（Instantiation）就會產生物件實例（Object Instance），類就像是每個物件實例的藍圖，並且不同的類之間可以有繼承關係，子類會繼承父類持有的屬性和方法，並同時保有自己特有的部分。

物件導向裡面有幾個常見的概念，在 JS 上也常見到這些概念的實踐（於後文詳細說明），如：
- 封裝（encapsulation）
	- 將相關變數與方法封入類／物件內部，減少程式碼複雜度，增加可復用性（Reusability）。
- 抽象（abstraction）
	- 隱藏內部細節，只公開必要且簡化過的操作（API），以阻絕內部變更對外造成的影響。
- 繼承（inheritance）
	- 讓一個類／物件繼承另一個類／物件的屬性和方法，減少多餘程式碼。
- 多型（polymorphism）
	- 在不同子類／物件上使用同樣名稱的方法達成不同效果，可避免複雜的 `if...else` 和 `switch` 陳述式。

### JS 的物件導向
物件導向實際上可再細分為兩種設計模式：
- 類別導向（Class-orientation），又稱類別基礎程式設計（Class-based Programming）
- 原型導向（Prototype-orientation），又稱原型基礎程式設計（Prototype-based Programming）

JS 正是屬於原型導向。程式會透過建構子函式進行實例化創造出物件（不論是顯性或隱性），而每個物件（除了極少數特例之外）都會從它的原型物件上繼承屬性和方法，同時也能夠成為另一個物件的原型。這些物件就這樣被連結在一條原型鍊上，而往上追溯，則它們最後都會連到同個根物件（Root Object，沒有原型物件的物件）。

在 JS 當中，對一個物件的屬性進行查找時，如果在物件內部沒有找到，會向上追溯整個原型鍊，一直到獲得第一個符合條件的結果，或抵達根物件並搜尋失敗，這就是 JS 實踐繼承的方式。

或者用更嚴謹的方式來講，比起「繼承」，JS 物件導向實作的其實是「委託」，原型鍊底層的物件將內部沒有找到的屬性或方法「委託」出去，詢問原型鍊上層是否有物件具備該屬性或方法，這就是 JS 的原型基礎物件導向（Prototype-based OOP）。

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 4: Mixing (Up) "Class" Objects](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch4.md)
- [你不懂JS：this 与对象原型 | 第四章: 混合（淆）“类”的对象](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch4.md)
- [Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)
- [物件原型 | MDN](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Object_prototypes)
- [物件導向 JavaScript (object-oriented JavaScript)](https://pjchender.dev/javascript/js-oo/)
