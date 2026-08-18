import { colors, defaultTheme } from './theme';

const savedTheme = localStorage.getItem('theme');

const theme = savedTheme
    ? JSON.parse(savedTheme)
    : defaultTheme;

if (theme.mode === 'dark') {
    document.documentElement.classList.add('dark');
}

document.documentElement.style.setProperty(
    '--color-primary',
    colors[theme.primaryColor]
);