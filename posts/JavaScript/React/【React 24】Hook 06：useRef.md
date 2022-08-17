---
title: '【React 24】Hook 06：useRef'
date: '2021-10-10'
tags: 'React.js,JavaScript'
coverImage: ''
---


# useRef
useRef 使用方式
```
const refContainer = useRef(initialValue);
```

useRef 會回傳一個
擁有 current 屬性的 ref object，
current 屬性的值由 initialValue 初始化得來，
回傳的 ref object 在 component 的生命
週期內都將保持不變。

useRef() 建立的是一個普通的 JavaScript object，
這表示它是可修改（mutable）的，
因此更新 current 的值不會觸發 re-render，
但同樣的，當 useRef 的內容發生變化時，
也不會收到任何通知。

使用 useRef() 和自建一個
JavaScript object 的唯一不同是，
useRef 在每次 render 時
都會返回同一個 ref object。

範例：
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

使用 useRef 綁定後，
`inputEl` 的 current 指向 `<input type="text" />`。

> 更新 useRef 是 side Effect 的行為，因此必須要在 useEffect 或 event handler 裡執行。

---

### 使用情境
- 計算 Render 次數
- 用 Imperatively 方法改變 DOM 跟 Child Component
- 抓取 Previous 的值

---

#### 計算 Render 次數
由於 state 會在更新後觸發 re-render，
因此可以使用 useRef 來記錄 render 次數
```
const App = () => {
  const renderCount = useRef(0);  // { current: 0 }
  
  useEffect(() => {
    renderCount.current += 1;
  })
return <p>renderCount.current</p>
}
```

#### 用 Imperatively 方法操縱 DOM
```
const App = () => {
  const inputRef = useRef();
  
  const clickHandler = () => {
    inputRef.current.focus()
  }
return 
  <>
    <input type='text' ref={inputRef} />
    <button onClick={clickHandler}>Focus</button>
  </>
}
```

#### 抓取 Previous 的值
```
function App() {
  const [name, setName] = useState('');
  const previousName = useRef('');

  useEffect(() => {
    previousName.current = name;
  }, [name])

  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <p> My name is {name} </p>
      <p> My previous name is {previousName.current} </p>
    </>
  )
}
```

每次 render 後都是嶄新的元件，
所以無法取得上次的 state 值。

這時可以利用 useRef 在 render 完後，
存下本次 state 的值，
這樣在下次 render 時，
useRef 就會顯示前次儲存下來的 state 了。

---

## 參考資料
- [[React Hook 筆記] useRef](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-useref-c628cbf0d7fb)
- [Hooks API 參考 | React 官網](https://zh-hant.reactjs.org/docs/hooks-reference.html#useref)
