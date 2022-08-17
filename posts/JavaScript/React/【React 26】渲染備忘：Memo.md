---
title: '【React 26】渲染備忘：Memo'
date: '2021-10-12'
tags: 'React.js,JavaScript'
coverImage: ''
---


## React.memo
React.memo 主要的作用是性能優化，
使用 memo 後，程式會將 render 結果存在快取內，
並在 render 時比較前後兩次的 props 是否變化，
來判定是否需要 re-render。
如果沒有變化時就使用上一次 render 的結果，
以避免重新渲染沒有更新的元件造成不必要消耗。

但如果是父元件重新渲染，
由於父元件宣告的 Object 都會被重新分配記憶體位址，
因此使用 React.memo 防止重新渲染將會失效。

另外，memo 的功能是優化效能，
不應用來避免 render。

---

## 關於 Memo
- 本身是一個高階元件（HOC，higher order component）
- 只能包裹**函式元件（function component）**
- 僅判斷 props 的改變，不會追蹤 state 的變化。
- 使用淺比較（shallow compare）

> shallow compare 是指遍歷物件的所有 key 值，如果 key 值都一樣就返回 true。也就是嚴格比較基本型別（number、string 等），但對物件僅比較是否指向同一個參考。

---

## 使用範例
```js
const MyComponent = React.memo(function MyComponent(props) {
	return(
	<div>
		{ props.name }
	</div>
	)
});
```

也允許箭頭函式
```js
const MyComponent = React.memo(props=>{
	return(
	<div>
		{ props.name }
	</div>
	)
})
```

### React.memo 的第二參數
自訂比較 props 的方法，
可以讓 Object 不只是比較記憶體位置
```js
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

除了加入 React.memo 的第二參數之外，
也可以利用 `useCallback` 來避免重新渲染。

---

## 參考資料
- [React.memo | 官方文件](https://zh-hant.reactjs.org/docs/react-api.html#reactmemo)
- [React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
- [[React Hook 筆記] Memorized Hook- useMemo, useCallback](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-memorized-hook-usememo-usecallback-e08a5e1bc9a2)
