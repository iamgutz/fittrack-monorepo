import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App.tsx';
import './index.css';
import store from './app/store';
import AppProvider from '@/contexts/AppProvider.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ColorModeProvider from './contexts/ColorModeProvider.tsx';
import NotifyProvider from './contexts/NotifyProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ColorModeProvider>
                        <NotifyProvider>
                            <App />
                        </NotifyProvider>
                    </ColorModeProvider>
                </LocalizationProvider>
            </AppProvider>
        </Provider>
    </React.StrictMode>,
);
