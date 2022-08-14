---
title: '【React 17】Hook 01：概述'
date: '2021-10-03'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


Hook 是 React 16.8 中增加的新功能，
補足了早期 Function Component 屬於纯函数
無法使用 lifecycle、state 方法的問題，
讓 Function Component 能夠取代 class 寫法，
且 Hook 的程式碼可讀性更高、更容易上手與維護。

React Hooks 的 hook 意思是鉤子，
即 component 本身盡量寫成純函數，
如果需要外部功能和副作用，
就用 hook 把這些功能「鉤」進來。

React 官方強調 Hoo不會取代舊有的 React 概念，
而是對既有概念如 state、context、refs 及 lifecycle 等
提供一個更直接的 API。

後面幾篇文章也會同時紀錄原有的 React 概念，
與衍伸出來的 Hook 放在一起進行說明。

---

## React hook 使用規則
- Hook 只能在**最上層** 的 scope 呼叫，迴圈、條件、嵌套函數中不可使用，如此才能確保每次 render 時程式的執行順序一致。
- 只能在 Function Component 中使用（class 元件無法使用 Hook，一般函式則只能使用自訂的 Hook）。
- Hook 的開頭皆為「`use`」（包含自訂 Hook），這個命名慣例能讓 React 的 linter plugin 在程式碼中找到 bug。

---

### 參考資料
- [React Hook Guide(1)](https://medium.com/@franklion1227/react-hook-guide-1-2c31a05e6d00)
- [React Hook Guide(2)](https://medium.com/@franklion1227/react-hook-guide-2-9c683a4af519)
- [React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)
- [Hooks.guide（提供許多封裝好的hook方法）](https://github.com/Raathigesh/hooks.guide)
