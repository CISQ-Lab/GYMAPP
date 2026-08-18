import { ThemeContext } from './ThemeContext'
import { useState, useEffect } from 'react';
import { colors, defaultTheme, loadTheme } from '../config/theme';

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState( () => loadTheme());
    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            theme.mode === 'dark'
        );
    }, [theme.mode])

    useEffect(() => {

        document.documentElement.style.setProperty(
            '--color-primary',
            colors[theme.primaryColor]
        );

    }, [theme.primaryColor])

    useEffect(() => {localStorage.setItem('theme', JSON.stringify(theme))}, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export { ThemeContext, ThemeProvider };