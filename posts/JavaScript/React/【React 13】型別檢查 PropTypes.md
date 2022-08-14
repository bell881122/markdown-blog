---
title: '【React 13】型別檢查 PropTypes'
date: '2021-09-29'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


在 React 中，可以使用 React 配套插件
propTypes 來檢查型別。

## PropTypes 主要功能
- 定義 component prop 的型別
- 檢查 component 的 prop 型別是否正確（僅在 React development 模式下執行），如果型別不正確，會在 console 丟出警告

### 安裝指令
```
npm install --save prop-types
```

---

## 使用方式

### 從元件外部導入
引入 PropTypes 之後
就可以從已宣告的 component 上
直接使用 propTypes 屬性
```
import PropTypes from 'prop-type';

class App extends React.Component{
	render(){
		return(){
			<h1>姓名：{this.props.name}</h1>
			<h1>年紀：{this.props.age}</h1>
		}
	}
}

App.propTypes = {
	name: PropTypes.string,
	age: PropTypes.number,
}
```

### 在元件內部使用
也可以在 class component 裡
用 static 方式宣告
```
import PropTypes from 'prop-type';

class App extends React.Component{
	static propTypes = {
		name: PropTypes.string
	}
	
	render(){
		return(){
			<h1>{ this.props.name}</h1>
		}
	}
}
```

---

## 使用 PropTypes 物件注意事項
- 每個 key 都要對應到 prop 包含的屬性名稱
- 每個 value 則定義 component prop 的型別，通常使用 PropTypes 本身提供的函式（如　`PropTypes.string`、`PropTypes.number` 等）
- PropTypes 提供的型別函式，本質上是一個 validator function，會使用型別檢查器來檢查 component props 的型別
- PropTypes 也可以使用 `isRequired` 屬性，用來定義是否必須提供某個 prop

isRequired 範例：
```
App.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	age: PropTypes.number,
}
```

---

## 參考資料
- [I Want To Know React - PropTypes & DefaultProps](https://ithelp.ithome.com.tw/articles/10253299)
