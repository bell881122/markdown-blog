---
title: '【React 09】列表 List 與 key'
date: '2021-09-25'
tags: 'React.js,JavaScript'
coverImage: ''
---


### 簡單的 React 列表範例
```
const uli = {
  <li>1</li>
  <li>2</li>
  <li>3</li>
}

return (<div>{ uli }</div>)
```

---

## 使用 map 涵式 Render 多個 Component
- 在 React 中，每個迭代的 element 最外層都必須加上 key 值，以識別哪個項目被修改、添加或轉移了
- 如未加上 key 值，頁面會報錯或無法顯示
- key 的值必須是同級（Sibling）能夠識別的唯一值

```
return (
  <div>{
    array.map(item=>
	  <div key={ item.id }>
	     <h2>標題：{ item.title }</h2>
	     <p>{ item.content }</p>
	  </div>
	)

  }</div>)
```

---

### 使用 index 作為 key 值
當 render 的項目沒有固定 ID 時，
可以使用項目的索引做為 key。
```
const todoItems = todos.map((todo, index) =>
  // 請在項目沒有固定的 ID 時才這樣做
  <li key={index}>
    {todo.text}
  </li>
);
```

- 只要有其他可辨識的唯一值，就盡量不要用 index 來當作 key 值
- 如果項目的順序改變，使用 index 時 diff 會變慢，對效能產生不好的影響
- 使用 index 作為 key 值，也可能會讓 component state 產生問題
> component instance 是基於 key 來決定是否更新以及重複使用，如果 key 是一個索引值，那麼修改順序時會修改目前的 key，導致 component 的 state（例如不受控制輸入框）可能相互篡改導致無法預期的變動

---

## 參考資料
[Keys | React 官方文件](https://zh-hant.reactjs.org/docs/reconciliation.html#recursing-on-children)