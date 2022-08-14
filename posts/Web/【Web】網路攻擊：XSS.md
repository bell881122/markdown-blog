---
title: '【Web】網路攻擊：XSS'
date: '2021-09-27'

coverImage: ''
---

XSS 全稱為 **Cross-site scripting**
中文為「**跨站腳本攻擊**」。

通常是指利用網頁開發時留下的漏洞，
巧妙地注入惡意指令代碼到網頁中，
讓使用者載入並執行攻擊者製造的網頁程式。
攻擊成功後，攻擊者可能可以存取更高的權限、
私密網頁、網頁 session 和 cookie 等各種內容。

攻擊者通常會另行架設一個網站，
收集被攻擊者的 cookie 或其他敏感資訊，
再透過 JavaScript 等在 client 端執行的程式碼，
把收集好的資料作為參數提交，
隨後以資料庫等形式記錄在攻擊者自己的伺服器上。

---

## XSS 的類型
- Stored XSS（儲存型）
- Reflected XSS（反射型）
- DOM-Based XSS（基於 DOM 的類型）

### Stored XSS（儲存型）
由保存在伺服器資料庫中的 JavaScript 代碼
引起的攻擊即為 Stored XSS，
最常見的就是可由使用者
任意輸入內容的論壇文章、留言板等。

若網站在接收 input 資料時沒有確實檢查，
使用者輸入如 `<script>` 等關鍵字
就會被當成正常的 HTML 執行。

### Reflected XSS（反射型）
不會被儲存在資料庫中，
而是讓網頁後端直接嵌入
前端使用者所傳送過來的參數達成攻擊。

最常見的就是以 GET 方法傳送資料給伺服器時，
若網頁後端未進行檢查過濾掉惡意字元，
攻擊者在 input 中藏入的非法參數，
就可能被伺服器視為一般的代碼來執行。

### DOM-Based XSS（基於 DOM 的類型）
DOM-Based XSS 是指
網頁的 JavaScript 在執行過程中，
沒有詳細檢查資料使得操作 DOM 的過程
被代入了惡意指令。

假如未妥善檢查 input 內容就代入的話，
輸入任意的內容都會被建立成有效的 DOM 物件，
包含嵌入的代碼也會被執行。

這種方法通常需要搭配前兩個手法，
讓內容保存在伺服器資料庫中，
或是以反射型的方式製造出內容，
再藉由 JavaScript 動態產生
有效的 DOM 物件來運行惡意代碼。

---

## 如何防範 XSS 攻擊

### Stored、Reflected 防範
這兩種都必須由後端進行防範，
除了必要的 HTML 代碼，
任何允許使用者輸入的內容都需要檢查。

檢查時需要刪除所有 `<script>`、`onerror=`
及其他任何可能執行代碼的字串。

若輸入內容最後只是純字串呈現的話，
基本上只要將內容全部換成
HTML 跳脫字元（escape character）即可。
	
### DOM-Based 防範
DOM-Based 必須由前端來防範，
但基本上跟前面的原則相同。

撰寫程式碼時應該選擇
正確的方法、屬性來操作 DOM。
如 `innerHTML` 此屬性
能夠插入合法的 HTML 字串，
因此輸入的字串就會被解析成 DOM 物件。
只要改為使用 `innerText`，
在插入字串時保證會轉為純粹的文字，
也就不可能被插入惡意代碼執行了。

---

### CSRF 與 XSS 的不同？
- CSRF 利用的是**網站對使用者**網頁瀏覽器的信任
- XSS 利用的是**使用者對指定網站**的信任

---

## 參考資料
- [跨網站指令碼 - 維基百科](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)
- [跨站腳本攻擊(Cross-Site Scripting, XSS)概述](https://www.gss.com.tw/images/stories/epaper_GSS_security/pdf/epaper_gss_security_0067.pdf)
- [【網頁安全】給網頁開發新人的 XSS 攻擊 介紹與防範](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
