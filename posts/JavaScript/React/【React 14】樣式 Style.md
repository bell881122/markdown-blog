---
title: '【React 14】樣式 Style'
date: '2021-09-30'
tags: 'React.js,JavaScript'
coverImage: ''
---


# CSS in React
以下紀錄在 React 中撰寫 CSS 的幾種方法。

---

## 內聯樣式／行內樣式（inline style）
style 屬性內容除了傳統 HTML 的字串寫法外，
可以傳入一個定義了 style 內容的 JavaScript object。

property 要改成 camelCase 寫法，
與 DOM style JavaScript property 寫法一致，
這樣效率更高，並可防止 XSS 安全漏洞。

除了 `zoom`、`zIndex` 等沒有單位的屬性外，
React 會替 value 為 number 的屬性自動加上 `px`，
如要指定其他單位，可以 string 來撰寫，
瀏覽器引擎前綴除了 ms 外皆以大寫字母開頭
例如 `WebkitTransition`。

行內樣式範例：

```javascript
<App>
	<input type="text" style={{ 
		baclgroungColor:"#f66",
		fontSize: 15,
		height: '10%' 
	}} />
</App>
```

---

## 內部樣式
在文件內建立一個樣式物件，
然後使用 inline style 寫法引入該物件

```javascript
import React from 'react';

class Page extends React.Component{
	render(){
		let mystyle={
			width:'200px',
			height:'80px',
			backgroundColor:'yellow',
			fontSize:'24px',
			textAlign:'center'
		}
		return(
			<div style={mystyle}>This is Page1!</div>
		);
	}
}

export default Page;
```

---

## 外部樣式表（External style sheet）
引入外部 css文檔後，
即可直接加上 class 屬性來套用 css

```
import './style.css';

const App = () =>{
  return (
    <div className="wrap"> // 套用 style.css 中 .wrap 所定義的樣式
      我是網頁內容
    </div>
  )
}
```

在 React 中，使用 CSS class
通常比 inline style 效能更好，
style 屬性一般則被用作增加動態 style 的方式。

---

# CSS 處理方案
以下為可搭配 React 使用的 CSS 處理方案
- css-in-js：用 JavaScript 來寫 CSS
  - **style-component**（推薦）
- postcss：使用 JavaScript 轉換 CSS
  - autoprefixer（自動加入屬性瀏覽器前綴）
  - cssnext
  - postcss-modules
- sass
  - Creat React App 支持（但要另行安裝 sass）

### 其他
- classnames：輔助搭配，方便動態套用多個 class

---

## css-module
可以隨意命名 class，由套件協助處理
不用擔心會重複或污染全局

- 文件以[name].module.scss的方式命名
- 以變數形式導入
  `import myStyle from './mystyle.module.scss'`
- 以變數引用的方式添加
  `className = { myStyle.title }`
- 默認使用hash命名class，非hash用法：
  `:global(.wrap){
    color: green;
    background: red;
  }`
- class組合：一個css可以繼承另一個css的樣式
  - 同一文件內繼承
    `
    className {
    	color:green;
    	background: red;
    }
    .otherClassName {
    	compose: className;
    color: yellow;
    }
    `
  - 不同文件內繼承
    `
    .otherClassName {
    	compose: className from './another.css';
    color: yellow;
    }
    `
  - 可使用變數（要安裝PostCSS）

**css-module 和 sass 結合使用**
- css-module：不支持嵌套寫法
- sass：不支持雜湊（hash）命名

---

## postcss
使用 JavaScript 轉換 CSS 的工具
-   加入各家瀏覽器的前綴詞（prefix），例如：-webkit-、-moz-。
-   將先進的功能轉為目前主流瀏覽器所能支援的語法。
-   語法檢查和報錯。
-   支援 Grid System。
-   使用類似 SASS 的功能，例如：變數。

[PostCSS](https://cythilya.github.io/2018/08/10/postcss/)

常用插件：
- AutoPrefixer（CRA 默認支持）
- postcss-cssnext：可使用未來css語法（css4語法，比如`:root{ --mainColor: #ffc001; }`）
- cssnano：壓縮用，壓縮率多可達到50%
- postcss-sprites：將引用的多張圖片自動生成雪碧圖的插件

---

## CRACO 
React 預設不可拓展 webpack、babel 等套件，
使用 CRACO 即可自訂這些套件

---

## css-in-js
用 JavaScript 來寫 CSS

---

## style-component
[style-component 官網](https://styled-components.com/)

使用方法：
```
style(Component)`
  .styled-common-modal {
    background: rgba(0,0,0,0.5) !important;
  }
`
```

ES6 標籤模板語法：
```javascript
	const Title = styled.myH1`
		font-size: 1.5em;
		text-align: center;
		color: palevioletred;
	`
	<App>
		<Title>我是標題，自帶樣式</Title>
	</App>
```

CSS 嵌套語法：
```javascript
	const Title = styled.h1`
		font-size: 1.5em;
		text-align: center;
		> h2 {
			color: palevioletred;
		}
		> .content{
			width: 100%;
			height: 200px;
		}
	`
```

拓展 css-component：
```javascript
	const Title = styled.h1`
		font-size: 1.5em;
		text-align: center;
		color: palevioletred;
	`
	
	const ExtendTitle = styled(Title)`
		font-size: 1.8em;
		backgroung-color: gray;
	`
```

拓展 component 的 css：
```javascript
	const Link = ({ className, children }) => {
	<a className={className}>
		{children}
	</a>
	}
	const StyledLink = styled(Link)`
		color: palevioletred;
		font-weight: bold;
	`
```

---

## 參考資料：
- [Styling and CSS（React 官網）](https://zh-hant.reactjs.org/docs/faq-styling.html)
- [介紹撰寫React CSS的神套件Styled Components](https://kayshihdev.medium.com/%E4%BB%8B%E7%B4%B9%E6%92%B0%E5%AF%ABreact-css%E7%9A%84%E7%A5%9E%E5%A5%97%E4%BB%B6styled-components-77455c849198)
- [[note] styled-component 筆記](https://pjchender.dev/npm/npm-styled-components/)
