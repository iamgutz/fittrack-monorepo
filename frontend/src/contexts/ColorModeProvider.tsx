import { ThemeProvider, TypeBackground, createTheme } from '@mui/material';
import React, { ReactNode, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext } from './ColorModeContext';

interface Props {
    children: ReactNode;
}

export const ColorModeProvider: React.FC<Props> = ({ children }) => {
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
    const isDarkMode = colorMode === 'dark';

    const theme = useMemo(() => (colorMode === 'dark' ? darkTheme : lightTheme), [colorMode]);

    return (
        <ColorModeContext.Provider
            value={{
                colorMode,
                setColorMode,
                isDarkMode,
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ColorModeProvider;

export interface CustomTypeBackground extends TypeBackground {
    highlightedPaper: string;
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#201619',
            paper: '#1b1113',
            highlightedPaper: '#311f22',
        } as CustomTypeBackground,
        primary: {
            main: '#FF1663',
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#e7e0d7',
            paper: '#FAFAFA',
            highlightedPaper: '#fff9e3',
        } as CustomTypeBackground,
    },
});
