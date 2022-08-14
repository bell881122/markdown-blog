---
title: '【Dev】編程方法：Imperative 與 Declarative'
date: '2021-10-06'

coverImage: ''
---

#### Imperative Programming（命令式／指令式編程）
- 對程式說明「How to do」，詳細指示每個行動
- 程式完全按照你的命令行動（How），不管也不會知道你真正想要的是什麼（What）
#### Declarative Programming（宣告式／聲明式編程）
- 對程式說明「What to do」，對它聲明想達成的結果
- 告訴程式你想要的是什麼（What），讓程式自己想辦法去實現（How）
- 將實現的方式抽象化，簡化程式邏輯

---

## 實際範例

目標：將一個 Array 的所有值加總

#### Imperative 寫法
```
var array = [3,2,1]
var total = 0
for( var i = 0 ; i <= array.length ; i ++ ){
    total += array[i]
}
```

Imperative Programming
會寫出完整的計算過程，
如果演算非常複雜，
甚至出現巢狀 loop 或巢狀 object 時，
在畫面上會出現許多判斷與加減計算，
鉅細靡遺地告訴程式該「如何」做到。

#### Declarative 寫法
```
var array = [3,2,1]
array.reduce( function( previous, current ){ 
    return previous + current 
})
```

Declarative Programming
則直接向程式宣告我想要的東西是什麼。

如上範例中，我要程式進行一個「reduce」，
並說明計算方式是「previous + current」，
至於實際要如何達成，則完全交給程式處理。

Declarative 的作法是將行為抽象化，
並把具體執行方式都封裝在
`Array.prototype.reduce()` 裡，
不再需要額外的變數，盡可能減小變動，
以降低BUG產生的機會。

同時 Declarative 也具有明確的語意，
可以從宣告中理解執行的工作內容，
比 Imperative 擁有更高可讀性。

但使用 Declarative 的前提是，
JS 程式認識 `reduce` 這個方法，
知道該對資料進行何種處理。

另外，由於已經對行為抽象化，
具體實作方式完全交給了程式，
Declarative 在實際操作中的靈活性相對較低。

---

## 參考資料
- [Imperative vs Declarative](https://medium.com/@slashtu/imperative-vs-declarative-681efa8dc89d)
- [从前端角度来看声明式编程与命令式编程](https://alili.tech/archive/sdwn0mwjjj8/)
- [React.js中的声明式和命令式之间的区别？](https://qastack.cn/programming/33655534/difference-between-declarative-and-imperative-in-react-js)
