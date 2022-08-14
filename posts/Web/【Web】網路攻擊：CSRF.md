---
title: '【Web】網路攻擊：CSRF'
date: '2021-09-26'

coverImage: ''
---

# CSRF / XSRF

CSRF 全稱 Cross Site Request Forgery，
中文為「跨站請求偽造」。
由於往往是使用者一個點擊就會造成攻擊，
又被稱作「one-click attack」。

CSRF 攻擊者會在普通的網路操作中埋下陷阱，
讓使用者在其毫無所覺之下執行非本意的操作，
以達成攻擊者的目的。

一種常見的模式是，
攻擊者通過某些技術手段欺騙使用者的瀏覽器，
去存取一個使用者曾經登入、已認證過的網站。

比方說使用者剛存取過銀行網站，
如果在此時遭遇 CSRF 攻擊，
由於瀏覽器曾經認證過，
登錄資訊又尚未過期，
所以被存取的網站會認為
是真正的使用者在操作而執行命令。

因為簡單的身分驗證只能保證
請求是**發自某個使用者的瀏覽器**，
卻不能保證請求本身是**使用者自願發出的**。
如果伺服器端沒有合適的防禦措施的話，
使用者即使存取熟悉的可信網站，
也有遭受攻擊的危險。

---

## 使用者方面的防禦
包含隱私信息的網頁不要保持登入狀態，
使用完畢後就登出。

---

## 瀏覽器方面的防禦

### 遵循同源政策
擋掉從別的 domain 來的 request，
讓一切行為盡可能在
同源政策（same-origin policy）下執行，
避免網站被嵌入任何惡意程式碼。

#### SameSite Cookie
- `Strict`模式：cookie 只允許 same site 使用，任何的 cross site request 都不會帶上 cookie
- `Lax` 模式：POST 方法的 form submit，或是只要是 POST, PUT, DELETE 這些方法，就不會帶上 cookie，但沒辦法擋掉 GET 形式的 CSRF

---

## Server 方面的防禦

### 圖形驗證碼、簡訊驗證碼
許多網路銀行轉帳時，
都會要求收簡訊驗證碼或圖形驗證碼，
以證明請求確實是由**使用者本人**發出，
以確保不會被 CSRF 攻擊。

這是有效的防禦方式，
但相對上也在一定程度上
造成使用者的負擔。

---

### CSRF token
預防 CSRF 另一種方法
是在 form 裡面加上一個隱藏的欄位，
資料 submit 時同時送出這個欄位的 token，
這個 token 的值由 server 隨機產生，
並存在 server 的 session 中。

按下 submit 之後，
server 比對表單中的 token
與自己 session 裡面存的是不是一樣，
是的話就代表這的確是
由使用者本人發出的 request。

由於 token 是由 server 產生，
並且每一段不同的 session 就更換一次。
攻擊者並不知道 token 值是什麼，也猜不出來，
自然就無法進行攻擊了。

要留意的是，如果 server 支持
跨來源（cross origin）的 request，
攻擊者就可以在他的頁面發起一個 request，
順利拿到這個 csrf token 並進行攻擊，
但前提是 server 接受這個 domain 的 request。

---

## 參考資料：
- [跨站請求偽造 - 維基百科](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
- [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
- [SameSite Cookie，防止 CSRF 攻击](https://www.cnblogs.com/ziyunfei/p/5637945.html)
