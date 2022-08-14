---
title: '【React 02】JSX（JavaScript 語法擴充）'
date: '2021-09-18'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

## JSX 特點
- 全稱為 JavaScript Syntax Extension，即 JavaScript 語法擴充，是 React 獨特的樣板語言（template language）
- 內容為 JavaScript + HTML/XML 的語法混合
- JSX 屬於 JavaScript 表達式（Expression），就像撰寫純 JavaScript 一樣，可配合陳述式和表達式使用
- 以元件（components）為思考中心而誕生的語言
- 編譯後會轉成純 JS 語法
- 自主防範 Injection 攻擊（React DOM 會 escape 所有嵌入 JSX 的變數）

#### 註解方式
- 多行：`/* 我是註解內容 */`
- 單行：`// 我是註解內容`

#### JSX 的判斷語句
- 使用三元運算符→ condition ? trueResult : falseResult
- && 邏輯運算符→ condition && trueResult（如條件成立，就顯示）

### Fragment
※ JS傳遞參數時只能傳遞一個元素，React v16.2.0以後可以使用<React.Fragment>標籤包裹最外層，如此便不會多一個 `<div>` 標籤
```
const testFunction =()=> {
    return( 
        <React.Fragment>
            <button> 大家好 </button>
            <h1> 我不好 </h1>
        </React.Fragment>
    );
}
```

### 使用方式
- 最外層只能有一個標籤，讓整個元件可被視為一個 HTML 元素
    - React 16 起新增了 Fragment `<></>`，是 `<Fragment></Fragment>` 的省略寫法
- 原生 HTML 標籤使用小寫，自訂的 React Component 則首字大寫
- JSX 是 JS 表達式，可使用條件（三元運算子）、迴圈、變數等 JS 語法
- JSX 內的 HTML 標籤可使用 HTML 屬性
    - 可使用所有 HTML 原生屬性
    - React 16 以後使用自訂屬性不須要加上 `data-*`
    - 屬性值以 `""` 包圍，預設型別為 string
    - 可使用 `{ }` 加入不同型別的參數，或者使用 JS 的變數
    - 加入屬性若無設定值，預設為 true；未加入的屬性預設值則為 false
    - JSX 的底層是 JS，故屬性`class`需要使用`className`，而`for`需要使用`htmlFor`
    - 可以用 ES6 的 Spread Operator 來一次設定多個屬性
```
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
```
- Inline Styles (CSS 樣式)
    - 跟 JavaScript DOM API 一樣使用 camelCased properties
    - style 屬性傳入的值為物件
    - 如果樣式的值為數字，預設單位為`px`
```
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
- 關於 InnerHTML
    - 由於安全上的考量，React 會自動將 InnerHTML 轉為跳脫字元（Escape character）以避免 XSS(cross-site-scripting) 攻擊
    - 如果想使用類似原生 InnerHTML 的效果，JSX 提供 dangerouslySetInnerHTML 這個屬性
