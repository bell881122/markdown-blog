---
title: 'Title'
date: '2022-11-11'
---

在 JS 中，轉換值的型別大致可分為兩種方式，一種是明確的，一種是隱含的，而不論是哪一種，JS 對於轉換值的型別常慣例統稱為「強制轉型（coercion）」。

- 明確的型別轉換
	- 將一個值從一個型別「明確地」轉換到另一個型別，基本上與靜態類型語言的型別轉換方式非常相近
	- 又稱為「明確的強制轉型（explicit coercion）」
	- 有時也直接稱「型別轉換（type casting）」
- 隱含的型別轉換
	- 將一個值從一個型別「隱含地」轉換到另一個型別，通常是將值視作特定型別的操作，比方說數學計算
	- 又稱為「隱含的強制轉型（implicit coercion）」

> JS 的強制轉型永遠都只會得到一個純量基本值（scalar primitive），也就是 `string`、`number` 和 `boolean`，而不會得到如 `object`、`array` 等這類複合值。

> 封箱（Boxing）會將一個基本型別值包裹在對應的物件中，也就是隱性地將一個值變為 `object`，但準確來說這不是真正的強制轉型。

通常來說，明確強制轉型指的是調用如 `String()` 這種字面上就表明出意義的函式，隱含強制轉型則是那些執行過程中由程式自動轉型的操作：
```js
// 明確強制轉型
console.log(String(42)); // "42"
console.log((42).toString()); // "42"

// 隱含強制轉型
console.log(42 + ""); // "42"
```

另外，「明確」與「隱含」都是相對的說法，明確或隱含強制轉型並沒有絕對的定義，而是因人而異的。

---

## 轉型抽象操作

在 JS 中，有幾種轉換型別的操作：
- ToString
	- 定義非 `string` 值被強制轉型為 `string` 表現形式時的轉換過程
- ToNumber
	- 定義非 `number` 值被要求作為 `number` 使用時的轉換過程（比方說數學計算）
- ToBoolean
	- 定義非 `boolean` 值如何轉換為相等的 `boolean`
- ToPrimitive
	- 定義複合值（也就是 JS 廣義上的物件）遇到強制轉型時的轉換過程
		- 強制轉型為 `boolean` 時，一律返回 `true`
		- 強制轉型為 `string` 時，會先調用 `toString` 再調用 `valueOf`，並對返回的純量基本值執行 ToString 操作
		- 強制轉型為 `number` 時，會先調用 `valueOf` 再調用 `toString`，並對返回的純量基本值執行 ToNumber 操作

下一篇就來討論關於型別轉換的這四種抽象操作。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
