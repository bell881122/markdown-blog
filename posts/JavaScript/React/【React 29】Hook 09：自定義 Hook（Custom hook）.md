---
title: '【React 29】Hook 09：自定義 Hook（Custom hook）'
date: '2021-10-15'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

## 打造自己的 Hook
自 React 16.8 以後，
使用者就可以在 React 中
創建自定義的 Hook，
將重複使用的功能模組化、
封裝常用的業務邏輯，
利用其他 Hook 打造自己的 API。

---

## 關於 Custom hook
- 是一個 JavaScript function
- 擁有自己的 state
- 內部可呼叫、自行組合所有原生 Hook，甚至是另一個 Custom hook
- **必須**以「use」為開頭命名
	- 如果沒有這個開頭，React 無法知道裡面包含對 Hook 的呼叫，因此無法自動檢查是否有違反 Hook 的行為

自定義的 Hook 是一個遵循 Hook 規則
可重複使用的 function。

Custom hook 不包含 UI，
不需要額外創建一個 component，
Custom hook 的內部擁有獨立的 state，
且可自行決定傳入的參數與回傳值
（或者也可以沒有回傳值），
並同樣能夠使用其他 Hook。

如果有個常用的 function，
但不需要在 DOM 上渲染任何東西，
Custom hook 會是一個很好的選擇。

---

### 使用範例
【useFriendStatus.js】
```
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

【FriendStatus.js】
```
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
【FriendListItem.js】
```
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

---

## 參考資料
- [Custom Hook | 官方文件](https://zh-hant.reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook)
- [【React.js入門 - 24】 Custom hook - 給我另一個超推React hook的理由](https://ithelp.ithome.com.tw/articles/10224881)

---

## 總結：
今年的鐵人賽就在此完賽了，
這 30 天日更，剛好把 React 的部分結束，
（或者說.....居然才把 React 的部分寫完？）
之後就再陸續把 Redux 與其他周邊套件補上吧。

接觸 React 到現在剛好滿一年，
也成為了資歷兩年多的 junior engineer，
接下來也繼續努力探索前端的世界囉。
