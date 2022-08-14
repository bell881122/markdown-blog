---
title: '【JS】ES6 動態計算屬性名 Computed property names'
date: '2021-10-08'

coverImage: ''
---

在 ES6 以前，要取得物件只能用
`物件.屬姓名` 或 `物件[屬姓名]` 這樣的寫法。

其中 `[]` 內只允許 number 或 string，
如果放入變數，則會自動轉成 string。

```
var attName = 'name';
var p = {
	name : '張三',
	attName : '李四'
}
console.log(p[attName]) // 張三
// 上方等同於呼叫 console.log(p["name"])
```

---

## Computed property names
在 ES6 以後，則新增了「動態計算屬性名」，
允許在定義物件時讓變數作為屬性名，
實際做法是在 key 外層包覆一個 `[]`。

`[]` 可以使用表達式，
因此除了純變數外也可進行計算、
使用樣板字面值（Template literals）等。

---

#### 應用範例一

直接使用
```
const myPropertyName = 'c'

const myObject = {
  a: 5,
  b: 10,
  [myPropertyName]: 15
} 

console.log(myObject.c) // prints 15
```

在 `[]` 內進行計算
```
const fieldNumber = 3

const myObject = {
  field1: 5,
  field2: 10,
  ['field' + fieldNumber]: 15
}

console.log(myObject.field3) // prints 15
```

使用樣板字面值
```
const fieldNumber = 3

const myObject = {
  field1: 5,
  field2: 10,
  [`field${fieldNumber}`]: 15
}

console.log(myObject.field3) // prints 15
```

#### 應用範例二
```
const classMates = ["Harry", "John", "Tom", "Mary", "Jerry"];
let classMatesList = {}

classMates.forEach((name, id) => {
  classMatesList = {...classMatesList, ['Id' + ++id]: name}
})

console.log(classMatesList); // { Id1: "Harry", Id2: "John", Id3: "Tom", Id4: "Mary", Id5: "Jerry" }
```

---

## 參考資料
- [ES6 动态计算属性名](https://www.jianshu.com/p/9f0abf7b965b)
- [ES6 語法-Computed property names (動態計算屬性名)介紹](https://ithelp.ithome.com.tw/articles/10230036)
- [Computed Property Names in JavaScript](https://eloquentcode.com/computed-property-names-in-javascript)
