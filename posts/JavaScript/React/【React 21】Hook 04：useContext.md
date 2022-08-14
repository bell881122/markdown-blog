---
title: '【React 21】Hook 04：useContext'
date: '2021-10-07'
tags: 'React.js,JavaScript'
coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


## useContext
useContext 本質上是 Context 的語法糖，
精簡了 Context 取得值的方式。

---

### 使用方法
useContext 會接收一個
「Context Object」作為參數
也就是 `React.createContext()` 的回傳值，
並回傳該 Context 目前的值。

```js
// ThemeContext.js
const ThemeContext = React.createContext();

// MyComponent.js
const value = useContext(ThemeContext);
```

Context 目前的值則取決於上層 component
**距離最近**的 `<ThemeContext.Provider>` 的 `value` prop。

```js
const App = () => {
    const [dark, setDark] = useState(true);
    
    return (
        <>
            <ThemeContext.Provider value={dark}>
              <MyComponent />
            </ThemeContext.Provider>
        </>
    );
}
```

當 component 上層最近的
`<ThemeContext.Provider>` 更新時，
useContext 會觸發重新 render，
並取得最新傳遞到 `ThemeContext` 裡的 `value`。

```js
// MyComponent.js
import { ThemeContext } from './App.js';

const ButtonGroupComponent = () => {
  const darkTheme = useContext(ThemeContext)
  
  const themeStyle = {
    backgroundColor: darkTheme ? '#2c3e50': '#f1c40f',
    color: darkTheme ? '#ecf0f1' : '#2c3e50'
  }
  
  return (
    <button style={themeStyle}>useContext</button>
  );
} 
```

> `useContext(ThemeContext)` 等同於 class 中的 `static contextType = ThemeContext` 或 `<ThemeContext.Consumer>`。

---

#### 完整使用範例
```js

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

---

### 總結
useContext 只能讓你**讀取** context 及訂閱其變更，
component tree 的上層仍然需要
使用 `<ThemeContext.Provider>` 來提供 context 的值。 

但 useContext 可以讓你免去使用 Consumer
包覆要接受資料的子元件，
而是將 `ThemeContext` 裡面的資料直接賦予給變數，
在存取時更加直觀方便。

---

## 參考資料
- [[React Hook 筆記] useContext](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usecontext-4bc289976847)
