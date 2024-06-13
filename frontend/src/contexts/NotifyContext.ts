import { createContext, useContext } from 'react';

export interface NotificationProps {
    key?: number;
    message: string;
    type: 'error' | 'info' | 'success' | 'warning';
}

interface NotifyContextProps {
    notifications: NotificationProps[];
    setNotifications: (notifications: NotificationProps[]) => void;
    notify: (notification: NotificationProps) => void;
    dismiss: (key: NotificationProps['key']) => void;
}

export const NotifyContext = createContext<NotifyContextProps>({
    notifications: [],
    setNotifications: () => {},
    notify: () => {},
    dismiss: () => {},
});

export const useNotify = () => useContext(NotifyContext);
