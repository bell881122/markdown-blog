---
title: '【React 01】React 簡介'
date: '2021-09-17'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

## 為什麼需要前端框架？
- 開發速度更快：可以使用 JavaScript 提供的功能（迴圈、條件判斷、變數）
- 資料驅動畫面：搭配開發者工具，更容易維護
- 程式邏輯架構清楚：更容易維護
- 瀏覽器效能更好：只變更畫面中有需要變更的部分

## 關於 React
- 由 Facebook 負責維護與開發
- 是一個輕量的 JS library
- 主要用來實作使用者介面（MVC 的 View部分）

### React 設計核心思想
1. 元件化 (Component-Based)
2. 宣告式 UI / JSX
3. 單向資料流 (Unidirectional data flow)
4. 使用 Virtual DOM
5. 大量使用高階元件（HOC）

### 生態圈
React 主要功能為打造 UI
常見的搭配套件有：
- react-router：配合 react 實現路由
- react-router-dom：react-router 的擴充套件，react-router 為核心功能，react-router 的內容為網頁擴充功能
- redux：熱門的 React 狀態管理套件，功能為 MVC 當中的 Model
- redux-saga：用以處理 react 非同步、不可預測的程式行為，補足 redux 只能使用 pure function 的問題
- dva：react + react-router + redux + redux-saga 多合一的套件，能夠以簡單的程式碼完成複雜的邏輯架構
