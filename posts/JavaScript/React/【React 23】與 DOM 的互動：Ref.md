---
title: '【React 23】與 DOM 的互動：Ref'
date: '2021-10-09'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

## Ref
Ref 擁有以下特色：
- 不須重新渲染就可以更新值
- 直接抓取 DOM 來控制 DOM 的行為
- 可以在 render 方法內建立 React element

通常來說，只在不牽涉畫面顯示，
如管理 focus、選擇文字或影音播放時
才會使用到 Ref。

> Ref 屬於命令式（Imperative）編程，官方建議不要在可以宣告性（Declarative）完成事情的地方使用 Ref。

---

### 建立 Ref
呼叫 `createRef` 可以建立新的 Ref
```
const ref = React.createRef();
```

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

Ref 藉由 `ref` 參數依附在 React element 上
當 component 建立後，
將 Ref 賦值到某個 instance 的屬性上，
之後便能在整個 component 內被參考到。

---

### 存取 Ref
```
const node = this.myRef.current;
```
藉由 `current` 屬性
可以取得指向該 DOM 節點的參考

---

### Ref 的值
Ref 的值會根據節點的類型而有所不同：
- 在 HTML element 上使用 `ref` 參數時，使用 `React.createRef()` 建立 `ref` 會取得它底下的 DOM element 來做為它的 `current` 屬性。
- 在客製化的 class component 使用 `ref` 參數時，`ref` 取得被 mount 的 component 上的 instance 來當作他的 `current`。

> function component 沒有 instance，因此無法使用 `ref`。

寫法一
```js
myRef = React.creatRef();

console.log(this.myRef);
console.log(this.myRef.current);
console.log(this.myRef.current.innerHTML);
render(){
	return <div ref ={this.myRef}>內容</div>
}
```

寫法二
```js
myRef = null;

console.log(this.myRef);
console.log(this.myRef);
console.log(this.myRef.innerHTML);
render(){
	return <div ref ={node => this.myRef = node }>內容</div>
}
```

---

### 其他使用方式

#### DOM Element 的用法
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 產生一個可以儲存 textInput DOM element 的 ref
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 特別利用原生的 DOM API 來關注文字的輸入
    // 注意：我們正利用「current」來取得 DOM 節點
    this.textInput.current.focus();
  }

  render() {
    // 告訴 React 我們想要將 <input> ref
    // 和我們在 constructor 產生的 `textInput` 連結
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React 會在 component mount 的時候
將 DOM element 賦值到 current 屬性，
並在 unmount 時將它清空回 null。

Ref 的更新發生在生命週期 
componentDidMount 或
componentDidUpdate 之前。

---

#### Class Component 的用法
```
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}

class CustomTextInput extends React.Component {
  // ...
}
```

---

##  參考資料
- [Refs 和 DOM | React 官網](https://zh-hant.reactjs.org/docs/refs-and-the-dom.html)
- [React Ref API 怎麼用？](https://medium.com/itsoktomakemistakes/react-ref-api-%E6%80%8E%E9%BA%BC%E7%94%A8-ea1f31cd0a7a)
