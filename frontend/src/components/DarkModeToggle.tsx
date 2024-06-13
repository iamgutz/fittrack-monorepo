import { useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import { useColorModeContext } from '@/contexts/ColorModeContext';

const DarkModeToggle = () => {
    const { isDarkMode, setColorMode } = useColorModeContext();

    const updateStoredTheme = (color: string) => {
        localStorage.colorMode = color;
    };

    const handleSetColorMode = (color: 'light' | 'dark') => {
        setColorMode(color);
        updateStoredTheme(color);
    };

    const handleThemeToggle = () => {
        const newColorMode = isDarkMode ? 'light' : 'dark';
        handleSetColorMode(newColorMode);
    };

    useEffect(() => {
        const storedColorMode = localStorage.colorMode;
        if (storedColorMode) {
            handleSetColorMode(storedColorMode);
        // } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     handleSetColorMode('dark');
        } else {
            handleSetColorMode('light');
        }
    });

    return (
        <IconButton onClick={handleThemeToggle}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
};

export default DarkModeToggle;
