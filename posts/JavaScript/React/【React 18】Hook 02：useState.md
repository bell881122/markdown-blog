---
title: '【React 18】Hook 02：useState'
date: '2021-10-04'
tags: 'React.js,JavaScript'
coverImage: ''
---


useState 顧名思義，
在 function component 中，
其功能相當於 State，
用以管理元件內部私有的狀態資料

useState 的使用方式如下：

`const [變數, set變數] = useState(初始值)`

以下為使用範例
```
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

使用 useState 有以下幾個要點：
- 命名規則一般為 camel case
- useState 函式使用陣列解構賦值，useState 回傳陣列的第一個和第二個值，會分別賦值到 state 和 setState 兩個變數上
- 設定的初始值不限型別，可以是 string、number、array、object 或 callBack Function（必須要有回傳值）。因此當需要多個變數時，可依照需求呼叫多個 useState，或利用 array 跟 object 來統一管理
- 使用 useState 產生的變數遵守 JavaScript 規則為動態型別，如果需要限制型別，可搭配 TypeScript 等其他輔助工具。
- 更新時與 class component 合併原本的 state 不同，使用 useState 的 setState 更新 state 變數會直接取代原有變數。如果要保留其他未更動的變數，記得使用 `...` 引入其他變數（見以下範例）
```
setState(state => ({
    ...state,
    fruit: {
        ...prevState.fruit,
        apple: 2,
        banana: 4,
    }
}))
```

---

## 參考資料：
- [[React Hooks 學習筆記] useState、useEffect](https://medium.com/vita-for-one/react-hooks-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-usestate-useeffect-usecontext-b11c33e69bea)
