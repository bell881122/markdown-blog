---
title: '【React 28】Hook 08：useCallback'
date: '2021-10-14'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

## useCallback
如果父元件所傳遞的 props 包含 Object，
則在元件因狀態改變而 re-render 時，
Object 的記憶體位址也會隨之重新分配。

useCallback 則能夠在特定條件下
保留原本的 Object，
防止其記憶體位址參考
因 re-render 而被改變。

因此搭配 React.memo 使用時，
能夠避免因傳入元件的 callback
記憶體位址不同而強迫重新渲染的問題。

---

### 用法
```
const memorizedValue = useCallback(callback, array)
```

- callback：一個 function， dependencies array 變動時才會被更新。
- array：內容發生改變時才重新執行，所有**在 callback 中引用的值**都應該出現在這個 array 中，否則 useCallback 可能會失效

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

useCallback 會幫我們記住
callback 函式的記憶體位置，
在 React 元件重新渲染時，
若 dependencies array 中的值沒有被修改，
就沿用上次的 reference。

#### 使用範例
```
const List = ({getItems}) => {
  const [item, setItems] = useState([])
  useEffect(() => {
    setItems(getItems())
  }, [getItems])
  
  return item.map(item => <span key={item}>{item} , </span>)
}

const App = () => {
  const [number, setNumber] = useState(0);

  // very slow function
  const getItems = useCallback(() => {
    return [number, number + 1, number + 2]
  }, [number])
  
  const changeHandler = e => {
    setNumber(e.target.value)
  }
 
  return (
    <>
        <input type='number' value={number} onChange={changeHandler} />
        <List getItems={getItems} ></List> 
    </>
  )
};
```

---

### useMemo 與 useCallback
`useCallback(fn, depsArr)` 
等同於
`useMemo(() => fn, depsArr)`

- useMemo：返回值是 callback 的返回值 → 得到一個值
- useCallback：返回值是 callback 本身 → 得到一個函式

---

## 參考資料
- [React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
- [[React Hook 筆記] Memorized Hook- useMemo, useCallback](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-memorized-hook-usememo-usecallback-e08a5e1bc9a2)
- [useCallback | React 官網](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecallback)
