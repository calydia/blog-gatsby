import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
        if (mode === 'light') {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        }
    };

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light');
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
/*         if (localTheme === null ) {
            document.body.classList.add('light');
        } else {
            document.body.classList.add(localTheme);
        } */
    }, []);
    return [theme, themeToggler]
};
