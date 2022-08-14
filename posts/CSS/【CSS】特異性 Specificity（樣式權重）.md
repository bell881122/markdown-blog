---
title: '【CSS】特異性 Specificity（樣式權重）'
date: '2021-09-23'
coverImage: ''
---

「特異性」是讓瀏覽器計算
哪個 CSS 屬性值
與某個 HTML element 最有關係，
然後套用該屬性。

比方說，如果 CSS 同時在兩處
定義了同一個 HTML element 的 `color`，
則會依照撰寫時的特異性（權重分數）
來決定該 HTML element 要套用哪個 `color`。


## CSS 特異性（樣式權重）排序
1. !important
2. 行內樣式（inline style）
3. id 選擇器（id selector）
4. class / attributes / 偽類選擇器（class / attribute / pseudo-class selector）
5. 元素 / 偽元素選擇器（type selector / pseudo-element selector）
6. `*`，全體選擇器（universal selector）


### 計算特異性的規則如下
- 等級 A：「id」選擇器的個數加總
- 等級 B：「class、attributes、偽類」選擇器個數加總
- 等級 C：「元素、偽元素」選擇器個數加總
- `*`，全體選擇器不計分
- **等級只能同級比較**，低等級無法疊加來超越更高的等級
- `inline style` 永遠會覆寫 stylesheets 中的樣式
- `!important` 擁有最高優先權，規則如下：
	- `!important` 在樣式中出現時，瀏覽器會直接套用，不計算特異性
	- 如果同時有兩個 `!important`，會進行選擇器的特異性計算
	- 如果兩個 `!important` 特異性相同，則後面聲明的樣式會覆蓋前面的樣式
	- 一個樣式只能使用一個 `!important` ，疊加沒有效果

> 如下的第二個 `!important` 是沒有意義的
> ```
>  color:blue !important !important;
> ```

### 特異性計算範例
```
*               /* A=0 B=0 C=0 -> 特異性分數 = 0-0-0 */
LI              /* A=0 B=0 C=1 -> 特異性分數 = 0-0-1 */
UL LI           /* A=0 B=0 C=2 -> 特異性分數 = 0-0-2 */
UL OL+LI        /* A=0 B=0 C=3 -> 特異性分數 = 0-0-3 */
H1 + *[REL=up]  /* A=0 B=1 C=1 -> 特異性分數 = 0-1-1 */
UL OL LI.red    /* A=0 B=1 C=3 -> 特異性分數 = 0-1-3 */
LI.red.level    /* A=0 B=2 C=1 -> 特異性分數 = 0-2-1 */
#x34y           /* A=1 B=0 C=0 -> 特異性分數 = 1-0-0 */
#s12:not(FOO)   /* A=1 B=0 C=1 -> 特異性分數 = 1-0-1 */
```


## 參考資料：
- [CSS Specificity / 權重](https://ithelp.ithome.com.tw/articles/10240444)
- [重新認識 CSS - Attribute selector (屬性選擇器)](https://titangene.github.io/article/css-attribute-selector.html)
- [Selectors Level 3](https://drafts.csswg.org/selectors-3/#context)
