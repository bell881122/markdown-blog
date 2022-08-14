---
title: '【CSS】偽類 & 偽元素'
date: '2021-10-13'
coverImage: ''
---

偽類和偽元素皆是從 DOM tree 抽象出來的概念，
用以修飾實際上不在 DOM tree 上的部分。

### 比較表

|中文|英文|符號|DOM tree|作用|
|--|--|--|--|
|偽類|Pseudo-classes|:|不會出現|定義元素的特殊狀態|
|偽元素|Pseudo-elements|::|會出現|選擇元素的指定部分|

---

## 偽類：
- 操作對象：原本就存在的元素
- 用途：用於選取特定狀態的元素
- 語法：`selector:pseudo-class`
- 偽類舉例：
	- `:hover`：鼠標懸停其上的元素
	- `:visited`：已訪問過的鏈接
	- `:focus`：獲得焦點的元素

---

## 偽元素
- 操作對象：DOM tree 之外的虛擬元素
- 用途：修飾元素對應的抽象內容
- 語法：`selector::pseudo-element`
- 共 6 種：
	- `::after`：在一個元素後插入內容
	- `::before`：在一個元素前插入內容
	- `::first-line`：文本的第一行
	- `::first-letter`：文本的第一個字母
	- `::marker`：項目符號樣式
	- `::selection`：被游標選擇反白的部分

> CSS2 以前，first-line 使用的是單冒號（`:`），CSS3 後為區分偽類和偽元素而改成雙冒號（`::`），同時向下兼容，因此 `:first-line` 和 `:first-line` 兩種寫法 CSS3 都可接受。

---

## 參考資料：
- [Day24：小事之 CSS 偽類 與 偽元素](https://ithelp.ithome.com.tw/articles/10196924)
- [CSS | 全都是假的！關於那些偽類和偽元素 - 基本用法](https://medium.com/enjoy-life-enjoy-coding/css-%E5%85%A8%E9%83%BD%E6%98%AF%E5%81%87%E7%9A%84-%E9%97%9C%E6%96%BC%E9%82%A3%E4%BA%9B%E5%81%BD%E9%A1%9E%E5%92%8C%E5%81%BD%E5%85%83%E7%B4%A0-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95-4de48feb8607)
- [CSS偽類與偽元素總是傻傻分不清，這份總結夠面試用了](https://kknews.cc/zh-tw/code/jlagzj6.html)
- [CSS偽類 | w3school](https://www.w3schools.com/css/css_pseudo_classes.asp)
- [CSS偽元素 | w3school](https://www.w3schools.com/css/css_pseudo_elements.asp)
