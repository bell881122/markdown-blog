---
title: '【React 19】Hook 03：useEffect'
date: '2021-10-05'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


useEffect 的 Effect 意指「副作用」，
即是指 fetch 資料、訂閱事件與改變 DOM，
這些在 render 期間無法完成，
卻又會影響其他 component，
被稱為是「side effect」的行為。

useEffect 是將
`componentDidMount`、
`componentDidUpdate` 與
`componentWillUnmount`
這三個主要的生命週期方法
整合起來的單一 API，
讓 function component
可以藉由 useEffect 實現這些方法。

---

## 使用方式
useEffect 使用格式如下：
`useEffect(callback, array?)`

- calback：
	- 處理副作用的邏輯都在這裡進行
	- 定義 componentDidMount 或 componentDidUpdate 要做什麼事，
	- 回傳值也要是一個函式，表示 componentWillUnmount 要做什麼事，
- array：
	- 如果是**空的**，則只在 render 之後執行一次，無法再次觸發
	- 如果**有值**，會在該 array 發生改變後執行
	- 如果**省略**，則每次渲染時都會執行

#### useEffect 清理機制
- 每次執行前都會清理上一次的 effect
- useEffect 中可以返回一個函式進行清理工作，如 `setTimeOut` 和 `setInterval`

---

### useEffect 生命週期
對應 class component 的三個生命周期
- componentDidMount：元件已渲染／掛載（Mount）到 DOM 上
- componentDidUpdate：狀態（state）更新完畢
- componentWillUnmount：元件準備從 DOM 移除「之前」

```
    const mounted=useRef();
    useEffect(()=>{
      if(mounted.current===false){
        mounted.current=true;
        /* 下面是 componentDidMount*/
    
    
        /* 上面是 componentDidMount */      
      }
      else{
        /* 下面是componentDidUpdate */
    
    
        /* 上面是componentDidUpdate */

      }
      
      return (()=>{
           /* 下面是 componentWillUnmount */
      
      
          /* 上面是 componentWillUnmount */
      })
    },[dependencies]); // 第二個參數用來限定當哪些變數被改變時要觸發 useEffect，如果使用空陣列，表示只執行一次，沒有任何改變可以再次觸發
```

---

## 參考資料：
- [【React.js入門 - 20】 useEffect - 在function component用生命週期](https://ithelp.ithome.com.tw/articles/10223344)
- [認識 React Hooks 之一](https://ithelp.ithome.com.tw/articles/10252328)
