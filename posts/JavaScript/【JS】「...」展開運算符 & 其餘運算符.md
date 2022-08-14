---
title: '【JS】「...」展開運算符 & 其餘運算符'
date: '2021-09-22'

coverImage: ''
---

「展開運算符」與「其餘運算符」，
兩者的表示方式都是 `...`，
以下分別說明。

## 展開運算符
展開運算符（Spread Operator）
- 用來解壓縮陣列，把一個陣列展開成個別值
- 屬於陣列的淺拷貝
- 在「陣列字面定義」與「函式呼叫」時使用
- 能夠把「可迭代（iterable）」或「偽陣列（Array-like）」的物件轉變為陣列
	- 可迭代物件：String、Array、TypedArray、Map、Set
	- 偽陣列物件：函式的「arguments」

> 建議使用展開運算符取代以下語法
> - `Array.prototype.concat()`
> - `Object.assign()`

範例：
```
const todos =["aaa","bbb","ccc"]

//使用展開運算符
const addTodos =[...todos, "ddd"];
//等同於
const addTodos = todos;
addTodos.push("ddd");
```

特殊用法：
```
function sum(a, b, c) {
  return a + b + c
}
const args = [1, 2, 3]
sum(…args) // 6
```


## 其餘運算符
其餘運算符（Rest Operator）
- 在「函式傳入參數定義」與「解構賦值（destructuring）」時使用
- 若沒有傳入實際值，會成為一個空陣列
- 其餘運算符必定位於最後一位，並且只能使用一次

### 其餘參數 Rest parameters
將函式參數「剩餘的值」組合成一個陣列
- 建議使用其餘運算符來代替函式中的 arguments 物件
- 其餘參數在傳入參數定義中，

### 解構賦值 destructuring
```
const [x, ...y] = [1, 2, 3]

console.log(x) //1
console.log(y) //[2,3]
```

等號左右個數不相等時，會成為空陣列
```
const [x, y, ...z] = [1]

console.log(x) //1
console.log(y) //undefined
console.log(z) //[]
```


## 參考資料
- [Day 09: ES6篇: Spread Operator & Rest Operator(展開與其餘運算符)](https://ithelp.ithome.com.tw/articles/10185496)
