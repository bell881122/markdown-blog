---
title: '【Web】跨來源資源共用 CORS'
date: '2021-09-25'

coverImage: ''
---

CORS 全稱 Cross-Origin Resource Sharing，
中文為「跨來源資源共用」。

由於現今網路上許多頁面所載入的資源，
都來自與所在位置分離的網域，
當使用者代理請求一個非同源的資源時，
基於安全性考量，
會建立一個跨來源 HTTP 請求（cross-origin HTTP request），
以對非同源的資源請求進行限制。

如 `XMLHttpRequest` 及 `Fetch API` 
都遵守同源政策。
存取跨來源資源時必須使用 CORS 標頭，
否則就只能請求與應用程式同源的 HTTP 資源。

---

### 同源政策（same-origin policy）
達成同源的三個條件：
- 相同的通訊協定（protocol），即 http / https
- 相同的網域（domain）
- 相同的通訊埠（port）

---

### 跨來源請求
當請求的資源非同源時，
會在請求中加入新的 HTTP 標頭，
讓伺服器能夠描述來源資訊，
以提供瀏覽器讀取。

針對會造成副作用的 HTTP 請求方法，
規範要求瀏覽器必須要請求傳送
「預檢（preflight）」請求。

---

### 簡單請求（Simple requests）
不會觸發 CORS 預檢的請求類型

僅允許下列 HTTP 方法：
- GET
- POST
- HEAD (en-US)

僅允許下列  Content-Type：
-   application/x-www-form-urlencoded
-   multipart/form-data
-   text/plain

---

### 預檢請求／非簡單請求（Preflighted request）
只要不符合簡單請求的條件，
就會進行「預檢（preflighted）」請求。

預檢會先以 HTTP 的 OPTIONS 方法
送出請求到另一個網域，
確認後續實際（actual）請求是否可安全送出。

由於跨站請求可能會攜帶使用者資料，
所以要先進行預檢請求。
如果預檢沒有通過，
瀏覽器就不會發送 Request。

會觸發預檢的請求方法（簡單請求之外的方法）：
- PUT (en-US)
- DELETE (en-US)
- CONNECT
- OPTIONS (en-US)
- TRACE (en-US)
- PATCH (en-US)

---

##### CORS 實作參考
```
const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}
```

---

## 參考資料
- [跨來源資源共用（CORS）- MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
- [[教學] CORS 是什麼? 如何設定 CORS?](https://shubo.io/what-is-cors/)
- [[Day 27] Cross-Origin Resource Sharing (CORS)](https://ithelp.ithome.com.tw/articles/10251693)
- [基于Chrome插件实现支持CORS的本地开发代理](https://blog.csdn.net/weixin_34162401/article/details/91460340)
