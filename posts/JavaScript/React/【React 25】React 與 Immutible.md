---
title: '【React 25】React 與 Immutible'
date: '2021-10-11'
tags: 'React.js,JavaScript'
coverImage: ''
---


## Immutable
Immutable 中文意思為不可變的，
即重新賦值後，
新的值和原始的值並不互相影響
原本的值依然會保留下來，
不會被賦值改變。

Immutable 範例
```
let str = 'Hello, you!!';
let ianHello = str;
ianHello += 'ian';

// not changed
console.log(str); // Hello, you!!
console.log(ianHello); // Hello, you!!ian
```

與之相反的是 mutable，
第一次賦值後，
對物件進行如賦值等操作後，
mutable 的內容會產生變化。

Mutable 範例
```
let names = ['ian'];
let copyName = names;
copyName.push('peter');

// changed
console.log(names); // [ian, peter]
console.log(copyName); // [ian, peter]
```


而 React 為了避免資源浪費，
會比較元件的 props 和 state 是否有變更，
在無變化的情況下便不會觸發 re-render，

因此 state 更新的內容必須是 Immutable，
否則 React 就無法追蹤到資料內容的變化，
也就不會觸發任何 render。

無法觸發 re-render 的範例：
```
const [state, setState] = useState({
	list: []
})

clickBtn = () => {
  state.list.push({
	id: Math.random(),
	name: randomStr.generate(4)
  });
  setState(state);
};
```

如上方範例中，
直接修改 state 的 list 陣列內容，
但 state 本身在記憶體中
依然指向同樣的參考，
程式並未收到變更訊息，
所以不會觸發 render。

---

### 解決方式
#### ES6 的解構方法
```
setState({ 
  list: [
    ...state.list,
    { id: Math.random(), name: randomStr.genreate(4) }
  ]
});
```

把原本的 state 淺拷貝一份出來，
給予不同的記憶體位置後，
就可以正確 render 了。

---

#### 使用輔助套件
使用 Object.assign 或是 es6 解構的時候只能對第一層拷貝，如果有多層資料時，裡面的東西就不會被拷貝到，依然是原本物件儲存的參考，這時一樣無法觸發 render。

```
const a = { b: { c: 1344 } };
const b = {...a);
b.b.c = 2000;
console.log(a.b.c) //2000
```

以下列出一些在改變 state 時，
能輕鬆達成 Immutable 的輔助套件。

- [Immutable.js](https://immutable-js.com/)（由 Facebook 開發維護）
- [Immer.js](https://github.com/immerjs/immer)

---

## 參考資料
- [寫 React 的時候常常聽到 immutable，什麼是 immutable ?](https://medium.com/reactmaker/%E5%AF%AB-react-%E7%9A%84%E6%99%82%E5%80%99%E5%B8%B8%E5%B8%B8%E8%81%BD%E5%88%B0-immutable-%E4%BB%80%E9%BA%BC%E6%98%AF-immutable-146d919f67e4)
- [React Day26 - Immutablejs](https://ithelp.ithome.com.tw/articles/10187571)
- [Immutable 對於 React 重要性](https://ianccy.com/immutable/)
