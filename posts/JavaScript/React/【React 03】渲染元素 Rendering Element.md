---
title: '【React 03】渲染元素 Rendering Element'
date: '2021-09-19'
tags: 'React.js,JavaScript'
coverImage: ''
---


React 的核心之一是 JSX 語法，
這意味著整個網頁內容，包含 HTML 與 CSS，
基本上都是由 JS 產生的。

用 React 撰寫的程式中，
所有介面都會以一個「root DOM node」為起點。
```
<div id="root"></div>
```

如果要在畫面上渲染出如下，
以 JSX 撰寫成的 React 元素
```
const element = <h1>Hello, world</h1>;
```

使用以下語法，
就能將 element 顯示到頁面的 `#root` tag 中
```
import ReactDOM from 'react-dom'

ReactDOM.render(element, document.getElementById('root'));
```


## 關於 React 的元件渲染
- React element 是不可變（immutable）物件，一旦建立後就不能再修改
- 更新 UI 唯一的方式是建立一個新的 element，並重新傳入 ReactDOM.render()
- render 時， React 會比較 element 前後狀態，並只更新需要變動的 DOM 以避免不必要的資源浪費
> 可參照以下官網範例，最小的 render 單位不是被宣告的 element，而是 DOM 節點，因此以下程式碼 render 出來的 UI，只有 `h2` 標籤會改變

```
function tick() {
  const element = (
	<div>
	  <h1>Hello, world!</h1>
	  <h2>It is {new Date().toLocaleTimeString()}.</h2>
	</div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```


## 參考資料
- [[Day 04] 理解React Virtual DOM](https://ithelp.ithome.com.tw/articles/10234155)
