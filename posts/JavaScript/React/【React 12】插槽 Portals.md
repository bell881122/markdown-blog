---
title: '【React 12】插槽 Portals'
date: '2021-09-28'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


Portals 是一種讓 children 可以 render 到
parent component DOM 樹以外 DOM 節點的方法，
適合拿來做彈窗等許多地方都會用到的組件。

---

## 使用 Portal
`ReactDOM.createPortal(child, container)`
- child 是任何可 render 的 React child
- container 則是要掛載的 DOM element
> createPortal 方法在 `react-dom` 而非 `react` 裡面

React 不會建立一個新的 div，
而是把第一個引數的子元素
渲染到 container 中。

---

### 使用範例
```
import { createPortal } from 'react-dom'

const PortalsComponent = () =>{
    return createPortal(
        <div>我是一些文字</div>,
		document.getElementById('root')
    )
}

class PortalsExample extends Component{
    render(){
        return(
            <>
                <PortalsComponent />
            </>
        )
    }
}

export default PortalsExample
```

---

### 彈窗範例
以下彈窗回傳的是一個
`createPortal` 所產生的元素
```
import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import style from './style/modal.module.scss'

class PopUp extends Component {
    render(){
        return createPortal(
            <div className={style.modal}>
                {this.props.children}
            </div>,
            document.getElementById('root')
        )
    }
}

export default PopUp
```

在而任意地方使用 `<PopUp>`
都不會受到父元件的影響
而是會 render 在根元素（`#root`）底下。
```
<PopUp>我是彈窗內容</PopUp>
```

---

### Portal 的事件冒泡（Event Bubbling）
不管某個 children component 是不是用 Portal 建立的
Parent component 都一樣可以捕捉
從底下元件 bubble 上來的 event

---

## 參考資料
- [Portal | React 官方文件](https://zh-hant.reactjs.org/docs/portals.html)
- [[Day 25] React Portal 任意門](https://ithelp.ithome.com.tw/articles/10244055?sc=rss.iron)
