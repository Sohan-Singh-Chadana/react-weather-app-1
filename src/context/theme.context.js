import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext(); //? createContext method from reactJS
const THEME_KEY = "theme"; //? local Storage key name

//? themeprovider component
function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  //? theme value save in local Storage
  const saveThemeToLocalStorage = (theme) => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  };

  useEffect(() => {
    //? theme value get from local Storage
    const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY));
    if (savedTheme !== null) {
      setDark(savedTheme);
      return;
    }

    //? default theme from user device
    const isSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(isSystemThemeDark === true);
  }, []);

  //? return Themprovider component jsx
  return (
    <ThemeContext.Provider value={{ dark, setDark, saveThemeToLocalStorage }}>
      {children}
    </ThemeContext.Provider>
  );
}
//?export themeProvider and ThemeContext
export { ThemeProvider };
export default ThemeContext;
