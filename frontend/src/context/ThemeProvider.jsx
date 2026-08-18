import { ThemeContext } from './ThemeContext'
import { useState, useEffect } from 'react';
const colors = {
        blue: '#0d255b',
        green: '#086f2e',
        purple: '#611aa3',
        red: '#c51717',
        orange: '#ee5511'
    }


function ThemeProvider({ children }) {
    const [theme, setTheme] = useState({
        mode: "light",
        primaryColor: "blue"
    });
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

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export { ThemeContext, ThemeProvider };