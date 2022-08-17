---
title: '【React 06】生命週期 Lifecycle（Class Component）'
date: '2021-09-22'
tags: 'React.js,JavaScript'
coverImage: ''
---


React 元件擁有從產生、渲染
到被移除解放資源的各個階段
稱之為**生命週期（Lifecycle）**。

## Class Component 生命週期
- Mount：初始化階段（只執行一次）
- Update：組件更新階段
- Unmount：組件卸載階段（只執行一次）


### Mount
- constructor
- getDerivedStateFromProps
- render
- **componentDidMount**


### Update
- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- **componentDidUpdate**


### Unmount
- **componentWillUnmount**


## 生命週期方法
- constructor：創建 class component 時必定呼叫的方法，進行資料宣告、初始化、預備、函式綁定的地方
- getDerivedStateFromProps：初始化時、props 或 state 改變時執行
```
class App extends React.Component{
	...
	static getDerivedStateFromProps(props, state){
		return{
			age: 23
		}
	}
}
```
- shouldComponentUpdate：用於避免沒必要的更新，以達到優化效果
- render：將 HTML 輸出到 DOM
- getSnapshotBeforeUpdate：更新前執行，讓組件在DOM發生變化前捕獲一些信息（如滾動位置），用意是把更新前的最後一刻DOM的狀況紀錄下來
- **componentDidMount**：
	- 第一次渲染（安裝完畢）後唯一觸發的生命週期函數，**只會執行一次**
	- render 完畢後呼叫，用於處理數據，比方說傳入API資料，
```
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
> 一開始要就觸發的東西，一般都放在 componentDidMount 裡面執行。
- **componentDidUpdate**：組件更新完畢後執行
- **componentWillUnmount**：元件被移除時呼叫**一次**，進行一些收尾工作，比方說移除新增的元素、監聽事件與定時器
- componentDidCatch：捕獲組件錯誤信息
```
componentDidCatch(error, info)
```
- static getDerivedStateFromError：用以捕捉 component 產生的錯誤
```
class App extends React.Component{
	...
	async componentDidMount(){
		const user = await fetch("/api/user").then(res => json());
		this.setState({ user });
	}
}
```
- forceUpdate：直接調用render()強制重新渲染組件，包含子組件也會重新渲染

![生命週期參考圖片](https://miro.medium.com/max/3348/1*cEWErpe-oY-_S1dOaT1NtA.jpeg)
[生命週期參考圖片 | 圖片來源](https://twitter.com/dan_abramov/status/981712092611989509)


## 參考資料：
[【React.js入門 - 16】 React生命週期(1/4): Mount(上)- 在渲染以前](https://ithelp.ithome.com.tw/articles/10221346)
