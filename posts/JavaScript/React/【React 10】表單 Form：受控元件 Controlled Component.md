---
title: '【React 10】表單 Form：受控元件 Controlled Component'
date: '2021-09-26'
tags: 'React.js,JavaScript'
coverImage: ''
---


在 React 中，允許直接用 HTML 來建立表單，
但使用 JavaScript function 
處理提交表單、讀取使用者在表單中填入的資料
更加常見也更方便。

要做到這點，
標準的方法是使用「**受控元件**」

---

 ## 受控元件 Controlled Component
在 React 中，一般會使用
可變的 state 作為表單元素的值，
並以 setState() 作為唯一更新方式，
藉此掌握後續使用者輸入對表單帶來的改變，
表單元素（`<input>`、`<textarea>` 和 `<select>`）
顯示的 value 始終由 React 的 state 驅動，
成為它們「唯一真相來源」。

像這樣被 React 控制值的元件，
就被稱為「受控元件（Controlled Component）」。

#### react 表單範例
```
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### 資料處理步驟
1. 由初始 state 設定表單初始值
2. 每當欄位值發生變化都會呼叫 onChange 事件
3. 事件處理透過 event 拿到改變的狀態更新 state
4. setState 觸發重新繪製，完成表單元件值的更新

---

### select 標籤
將一個 array 傳給 `value` 這個屬性
`select` 標籤就可以使用多重選項

```
<select multiple={true} value={['B', 'C']}>
```

---

### 處理多個輸入
一次需要處理多個
controlled `input` element 時，
可以利用 `name` attribute，
讓 handler function 依照
`event.target.name` 的值判斷該如何處理

```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```


#### 補充：動態計算屬性名（computed property name）

使用 ES6 的動態計算屬性名方法
```
this.setState({[name]: value});
```

和以下的 ES5 程式碼是一樣的：
```
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

由於 `setState()` 會自動 merge state，
只需要在有改變的地方呼叫它即可
