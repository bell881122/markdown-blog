---
title: '【JS】Event Delegation 事件委派'
date: '2021-09-18'

coverImage: ''
---

所謂的 Event Delegation，又稱事件代理，
即是藉由事件傳遞減少監聽器數目，
是更優雅、乾淨、高效處理互動事件的一種方法。

## 事件傳遞
DOM 中的事件有傳播 (event flow) 的概念，當 DOM 事件發生時，事件會先由外到內 (capturing phase)、再由內到外 (bubbling phase) 的順序來傳播。

事件傳遞分為兩部分
- 捕獲 Bubbling
- 冒泡 Capturing

### DOM 的事件傳遞順序
- CAPTURING_PHASE 捕獲階段
- AT_TARGET 目標本身
- BUBBLING_PHASE 冒泡階段

## 事件處理 Event
- 使用互動事件時，函式只會收到一個參數，所以要使用`event.target.value`來接收真正的value
- 調用 preventDefault 來阻止標籤原生行為
-  阻止冒泡的方法
	-  e.stopPropagation();
	-  e.nativeEvent.stopImmediatePropagation();

## 相關函式：
### addEventListener
$target.addEventListener(EVENT: string, CALLBACK: function, USECAPTURE: boolean)
> USECAPTURE：預設為 false，表示事件在冒泡階段執行，設定為 true 則事件在捕獲階段執行。
> 當事件發生在 `AT_TARGET` 也就是目標身上時，事件不分冒泡捕獲，也就是 USECAPTURE 參數無效，先添加的程式先執行。

### stopPropagation
取消該 addEventListener 綁定的事件繼續傳遞

### stopImmediatePropagation
同時取消同一層級的所有事件傳遞

### preventDefault
- 取消瀏覽器的預設行為（比方說超連結跳轉），與 JS 綁定的事件傳遞無關
- preventDefault 的效果可被傳遞，在傳遞中被呼叫後，效果在之後的傳遞事件裡都會延續

## 參考資料
- [Event Delegation 事件委派](https://cythilya.github.io/2015/07/08/javascript-event-delegation/)
- [DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
- [D15 第七週 前端基礎 JavaScript - 事件傳遞](https://ithelp.ithome.com.tw/articles/10265609)
[JavaScript DOM Event (事件處理)](https://www.fooish.com/javascript/dom/event.html)
[07. [JS] 瀏覽器 DOM 元素的事件代理是指什麼？](https://ithelp.ithome.com.tw/articles/10219793)

