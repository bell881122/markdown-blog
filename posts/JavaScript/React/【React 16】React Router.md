---
title: '【React 16】React Router'
date: '2021-10-02'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


## 一頁式網站 SPA
SPA 全名 Single Page Applications
只有一個 HTML 檔，其他都是框架編譯出來的
更改路徑時實際上是改變頁面中不一樣的地方，
即藉由 url 切換 component，
有別於傳統的多頁式網站（MPA，Multi-Page Applications）
使用上與應用程式更加相近。

---

## React Router
由於 React 本身主要是
用以實作使用者介面的 library
如果需要處理 url 切換頁面等路由行為
大多會搭配 React 官方開發的 React Router。

### React Router 與 React Router DOM
- React Router：實現路由的核心功能
- React Router DOM
	- 基於 React Router 實現在瀏覽器運行環境下的許多功能，如`Link`、`BrowserRouter`、`HashRouter`、`StaticRouter`等
	- 安裝 `react-router-dom` 時會自動一併安裝 `react-router`
	- 藉由操作 DOM 來改變 path

在實際操作中會搭配兩者使用，
以下介紹一些常見方法。

---

### BrowserRouter 與 HashRouter
- BrowserRouter
	- 使用 pushState 和 popState 事件搭建路由
	- 切換 url 時會發送 request
- HashRouter
	- 使用 window.location.hash 和 hashchange 事件搭建路由
	- **頁面路徑最前面會有個「#」**，切換 url 時不發送 request

---

### Route
設定彼此對應的路徑和元件

`<Route path="路徑" component={ 用來當頁面的元件名稱(不是標籤) } />`
- **path**：指定路徑
- **component**：要切換的 component
- exact：偵測路徑完全符合才會顯示該頁面（預設為部分符合就會跳轉）

#### 404 頁面
假如 Route 沒有寫 path 或是`path='*'`， 並且排在前面的Route都沒被吻合的話就會被渲染，可以拿來製作預設頁面（404 not found）

```
<Route path="*">
    <NoMatch404 />
</Route>
```

#### path
path 除了既定網址外也可接受參數
寫法為 `:參數名稱`
`<Route path="/:id" component={SecondPage}/>`

參數也能設定為可選，
即使沒給參數，
還是可以導向相同頁面
`<Route path="/:id?" component={SecondPage}/>`

#### 綁定元件的props
```
<Route path="/second" render={()=>{return( <SecondPage id={5}/> )}}/>
```
原本綁component的方式是透過React.creactElement的方式創造元件。而這種綁render的方式等同於你在Route的props中製造並呼叫一個「渲染的元件的function」

---

### 從 component 取得路由資料
- match：
- location：
- history：提供各種操作路由的函式

> Route 會將和你要求相符的參數整理成一個叫 match 物件，並放在該頁面 component 的 props 中。讀取該路徑參數的方法為 `props.match.params.id`

---

### Link 與 `<a>`
實際渲染時 `<Link>` 會轉成`<a>`，
並根據前端路由導向正確 href。
`<a>`的根路徑則無法根據前端 router 去更動，
而 Link 可以。

to 可以接受字串或是物件（location object）

字串
```
<link to="http://test.com" />
```

物件
```
<Link to{{
  pathname: '/product',
  search: '?sort=asc',
  hash: '#hash',
  state: { isMemeber: true }
}} />
```

---

### NavLink
透過activeClassName="active" ，來設定與當前URL吻合時的項目要套用active樣式 ，可以想成是進階版的link

```
<NavLink activeClassName="active" to="/b">b page</NavLink>
```

---

### Switch
讓第一個吻合url的component被渲染，如果沒有switch，所有吻合的component都會被渲染
Switch會把前面所提像是location這些傳給route元件的props傳給Layout，我們就能在Layout元件中根據不同路由參數呈現不同功能/樣貌

---

### Redirect
用來重新導向，不會改變原有的網址
```
<Redirect to="/intro" />
```

---

### IndexRoute
又被稱作默認路由，
適合用在建立巢狀路由。

如下範例所示，IndexRoute 組件沒有 path 屬性，
而是只有當其父路由的所有其他子路由
（IndexRoute 的所有兄弟路由）都沒有激活時，
才會成為父路由的 this.props.children 並顯示出來。

```
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Home from './modules/Home'
// ...
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/boys" component={Boys}>
          <Route path="/boys/:boyName" component={Boy}/>
      </Route>
      <Route path="/girls" component={Girls}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

---
### Index Links
如果使用 `<Link to="/">Home</Link>`
這個連結會始終處於激活狀態，
因為所有 URL 的開頭都是 `/`。

如果需要 Home 路由被渲染後才激活，
指向 `/` 連結，可使用 `<IndexLink>`。

```
<IndexLink to="/">Home</IndexLink>
```

---

## Histories
react router 的 History 方法主要有三種：
- browserHistory
- hashHistory
- createMemoryHistory

### browserHistory
主要推薦的 history 方法，
使用瀏覽器的 History API 來處理 URL，
最接近一般使用者習慣的 router。

### hashHistory
使用 URL 中的 hash（#）來創建路由，
網址會類似於 `example.com/#/some/path`。

不需要任何伺服器相關配置就可以使用，
適合剛入門的初學者，
但不推薦在實際網站中使用這種方式。

### createMemoryHistory
Memory History 無法在網址欄被操作或讀取，
適合用於測試或其他
如 React Native 的渲染環境。

與其他兩種 history 最大區別在於，
Memory History 會維護自己的 location，
並依賴瀏覽器來儲存 location 陣列。

---

## 參考資料
- [【React.js入門 - 27】 我要更多更多的分頁 - react-router-dom](https://ithelp.ithome.com.tw/articles/10226056)
- [[Day 24] React Router- 指路者](https://ithelp.ithome.com.tw/articles/10243368?sc=iThomeR)
- [react-router与react-router-dom有什么不同？](https://segmentfault.com/a/1190000022443557)
- [React Router有子路由使用IndexRoute設定首頁](https://ucamc.com/articles/318-react-router%E6%9C%89%E5%AD%90%E8%B7%AF%E7%94%B1%E4%BD%BF%E7%94%A8indexroute%E8%A8%AD%E5%AE%9A%E9%A6%96%E9%A0%81)
- [默认路由（IndexRoute）与 IndexLink - React Router 中文文档](https://react-guide.github.io/react-router-cn/docs/guides/basics/IndexRoutes.html)
- [Histories - React Router 中文文档](https://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html)
