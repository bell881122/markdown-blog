---
title: '【React 08】條件渲染 Conditional Rendering'
date: '2021-09-24'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


在 JSX 中，可以使用 JavaScript 中 `if` 陳述式
或條件運算子如 `三元運算子(ternary operator)` 
來規範如何顯示、更新 UI。

以下範例便根據 isLoggedIn prop 的值
來 render 不同問候語
```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

ReactDOM.render(
  // 試改為 isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

以下列出兩種 JSX 中常見的條件渲染

---

### && 邏輯運算子（If 條件）
在 JSX 中，可以透過大括號`{}` 嵌入表達式，其中也包含 && 運算子
```
<div>
  <h1>Hello!</h1>
  {unreadMessages.length > 0 &&
	<h2>
	  You have {unreadMessages.length} unread messages.
	</h2>
  }
</div>
```

> 回傳 falsy expression 會導致 && 之後的 element 被忽略，但 falsy expression 本身依然會回傳。在下面的範例中，render 將會回傳 `<div>0</div>`
> ```
> render() {
>   const count = 0;
>   return (
>     <div>
>       { count && <h1>Messages: {count}</h1>}
>     </div>
>   );
> }
> ```

---

### 三元運算子（If-Else 條件）
也可以使用三元運算子
```
<div>
  The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
</div>
```

在 JavaScript 語法中依然可以穿插使用 JSX
```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

---

### 防止 Component Render
如果某些條件下，
希望 Component 能夠隱藏自己，
可以透過回傳 null 來取代 render。
```
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```
