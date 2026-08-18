export const colors = {
    blue: '#0d255b',
    green: '#16a34a',
    purple: '#9333ea',
    red: '#dc2626',
    orange: '#ea580c'
};

export const defaultTheme = {
    mode: 'light',
    primaryColor: 'blue'
};

export function loadTheme(){
    const savedTheme = localStorage.getItem('theme');

    if(!savedTheme){
        return defaultTheme;
    }

    try{
        const theme = JSON.parse(savedTheme);

        const validModes = 
        theme.mode === 'light' ||
        theme.mode === 'dark';

        const validColors = Object.hasOwn(colors, theme.primaryColor)

        if(!validColors || !validModes){
            return defaultTheme;
        }

        return theme;
    } catch {
        return defaultTheme;
    }

}