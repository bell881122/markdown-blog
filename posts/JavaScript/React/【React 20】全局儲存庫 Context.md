---
title: '【React 20】全局儲存庫 Context'
date: '2021-10-06'
tags: 'React.js,JavaScript'
coverImage: ''
---


# Context
Context 是 React 提供的一個 API
其功能有：
- 統一存放共用參數，實現全局資料管理
- 某層子元件需要使用時才調用，免去 props 傳遞
- 讓不同組件可彼此傳遞資料

---

## 使用方式
使用 `createContext()` 建立一個 Context 物件，
回傳的物件中包含兩個子元件：
- Provider：用來傳遞資料
- Consumer：用來接收資料
```
const testContext = React.createContext();
const { Provider, Consumer } = testContext;
```

---

### Provider：傳入資料
```
// App.js
export const ThemeContext = React.createContext() 

const App = () => {
    const [dark, setDark] = useState(true);
    
    return (
        <>
            <ThemeContext.Provider value={dark}>
              <FunctionComponent />
              <ClassComponent />
            </ThemeContext.Provider>
        </>
    );
}
```

產生了 Context 物件後
就可以呼叫它的 Provider，
被 Provider 包覆的子元件，
以及這些元件的子元件
都能接收到 value 這個參數，
而不需要在使用 props，
可避免產生複雜的巢狀結構。

---

#### 使用多個 Context
而如果需要多個 Provider，
可以一層層包在外面，
讓資料傳遞進去。

```
// ThemeProvider.js
const ThemeContext = React.createContext();
const ThemeUpdate = React.createContext();

const ThemeProvider = ({children}) => {
  const [dark, setDark] = useState(true);
  
  const changeTheme = () => {
    setDark(prevDark => !prevDark)
  }
  
  return (
    <ThemeContext.Provider value={dark}>
      <ThemeUpdate.Provider value={changeTheme}>
        {children}
      </ThemeUpdate.Provider>
    </ThemeContext.Provider>
   )
}


// App.js
const App = () => {
  return (
    <ThemeProvider>
      <FunctionComponent />
      <ClassComponent />
    </ThemeProvider>
  )
};
```

---

### Consumer：接收資料
在需要使用 value 的地方
引入 Context 物件與 Consumer，
如此 Consumer 底下的範圍內，
便都能自由使用 Provider 傳入的變數。

```
// ButtonGroupComponent.js
import { ThemeContext } from './App.js';

const ButtonGroupComponent = () => {
   const themeStyle = (dark) => {
      return {
        backgroundColor: dark ? '#2c3e50': '#f1c40f',
        color: dark ? '#ecf0f1' : '#2c3e50'
      }
    };
  return (
    <ThemeContext.Consumer>
      { dark =>
        <button style={themeStyle(dark)}>Class Component</button>
      }
   </ThemeContext.Consumer>
  );
} 
```

---

## 參考資料
- [[React Hook 筆記] useContext](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usecontext-4bc289976847)
