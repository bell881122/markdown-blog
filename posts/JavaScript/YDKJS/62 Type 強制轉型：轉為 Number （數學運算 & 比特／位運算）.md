---
title: 'Title'
date: '2022-11-16'
---

## 數學運算
`-` 、`*` 和 `/` 都是專屬於數學計算的運算子，因此會將運算元強制轉型為 `number`。

首先來看看 `-` 號運算子，它與 `+` 號運算子的邏輯十分相似：
```js
console.log(5 -"3.14");  // 1.8599999999999999
console.log(5- -"3.14"); // 8.14

console.log("3.14" - 0); // 3.14
console.log(- -"3.14");  // 3.14
```
`5 -"3.14"` 之所以會得到 `1.8599999999999999`，是因為某些小數無法用精確的二進表示，於是出現了誤差（要如何預防誤差，在 《Type 數字》這篇文章已做說明）。

而 `-` 運算子除了表示減法之外，也能夠表示數字的正負，所以 `5- -"3.14";` 實際上是 `5- (-3.14);`，最後獲得 `8.14` 這個值，`- -"3.14"` 則是將 `"3.14"` 轉型為 `number` 以後翻轉了正負號兩次，和 `- 0` 擁有同樣的效果。

除了 `string` 以外，其他的型別遇到 `-` 也都被轉為 `number`：
```js
console.log(-true);      // -1
console.log(-null);      // -0
console.log(-undefined); // NaN
console.log(-[]);        // -0
console.log(-{});        // NaN
console.log(-function(){}); // NaN
```

接著來看看 `*` 和 `/`，這兩個運算子並沒有表達正負數的功能，所以需要兩個運算元組合應用：
```js
console.log("3.14" * 1); // 3.14
console.log("3.14" / 1); // 3.14

console.log([3] * [2]);    // 6
console.log([] * 1);        // 0
console.log([1, 2, 3] * 1); // NaN
console.log({} * 1);        // NaN
console.log({ a: 1 } * 1);  // NaN
```

`"3.14"` 在數學運算中被強制轉型為 `number`，而 `[3] * [2]` 則是先執行了 `ToPrimitive` 轉換成 `string` 獲得 `"3"` 與 `"2"`，再被轉為數字進行相乘。

---

## 比特／位運算

### `~` 運算子
`~` 運算子（bitwise NOT operator）大多被譯為「比特非」、「按位取反」或「位元補數」，它的功能是進行二進制的補數，也就是 `~x` 會變成 `-(x+1)`。

`~` 運算子首先會將值使用 `ToInt32` 強制轉型為一個 32 位的 `number`，然後執行按位取反，也就是翻轉每一個比特位。

```js
console.log(~42.5678) // -43
console.log(~"-42")   // 41
console.log(~"abc")   // -1
console.log(~NaN)     // -1
```

按照 `~x` 會變成 `-(x+1)` 這個邏輯，`~x` 唯一會得到 `0` 的數字則是 `-1`（或者說是 `>= -1` 且 `< 2` 的任意數字 ）。

而 `-1` 是一個常見的哨兵值（sentinel value），許多語言的部分方法中，當返回 `>= 0` 的值表示成功，返回 `-1` 則表示失敗。

比如說 JS 的 `indexOf`，便能夠利用 `~` 只有 `-1` 會返回 `0` 的特性來檢查是否成功：
```js
var str = "Hello World";

function foo(x) {
  if (~str.indexOf(x))
    console.log("found it!")
  else
    console.log("not found!")
}

console.log(~str.indexOf("lo")); // -4，truthy value
console.log(~str.indexOf("ol")); // 0，falsy value

foo("lo"); // "found it!"
foo("ol"); // "not found!"
```

### `~~` 運算子
`~~` 運算子（double NOT bitwise operator）如字面所示，是兩次的 `~` 運算，也就是  `~~x` 會變成 `-(-(x+1)+1)` 。基於以上特性，`~~` 也常被視為 `Math.floor` 的簡化寫法：
```js
console.log(~42.5678) // -43
console.log(~~42.5678) // 42
console.log(Math.floor(42.5678)) // 42

console.log(~"42.5678") // -43
console.log(~~"42.5678") // 42
console.log(~~"abc") // 0
```

但要注意 `~~` 與 `Math.floor` 作用在負數的結果並不相同：
```js
console.log(~-42.5678) // 41
console.log(~~-42.5678) // -42
console.log(Math.floor(-42.5678)) // -43
```

如果要將 `~~` 作為截斷小數的方法，記得永遠將它只用於正數上。

### `|` 運算子
`|` 運算子，又稱「比特或」或者「案位或」（bitwise OR），它會將傳入的數進行 `ToInt32` 轉換，並將兩者進行「或」運算（比特位的任一值為 `1` 時返回 `1`）。

基於以上特性，`|` 運算子的第一個運算式為假值時，會返回第二個運算式的 `ToInt32` 結果：
```js
console.log(0 | -0); // 0
console.log(0 | NaN); // 0
console.log(0 | Infinity); // 0
console.log(0 | -Infinity); // 0

console.log(0 | 42); // 42
console.log(0 | 42.1111); // 42
console.log(0 | -42); // -42
console.log(0 | -42.1111); // -42

console.log(0 | "-42"); // -42
console.log(0 | "-42.1111"); // -42
console.log(0 | "abc"); // 0
```

與 `~~` 不同的是，`0 | x` 對負數的運算結果和 `Math.floor` 是相同的。

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
- [位运算（&、|、^、~、>>、<<）](https://www.runoob.com/w3cnote/bit-operation.html)
