---
title: '【React 22】Hook 05：useReducer'
date: '2021-10-08'
tags: 'React.js,JavaScript'
coverImage: ''
---


## Reducer
Reducer 這個概念，
來源於 React 的延伸套件 Redux，
其核心由 React 拿來參考後，
開發出了 React 原生 API ── useReducer。

所謂 Reducer 就是用模組化方式
自訂處理、改變數據的一套邏輯，
useState 的底層即是以 useReducer 實踐，
可視為擴充版的 useState。

---

## useReducer
useReducer 核心要素
基本上與 Redux 完全相同

- Actions：描述「行為內容」的物件
- Reducer：負責計算，對應每種 Action 實際如何改變資料
- Store：資料庫，儲存修改後的資料

> Reducer 必須是 pure function，不得處理有副作用的行為，以確保每次計算結果都相同。

### 使用方法
`const [state, dispatch] = useReducer(reducer, initialState, init?)`

**參數**
- reducer：定義如何處理資料
- initialState：初始值
- init（選填）：計算初始值的 function

**返回值**
- state：返回的資料
- dispatch：更新 state 的方法（可視為自訂的 `useState`），接受 action 作為參數

---

### 使用範例
```
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

---

### 指定初始 state

#### 方法一：作為 useReducer 第二個參數傳入
```
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

#### 方法二：Lazy initialization
傳入 init function 作為第三個參數，
初始 state 會是 init function 的回傳值。

```
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

這可以將初始 state 的計算邏輯
提取到之外 reducer 之外，
也方便處理重置 state 的 action。

---

## 與 Redux 的差異
- 跟 Redux 的 store 不同，useReducer 儲存的值是 component 的 state，需要另外搭配 useContext，才能實現全局存取（global store）。
- useReducer「**沒有 middleware**」，無法使用如 Redux-Thunk 或 Redux-Saga 等工具，來進行 data fetching 或處理 side effect。

---

## 參考資料
- [[React Hook 筆記] useReducer 真的能完全取代 Redux 嗎?](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usereducer-%E7%9C%9F%E7%9A%84%E8%83%BD%E5%AE%8C%E5%85%A8%E5%8F%96%E4%BB%A3-redux-%E5%97%8E-fabcc1e9b400)
