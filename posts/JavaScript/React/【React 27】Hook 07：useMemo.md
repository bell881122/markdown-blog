---
title: '【React 27】Hook 07：useMemo'
date: '2021-10-13'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


## useMemo
- 用於性能優化，避免重複執行高效能的渲染
- 如果傳入的參數未改變，就直接沿用上次的計算結果。
- 遇到計算複雜、耗效能的地方，先用 useMemo 計算是否需要執行
- 結果會被緩存，以便每次確認是否變更內容

useMemo 與 React.memo 一樣，
作用是優化效能，
適合用在複雜緩慢且變動性不大，
其結果不需要經常 re-render 的計算上。

---

## 使用方式
```
const memorizedValue = useMemo(callback, array)
```

- callback：處理計算邏輯的 function
- array：當數組內容發生改變時才重新執行，若無 array，則每次 render 時依然會重新計算值

> useMemo 內執行的 function 會於 render 期間執行，而 useEffect 的內容是在 render 後執行，因此 useMemo 內不能使用 useEffect。

---

## 範例
```js
function slowFunction(num) {
  console.log('Calling Slow Function');
  
  for(let i=0; i<=1000000; i++) {}
  return num*2;
}

const App = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(true);

  const doubleNumber = useMemo(() => slowFunction(number), [number]);
  
  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? '#2c3e50': '#ecf0f1',
      color: dark ? '#ecf0f1' : '#2c3e50'
    }
  }, [dark])
   
  
  useEffect(() => {
    console.log('Theme Change')
  }, [themeStyle])

  const changeHandler = e => {
    setNumber(e.target.value)
  }
  
  const changeTheme = () => {
    setDark(prevDark => !prevDark)
  }
  
  return (
    <>
        <input type='number' value={number} onChange={changeHandler} />
        <button onClick={changeTheme}>Change Theme</button>
    </>
  )
};
```

---

## 參考資料
- [useMemo | 官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usememo)
- [React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
- [[React Hook 筆記] Memorized Hook- useMemo, useCallback](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-memorized-hook-usememo-usecallback-e08a5e1bc9a2)
