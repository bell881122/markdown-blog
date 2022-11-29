---
title: 'Title'
date: '2022-10-27'
---

在討論多型（Polymorphism）的章節中，有提到了多型是利用原型鍊的「遮蔽（Shadowing）」來達成，不過遮蔽在實際狀況下有些需要注意的細節。

在為一個屬性賦值，如 `obj.propA = "A";` 時，可能會有三種情況：
1. `obj` 內部與原型鍊上都找不到 `propA` 屬性
2. `obj` 內部擁有一個 `propA` 屬性
3. `obj` 沒有 `propA` 這個屬性，但原型鍊上有

在 `1` 的狀況下，`obj` 會新增 `propA` 這個屬性，並且直接賦值；`2` 的狀況中如果 `propA` 並未設置為 `writable: false`，則會覆蓋原本的值；`3` 的情況則因為細節會有些微妙的不同。

## 遮蔽的條件
執行 `obj.propA = "A";` 時，如果 `obj` 本身沒有 `propA` 這個屬性，但原型鍊上有，這時候就需要檢查上層物件的 `propA`。

如果這個屬性的 `writable` 為 `true`，則這個賦值會被忽略，不會發生遮蔽（在嚴格模式下，程式則會拋出錯誤）：

```js
const objProto = {};
Object.defineProperty(objProto, "propA", {
  value:2,
  writable: false
})

const obj2 = Object.create(objProto);
console.log(obj2.propA); // 2
obj2.propA = 4
console.log(obj2.propA); // 2
```

而如果這個屬性擁有設值器（setter），則在賦值時會調用這個設值器，並將結果添加到 `obj` 的 `propA` 上：

```js
var objProto = {
	get propA() {
		return this.privateProp;
	},
	set propA(val) {
		this.privateProp = val * 2;
	}
};

objProto.propA = 2;
console.log(objProto.propA); // 4

const obj2 = Object.create(objProto);
console.log(obj2.propA); // 4
obj2.propA = 8
console.log(obj2.propA); // 16
console.log(objProto.propA); // 4
```

如果以上兩者皆非，則 `obj` 上會直接添加屬性 `propA`，並對上層物件的 `propA` 形成遮蔽：
```js
var objProto = {
  propA: 2
};

const obj2 = Object.create(objProto);
console.log(obj2.propA); // 2
obj2.propA = 4
console.log(obj2.propA); // 4
console.log(objProto.propA); // 2
```

---

## 參考資料
- [You Don't Know JS: this & Object Prototypes | Chapter 5: Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch5.md)
- [你不懂JS：this 与对象原型 | 第五章: 原型](https://github.com/CuiFi/You-Dont-Know-JS-CN/blob/master/this%20%26%20object%20prototypes/ch5.md)
