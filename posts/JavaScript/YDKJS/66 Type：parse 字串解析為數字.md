---
title: 'Title'
date: '2022-11-20'
---

將字串「解析（parsing）」為數字的型別轉換，與使用 `Number()` 的強制轉型行為有所不同，以下說明 `parseInt` 與 `parseFloat` 兩種方法。

---

## `parseInt`
這裡來比較看看 `parseInt()` 與 `Number()` 的行為：
```js
console.log(Number("42"));   // 42
console.log(parseInt("42")); // 42

console.log(Number(" 42  "));   // 42
console.log(parseInt(" 42  ")); // 42

console.log(Number("42px"));   // NaN
console.log(parseInt("42px")); // 42

console.log(Number(""));   // 0
console.log(parseInt("")); // NaN

console.log(Number("\n"));   // 0
console.log(parseInt("\n")); // NaN

console.log(Number("abc"));	  // NaN
console.log(parseInt("abc")); // NaN
```

從上面可以看到，`Number` 無法允許任何非數字的字串（但會忽略空白）；而 `parseInt` 接受非數字字串，但在遇到非數字時就停止解析，並回傳當前結果。

另外，`Number()` 將空字串或空白字串視為 `0` ，而 `parseInt()` 在第一個字符無法轉換為數字，或完全沒有字符能夠轉換時，會回傳 `NaN` 。

解析和強制轉型雖然有些相似，但目的完全不同。將一個 `string` 「解析」為 `number`，表示不知道或不關心傳入的字串是否擁有非數字內容；而將 `string` 「強制轉型」為 `number`，表示只接受純數字，不允許輸入其他內容。

### 字串化的過程
如果對 `parseInt` 傳入一個非字串，它首先會被強制轉型為 `string`，接著解析為數字：
```js
console.log(Number(true));   // 1
console.log(parseInt(true)); // NaN

console.log(parseInt(function () { })); // NaN
console.log(parseInt([1, 2, 3]));       // 1，陣列被轉成了 "1,2,3" 進行解析
console.log(parseInt(["A", 2, 3])); // NaN
console.log(parseInt({}));          // NaN
```

理解 `parseInt` 的原理後，利用它 ToString 這部分強制轉型的過程，可以建構出自訂的 `parseInt` 方法：
```js
var a = {
  num: 21,
  toString: function () {
    return String(this.num * 2);
  }
};

console.log(parseInt(a)); // 42
```

### 第二個參數
`parseInt` 也接受第二個參數，這個參數是一個基數（radix），也就是將收到的數字視為指定的進制來轉換。

`parseInt` 會根據收到的基數進行計算，將字串轉換為十進制的數字，如果沒有傳入第二個參數，`parseInt` 會根據慣例，猜測傳入的字串應該使用哪種進制看待。

比如十六進制的字串皆以 `0x` 或 `0X` 開頭，遇到這樣的字串時，就會預設為十六進制轉十進制；但如八進制則是以 `0` 開頭，與常見的填充數彼此不易分辨，最後被視為普通的十進制來轉換。

```js
console.log(parseInt("11111", 2));	// 31
console.log(parseInt("103", 2)); // 2
// 3 不是二進制合法的字符，實際解析的是 "10"

console.log(parseInt("070", 8));	  // 56
console.log(parseInt("0x36", 16));	// 54

// 失去第二個參數
console.log(parseInt("070"));	  // 70
console.log(parseInt("0x36"));	// 54
```

由於 `parseInt` 的預設值不總是為十進位，因此使用 `parseInt` 時建議總是傳入第二個參數以避免困惑，或發生非預期的結果。

除此之外，由於 `parseInt` 傳入非字串後會經過 ToString 強制轉型，一般情況下並不建議傳入字串以外的參數，以避免非預期的結果：
```js
console.log(parseInt(0.000008)); // 0
// 得到的字串為 "0.000008"

console.log(parseInt(0.0000008)); // 8
// 得到的字串為 "8e-7"

console.log(parseInt(false, 16)); // 250
// 得到的字串為 "false"，實際解析的是 "fa"

console.log(parseInt(parseInt, 16)); // 15
// 得到的字串為 "function parseInt(){...}"，實際解析的是 "f"

console.log(parseInt(103, 2)); // 2
// 3 不是二進制合法的字符，實際解析的是 "10"

console.log(parseInt(1/0, 19)); // 18
// 得到的字串為 "Infinity"，實際解析的是 "I"
```

---

## `parseFloat`
`parseFloat` 與 `parseInt` 十分相似，不同之處在於 `parseFloat` 只接受一個參數（也就是將收到的值一律視為十進位），並會將其解析為一個浮點數。

如果收到的參數並非字串，同樣會先進行 ToString 強制轉型再進行解析：
```js
console.log(parseFloat(4.567)); // 4.567
console.log(parseFloat('4.567abcde356fgh42')); // 4.567
console.log(parseFloat('abcdefgh')); // NaN
console.log(parseFloat(true)); // NaN
console.log(parseFloat([0])); // 0
```

---

## 參考資料
- [You Don't Know JS: Types & Grammar | Chapter 4: Coercion](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch4.md)
- [你不懂JS：类型与文法 | 第四章：强制转换](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/types%20%26%20grammar/ch4.md)
- [parseInt() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [parseFloat() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
- [認識 parseInt、parseFloat 與 Number 轉換成數字的三種方法](https://medium.com/unalai/%E8%AA%8D%E8%AD%98-parseint-parsefloat-%E8%88%87-number-%E8%BD%89%E6%8F%9B%E6%88%90%E6%95%B8%E5%AD%97%E7%9A%84%E4%B8%89%E7%A8%AE%E6%96%B9%E6%B3%95-276640aedb4e)
