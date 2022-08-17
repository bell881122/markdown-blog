---
title: '【React 04】Component 與 Props'
date: '2021-09-20'
tags: 'React.js,JavaScript'
coverImage: ''
---


## 關於 Component 
- 可理解為程式中彼此獨立、可重組、拆分、複用的一種積木單元
- 每個 Component 皆能完整描述自身長相（UI）和邏輯（JS）
- React 的 Component 可視為自定義的 HTML 標籤，因此字首必須大寫，以和原生 HTML 標籤區別

## 兩種 Component

### Class Component（類元件）
範例：
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
- 搭配生命週期，在生成 Component 到渲染完成，以及回收元件時做不同事情（如獲取數據、清除資料等）


### Function Component（函式元件）
範例：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- 比 Class Component 更精簡，只要定義一個純函數，並返回 JSX 即可
- 函式元件沒有生命週期方法，需要借助 react hook 實現
- 函式元件不能訪問 `this`


## 關於 props
React 的 component 本質上即是 function，
能夠接收任意型別的參數，
而 component 收到的參數，
是撰寫 HTML 標籤時給予的 properties，
因此稱之為「**props**」。

另外，該 component 的 children
也會跟著 properties 一起打包成一整個 object
作為 props 傳遞給該 component

#### props 範例
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```


### Props 是唯讀的
- 不管使用 function 或是 class 來宣告 component，都絕不能修改自己的 props
- 如果要操作、改變輸出內容，則要使用「state」


### Props 的 children
props 中有個特別的屬性 children
可以取得 children element
在 component 無法確定自己的 children 內容時
可以直接使用這個參數
```
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
	  // 以下內容會作為 props.children 傳入 FancyBorder
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
	  // 以上內容會作為 props.children 傳入 FancyBorder
    </FancyBorder>
  );
}
```


## 參考資料
- [Composition vs 繼承](https://zh-hant.reactjs.org/docs/composition-vs-inheritance.html)
