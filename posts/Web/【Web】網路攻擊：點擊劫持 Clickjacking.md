---
title: '【Web】網路攻擊：點擊劫持 Clickjacking'
date: '2021-10-03'

coverImage: ''
---

## 點擊劫持
**點擊劫持（Clickjacking）**技術又稱為
**界面偽裝攻擊（UI redress attack）**，
是一種將惡意程式隱藏在看似正常的網頁中，
並誘使使用者在不知情情況下點擊的手段。

### 攻擊原理
使用者被誘使點擊種下惡意程式的連結時，
該連結上其實覆蓋了一個隱藏的 `<iframe>`，
點擊該連結時，實際上是點選了隱藏的 `<iframe>`，
如果 `<iframe>` 內容是個 facebook 的「讚」按鈕，
用戶點到連結時，實際上是操作的是 facebook 的介面。
如 Twitter、Facebook 和 Paypal 等網站上，
都曾經發生過此種攻擊。

> 因鍵盤操作要重新定向較複雜，此類攻擊基本上僅影響點擊（滑鼠或手機上的）行為。

---

## 防禦方式

### X-Frame-Options
在 HTTP Header 加入 X-Frame-Options 屬性，
允許或禁止網頁載入 `<frame>` 與 `<iframe>`。

副作用是其他正常的網站
也無法在 frame 中顯示被禁用 frame 的網頁。

X-Frame-Options 有三種類型：
- DENY：始終禁止在 frame 中顯示此頁面。
- SAMEORIGIN：允許在和父網頁同源的 frame 中顯示此頁面。
- ALLOW-FROM domain：允許在特定父網頁的 frame 中顯示此頁面。

---

### Samesite cookie
`samesite cookie` 的特性
也可以阻止點擊劫持攻擊。

具有 `samesite` 特性的 cookie
僅能在網頁通過直接方式打開時發送，
而不能透過 frame 或其他方式下發送給網站。

如下當網站在其身分驗證 cookie 中
具有 `samesite` 特性時

```
Set-Cookie: authorization=secret; samesite
```

那當它在另一個網站中的 iframe 被打開時，
此類 cookie 將不會被發送，攻擊也就無法成功。

這種方法可以讓其他網站
輕鬆地在 iframe 中顯示原本就公開、
無需進行身分認證的頁面。

但 Samesite cookie 僅能防止使用 cookie 的攻擊，
如果像是通過檢查 IP 地址來防止重複投票的網站，
仍然會受到點擊劫持攻擊，
因為它並不使用 cookie 來進行身分認證。

---

## 參考資料：
- [點擊劫持 - 維基百科](https://zh.wikipedia.org/wiki/%E7%82%B9%E5%87%BB%E5%8A%AB%E6%8C%81)
- [什麼是點擊劫持（clickjacking）?](https://blog.trendmicro.com.tw/?p=8859)
- [点击劫持攻击](https://zh.javascript.info/clickjacking)
