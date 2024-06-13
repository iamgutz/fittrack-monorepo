import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { type NotificationProps, NotifyContext } from './NotifyContext';

function SlideTransition(props: SlideProps) {
    return (
        <Slide
            {...props}
            direction="down"
        />
    );
}

const NotifyProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);

    const addNotification = (notification: NotificationProps) => {
        const key = notification.key || Date.now();

        // Prevent duplicating notifications
        const existingNotification = notifications.find(n => n.key === key);
        if (existingNotification) {
            return;
        }

        // display the last 4 notifications only.
        const prevNotifications =
            notifications.length < 3 ? notifications : notifications.slice(0, -1);
        setNotifications([{ ...notification, key }, ...prevNotifications]);
    };

    const removeNotification = (key: NotificationProps['key']) => {
        setNotifications(prev => prev.filter(n => n.key !== key));
    };

    return (
        <NotifyContext.Provider
            value={{
                notifications,
                setNotifications,
                notify: addNotification,
                dismiss: removeNotification,
            }}
        >
            <Stack
                flexDirection="column"
                gap={1}
            >
                {notifications.map(n => {
                    return (
                        <Snackbar
                            open
                            key={n.key}
                            autoHideDuration={6000}
                            onClose={() => removeNotification(n.key)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            TransitionComponent={SlideTransition}
                        >
                            <Alert
                                severity={n.type}
                                sx={{ width: '100%' }}
                                variant="filled"
                                onClose={() => removeNotification(n.key)}
                            >
                                {n.message}
                            </Alert>
                        </Snackbar>
                    );
                })}
            </Stack>
            {children}
        </NotifyContext.Provider>
    );
};

export default NotifyProvider;
