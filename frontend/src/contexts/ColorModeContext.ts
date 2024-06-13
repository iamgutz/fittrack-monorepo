import { createContext, useContext } from 'react';

interface ColorModeContextProps {
    colorMode: 'light' | 'dark';
    setColorMode: (color: 'light' | 'dark') => void;
    isDarkMode: boolean;
}

export const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined);

export const useColorModeContext = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
