import { ThemeContext } from './ThemeContext'
import { useState, useEffect } from 'react';
const colors = {
        blue: '#0d255b',
        green: '#16a34a',
        purple: '#9333ea',
        red: '#dc2626',
        orange: '#ea580c'
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