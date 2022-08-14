---
title: '【Web】網路攻擊：SQL injection'
date: '2021-10-04'

coverImage: ''
---

SQL 是常見的資料庫語法，
許多網站都使用 SQL 語言來取得資料。

而所謂的 **SQL Injection** 又被稱為
SQL 注入、SQL 隱碼或 SQL 注碼。

即駭客透過修改 SQL 語句，
來改變原本的指令內容，
達成竊取／破壞資料的行為，
是一種發生在應用程式與資料庫之間的安全漏洞。

在設計不良的程式中，
若攻擊者在輸入的字串中夾帶 SQL 指令，
而網站又沒有進行字元檢查，
那麼這些夾帶進去的惡意指令，
就會被資料庫伺服器誤認為是
正常的 SQL 指令而被執行，
導致資料庫因此遭到入侵或是破壞。

> SQL Injection 並不只針對 Microsoft SQL Server，只要是支援處理 SQL 指令的資料庫伺服器，都有可能受到此種手法的攻擊。

---

## 常見的 SQL injection 攻擊手法
- 略過權限檢查（Authorization Bypass）
- 注入 SQL 子語法（Injecting SQL Sub-Statements into SQL Queries）
- 利用預存程序（Exploiting Stored Procedures）

---

### 略過權限檢查
假設今天有一段 query statement
要求使用者輸入帳號及密碼如下：

```
SELECT * FROM customers WHERE name =' -name- ' AND password = ' -password-'
```

statment 中有兩個參數值
`-name-` 與 `-password-`，
這時如果透過 `-name-` 所對應的 input 輸入

```
'OR 1=1 --
```

其中 `'` 是關閉 name 的 input 內容，
後面接上 `OR` 表示「或是」的條件，
而 `1=1` 這個判斷永遠返回 true，
再用 `--` 將後面的內容變成註解。

以上會使得整個 query statement 變成：

```
"SELECT * FROM customers WHERE name ='' OR 1=1 --' AND password = ' -password-'
```

由於後面的 `AND password = ' -password-'`
變成註解後便直接被略過，
如此一來判斷條件將永遠是 true，
使得攻擊者可以在不需驗證帳號密碼的狀況下
登入 DataBase 取得資料。

---

### 注入 SQL 子語法
攻擊者透過注入惡意的 SQL 的語法去改變資料庫，
比方說以下這段 malicious commands（惡意指令）。

```
// 瀏覽器送出以下 URL
// http://www.mydomain.com/products/products.asp?productid=123; DROP TABLE Products

// 伺服器會進行以下指令
SELECT ProductName, ProductDescription FROM Products WHERE ProductNumber = 123
DROP TABLE Products
```

在上面的 URL 在 `productid=123` 後面加了一個分號 `;`，
再加上 `DROP TABLE Products` 這個 sub command，
這將會命令 SQL server
將 Products 這個 Table 刪掉。

攻擊者也可以使用其他 query 方法
進一步去探索其他 table 中的資料，
如下方的 SQL query：

```
http://www.mydomain.com/products/products.asp?productid=123 UNION SELECT Username, Password FROM USERS
```

其中 `UNION` 能將兩個 `SELECT` 的結果
用一個結果集呈現出來，
而第二個 `SELECT` 是將 `USERS` 這個 Table 的 
`Username` 與 `Password` 呈現出來，
以竊取資料庫中存放的所有使用者的帳號密碼。

---

### 利用預存程序
Stored Procedures（預存程序）
是將又臭又長又常用的 SQL 語法
寫成一組程序並儲存起來的一種方法，
方便於後續呼叫相同程序時
不必再將完整個 SQL 語法重打一次。

攻擊者亦可透過呼叫這些 Stored Procedures
進而對 DataBase 進行攻擊，如下：

```
SomeAsp.asp?city=pune';EXEC master.dbo.xp_cmdshell' cmd.exe dir c:
```

上面的代碼中，程式收到要執行
`master.dbo.xp_cmdshell` 這個預存程序，
並在後面帶上參數  `cmd.exe dir c:`
代表想用預存程序執行這個檔案。

若是攻擊者將公司資料庫中
某項產品的價格調為 0 元，
或竄改政府機關資料庫報稅資料，
或是將某大廠物料庫存清單刪除，
不管哪項都將導致被攻擊者極大的損害。

---

## 防範方式
- 使用 Regular expression 驗證過濾輸入值與參數中惡意代碼。
- 將輸入值中的單引號置換為雙引號。
- 限制輸入字元格式並檢查輸入長度。
- 資料庫設定使用者帳號權限，限制某些管道使用者無法作資料庫存取。

---

## 參考資料：
- [SQL注入 - 維基百科](https://zh.wikipedia.org/wiki/SQL%E6%B3%A8%E5%85%A5)
- [[Postx1] 攻擊行為－SQL 資料隱碼攻擊 SQL injection](https://ithelp.ithome.com.tw/articles/10189201)
- [網站安全🔒 一次看懂 SQL Injection 的攻擊原理 — 「雍正繼位之謎」](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E6%B7%BA%E8%AB%87%E9%A7%AD%E5%AE%A2%E6%94%BB%E6%93%8A-%E7%B6%B2%E7%AB%99%E5%AE%89%E5%85%A8-%E4%B8%80%E6%AC%A1%E7%9C%8B%E6%87%82-sql-injection-%E7%9A%84%E6%94%BB%E6%93%8A%E5%8E%9F%E7%90%86-b1994fd2392a)
