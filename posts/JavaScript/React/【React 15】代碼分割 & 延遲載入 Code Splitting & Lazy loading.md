---
title: '【React 15】代碼分割 & 延遲載入 Code Splitting & Lazy loading'
date: '2021-10-01'
tags: 'React.js,JavaScript'
coverImage: ''
---


## 打包 Bundle
bundle 的英文原意是指將東西捆成一綑，
而在程式用語中
所謂的 bundle 即是將被 import 的檔案
合併成一個單一的檔案，
再將這個 bundle 檔案引入到
網頁內來載入完整的應用程式。

React 常見的 bundle 套件有：
- Webpack（Create React App、Next.js、Gatsby 內建）
- Rollup
- Browserify

---

## 代碼分割 Code Splitting
隨著應用程式成長，
bundle 也會隨之長大，
為了避免 bundle 的出來的檔案過大，
最好的解決問題的方式是開始
「split」這個 bundle 檔案。

Splitting 是 Webpack 等 bundler 支援的功能，
會建立多個 bundle，runtime 時再動態載入。

> Code-Splitting 目前已成為部分套件軟體預設功能，
> 使用 Create React App、Next.js 等套件打包時，
> 皆會自動對代碼執行 Code-Splitting。

---

## 延遲載入 Lazy loading
Code-splitting 可以「延遲載入」
目前使用者還不需要的東西，
避免載入使用不到的程式碼，
來減少初始載入應用程式的時間。

以下紀錄幾種延遲載入的方法：
- 動態 import（ES6）
- React.lazy
- loadable-components

---

### 動態 import（ES6）
加入前：
```
import { add } from './math';

console.log(add(16, 26));
```

加入後：
```
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

---

### React.lazy
- 不借助任何附加庫就能通過代碼分割（code splitting）延遲加載 React 組件
- 頁面級別的按需加載（只加載目前頁面需要使用的代碼）
- 使用 React.Suspense 時，Suspense 裡面必須要有 fallback，其內容是尚未加載完畢時頁面顯示的內容

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

> React.lazy 和 React.Suspense 尚不支持server render，如果要使用server render，可使用 loadable-components

---

### loadable-components

```
import loadable from '@loadable/component'

const MyComponent = loadable(()=> import('./MyComponent'));

function MyComponent(){ ... }
```

---

## 錯誤邊界
當 module 載入失敗時會觸發錯誤，
可以透過錯誤邊界處理這些錯誤
來呈現好的使用者體驗和管理恢復。

建立錯誤邊界後，
就可以在 lazy component 上層套用它，
讓網路發生錯誤時能主動顯示錯誤狀態。

```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

---

## Named Exports
React.lazy 目前只支援 default exports。
如果想 import 的 module 使用 named export，
可以建立一個中介 module 來重新 export 它，
以確保 tree shaking 不會 pull 無用的 component。

【ManyComponents.js】
```
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

【MyComponent.js】
```
export { MyComponent as default } from "./ManyComponents.js";
```

【MyApp.js】
```
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

---

## 參考資料
- [Code-Splitting（React 官網）](https://zh-hant.reactjs.org/docs/code-splitting.html)
