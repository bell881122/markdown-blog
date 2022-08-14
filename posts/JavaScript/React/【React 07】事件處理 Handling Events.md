---
title: '【React 07】事件處理 Handling Events'
date: '2021-09-23'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


## React 事件處理
React 和 HTML 事件處理的語法略有不同：

HTML 的事件語法：
```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React 的事件語法：
```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

### 比較
- **事件名稱**
	- 在 React 中是 camelCase
	- 在 HTML DOM 中是小寫
- **事件的值**
	- 在 JSX 中是一個 function
	- 在 HTML DOM 中是一個 string


### 避免瀏覽器預設行為
在 React 中要避免瀏覽器預設行為
必須明確呼叫 preventDefault
```
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```


### this 綁定
JavaScript 中，class 的方法預設是沒有被綁定（bound）的
如果在未綁定的狀況下呼叫，this 會變成 `undefined`
```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

如不綁定，也可以使用箭頭函式（ arrow function）
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 這個語法確保 `this` 是在 handleClick 中被綁定：
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```


## 參考資料
- [事件處理](https://zh-hant.reactjs.org/docs/handling-events.html)
