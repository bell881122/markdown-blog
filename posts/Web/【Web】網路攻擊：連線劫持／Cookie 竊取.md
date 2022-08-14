---
title: '【Web】網路攻擊：連線劫持／Cookie 竊取'
date: '2021-10-02'

coverImage: ''
---

## Cookie 竊取／連線劫持
英文為 Session Hijacking 或 Sidejacking
駭客通過破壞已建立的資料流實現劫持。

與 「中間人攻擊（Man-in-the-middle Attack）」類似，
連線劫持會欺騙伺服器或用戶端，
把上游的主機當成實際合法的主機，
上游的主機會由操控網路的攻擊者主機所取代，
讓攻擊者的主機看起來像是使用者所要的目的地，
藉此將使用者引導向完全不同的網站。

---

## 發生原因
- 未鎖定不合法的 Session IDs (no account lockout for invalid session IDs)
- 易於破解的演算法 (weak session-ID generation algorithm)
- 不安全的程式設計 (insecure handling)
- 連線永遠不過期 (indefinite session expiration time)
- 使用的 TCP/IP 連線有漏洞 (using TCP/IP are vulnerable)
- 資訊未加密 (do not work unless you use enryption)

---

## 預防方式
- 使用加密的工作階段交涉
- 使用加密的通訊通道
	- 使用 SSH 代替 Telnet、HTTP，或者乾脆使用 IPSec/VPN
- 監視網路流量
	- 如發現網路中出現大量的 ACK 包，則有可能已被進行了會話劫持攻擊。
- 持續取得平台補充程式以修正 TCP/IP 弱點，例如可預測的封包順序

---

## 參考資料：
- [連線劫持 - 維基百科](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D%E5%8A%AB%E6%8C%81)
- [連線劫持 (Session Hijack)](https://isp.nuu.edu.tw/p/405-1074-1305,c636.php)
- [[Day21]連線劫持-概念篇](https://ithelp.ithome.com.tw/articles/10194094)
- [Session Hijacking - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Session_Hijacking)
