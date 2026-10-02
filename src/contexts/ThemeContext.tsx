import { createContext, useState, useContext } from "react";

const DEFAULT_THEME = '#6A1B9A'
const DEFAULT_MAIN_TEXT_COLOR = 'black'
const DEFAULT_TEXT_ICON_COLOR = 'white'
const DEFAULT_BACKGROUND_COLOR = '#F2F2F2'
const ThemeContext = createContext(DEFAULT_THEME)


const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState(DEFAULT_THEME)
    const [mainTextColor, setMainTextColor] = useState(DEFAULT_MAIN_TEXT_COLOR)
    const [textIconColor, setTextIconColor] = useState(DEFAULT_TEXT_ICON_COLOR)
    const [themeBackgroundColor, setThemeBackgroundColor] = useState(DEFAULT_BACKGROUND_COLOR)
    return(
        <ThemeContext.Provider value={{theme, setTheme, mainTextColor, setMainTextColor, textIconColor, setTextIconColor, themeBackgroundColor, setThemeBackgroundColor}}>
            {children}
        </ThemeContext.Provider>
    )
}


export { ThemeContext, ThemeContextProvider }