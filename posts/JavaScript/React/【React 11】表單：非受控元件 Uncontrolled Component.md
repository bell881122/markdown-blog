---
title: '【React 11】表單：非受控元件 Uncontrolled Component'
date: '2021-09-27'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


## 受控 vs. 非受控元件
- 受控元件：value 值由 React component 使用 state 負責處理，隨時監聽內容來改變值
- 非受控元件：value 值由原始 DOM 或使用 ref 以 HTML 傳統表單方式處理，不受 component 的 state 控制
> 大多數的情況下，React 推薦使用受控元件（controlled component）來實作表單

---

### 撰寫非受控元件
如果要寫一個 uncontrolled component，
可以使用 ref 從 DOM 取得表單的資料。
```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### 預設值
在 React 的 render 生命週期裡，
表單上的 value attribute 會覆寫掉 DOM 的值。

由於在 component mount 後改變 defaultValue 屬性，
不會造成任何在 DOM 裡面的值更新。
要處理這種情況，
可以指定 defaultValue attribute 而非 value。
```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

#### 預設屬性名稱
- `defaultValue`：text / select / textarea input
- `defaultChecked`：checkbox / radio input

---

### 檔案 input 標籤
`<input type="file">` 讓使用者，
能夠從他們的裝置選擇上傳
一個或多個檔案。

在 React 裡，
`<input type="file" />` 永遠都是
uncontrolled component。

因為它的值是唯讀，
只能被使用者設定，
而無法由程式碼來設定。

---

## 參考資料
- [Uncontrolled Component](https://zh-hant.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)
