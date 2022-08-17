---
title: '【React 05】Data Flow 與 State'
date: '2021-09-21'
tags: 'React.js,JavaScript'
coverImage: ''
---

## Data Flow
中文直譯為資料流，
React 中文圈通常說法是
**單向資料流／單一資料流**，
如字面所述，表示 React 中
所有資料數據只能單向傳遞的機制。


## State
state 在 react 中的角色是保存資料
在資料處理中與 props 各分其職。

### state 與 props 的差異：
- props：是父元件傳給子元件的參數，不可更改（資料源頭是父元件）
- state：封裝在元件內部，只處理元件內部的資料（資料源頭是元件內部）

### state 的特性：
- 任何 state 總是由某個特定的元件所擁有
- 父或子元件都不會知道該元件的 state 狀態
- 任何 state 只能影響自身節點「以下」的元件，因此又被稱為「local state」

依照以上的邏輯，
被傳到某個元件內的 props 如果要更改內容，
應該將其轉換成 state，
變成單獨屬於該元件的 state 後，
按照「單向資料流」的規則來更改 state。

而如果將自己的 state 傳給子元件，
則該 state 會成為子元件的 props。


## 使用 State 的注意事項
1. 不可以直接修改 State，而是使用 setState
> 唯一可以指定 this.state 值的地方，僅有 class component 的 constructor
2. State 的更新可能是非同步的
3. State 更新的 Object 會被 Merge

### setState筆記
- 移除 State 某項值時，setState 中「存在但沒有被寫到的state」不會被移除，要移除的話，可以把該 state 指定為 undefined。
- 使用 setState 的時候如果新值和舊值相關，內容應傳入一個 function 而非表達式，讓原始 state 成為計算參數，以免非同步的關係不是取到最新的資料。
- setState 的第一個參數是原始 state，第二個參數則是每次 render 時更新的 props

#### set State 範例
```
// 錯誤
this.setState({
  counter: this.state.counter + this.props.increment,
});

// 正確
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```


## 參考資料
- [React 官網-State 和生命週期](https://zh-hant.reactjs.org/docs/state-and-lifecycle.html)
- [I Want To Know React - 初探提升 state](https://ithelp.ithome.com.tw/articles/10250923)
