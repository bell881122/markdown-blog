---
title: '【Web】Websocket、Polling 與 SSE'
date: '2021-09-21'

coverImage: ''
---

# WebSocket

HTTP 協議中，只能由 Client 端發出請求
如果要由 Server 端主動發出請求讓 Client 端接收
基本上有以下幾種方法：

- WebSocket
- Polling
- Long Polling
- SSE（Server-Sent Events）
- Comet

## WebSocket 是什麼？
- 一種建立於 TCP 協議之上的網路傳輸協定
- 解決 HTTP 協議僅能由 Client 單向請求的問題，可提供雙向的資料傳輸
- Client 與 Server 完成一次交握，就可以建立永續性的連接
- 在握手階段（handshake)採用 HTTP 協議，與 HTTP 協議有良好的兼容性
- 協議標示符是ws（如果加密，则为wss）
```
ws://[example.com](http://example.com/):80/some/path
```

## WebSocket 的特點
### 優點
- 資料交換效率高
- 節省資源
- 即時性佳
### 缺點
- 部分瀏覽器有支援度問題
- 伺服器維護成本較高


# Polling 輪詢
一種CPU決策如何提供週邊裝置服務的方式，又稱「程式控制輸入輸出」（Programmed I/O）。

藉由不斷呼叫 function 來達成資料即時交換，分成  `Polling` 與 `Long Polling` 兩種

**Polling**
相隔固定的時間呼叫一次

**Long Polling**
在 function 返回後再次呼叫該 function
目前 Facebook、Plurk 實現動態更新的方法

Polling的特點：
- 優點：實作簡單、支援度高
- 缺點：很耗資源、無法即時響應


# SSE（Server-Sent Events）
是 HTML5 標準的 API，在 Client 連接至 Server 後，透過 Http 協定主動將資料推送至 Client，並且不會斷開連接

優點：
- 可自訂資料格式
- 可設定重新連線時間
- 可自訂事件名稱

SSE 的特點：
- 優點：節省資源、支援度高
- 缺點：無法即時響應


## npm 
- [ws](https://github.com/websockets/ws)
- [Socket.IO](https://socket.io/)


## 參考資料
- [JavaScript - Polling、WebSocket 與 SSE 介紹](https://ithelp.ithome.com.tw/articles/10230335)
- [獲得實時更新的方法（Polling, Comet, Long Polling, WebSocket）](https://blog.niclin.tw/2017/10/28/%E7%8D%B2%E5%BE%97%E5%AF%A6%E6%99%82%E6%9B%B4%E6%96%B0%E7%9A%84%E6%96%B9%E6%B3%95polling-comet-long-polling-websocket/)
- [JavaScript | WebSocket 讓前後端沒有距離](https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b)
- [HTML5 WebSocket](https://www.runoob.com/html/html5-websocket.html)
