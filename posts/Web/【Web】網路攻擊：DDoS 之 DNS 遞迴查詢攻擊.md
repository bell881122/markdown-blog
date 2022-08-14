---
title: '【Web】網路攻擊：DDoS 之 DNS 遞迴查詢攻擊'
date: '2021-09-29'

coverImage: ''
---

## 遞迴查詢 Recursive Query
『遞迴查詢』（Recursive Query）是指
當某個 DNS 伺服器收到查詢訊息後，
如該筆資料並未登錄在伺服器上，
該伺服器就必須向其它伺服器查詢。

它會經由其它伺服器得知另一個查詢的地方，
而被詢問的伺服器再向另一部伺服器查詢，
如此反覆而得到查詢資料的動作，稱之為遞迴查詢。

---

## 什麼是 DNS 遞迴查詢攻擊
DNS 遞迴查詢攻擊是一種存在於
DNS 名稱伺服器（NameServer）上的型態漏洞，
可以讓駭客用來發動分散式阻斷服務（DDoS），
如果與其他的 DNS 攻擊手法搭配運用，
這項漏洞能放大攻擊效果超過一千倍。

該攻擊手法的途徑，
主要是駭客先滲透已經授權的 NameServer，
向遞回 DNS 伺服器發動攻擊，
造成這些伺服器大量向
目標 DNS 名稱伺服器發出請求，
進而造成這臺伺服器癱瘓而無法提供服務。

---

## 參考資料：

- [關於DNS的遞迴查詢攻擊與防護](http://kawsing.blogspot.com/2014/09/dns.html)
- [研究人員發現DNS查詢遞迴漏洞，影響多數DNS伺服器，企業應儘速採取修補作業](https://www.ithome.com.tw/news/137777)
- [TCP/IP 與 Internet 網路：第十三章 網域名稱系統 ](http://www.tsnien.idv.tw/Internet_WebBook/chap13/13-5%20DNS%20%E5%8D%94%E5%AE%9A%E9%81%8B%E4%BD%9C.html)
