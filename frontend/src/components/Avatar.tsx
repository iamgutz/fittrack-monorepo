import React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import stringToColor from '@/utils/stringToColor';
import { useTheme } from '@mui/material';

const SIZES: Record<string, number> = {
    xs: 24,
    sm: 40,
    md: 56,
    lg: 72,
    xl: 88,
} as const;

function getStringAvatarProps(name: string) {
    const nameParts = name.split(' ');
    const first = nameParts[0] ? nameParts[0][0] : '';
    const second = nameParts[1] ? nameParts[1][0] : '';
    const initials = `${first}${second}`;
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${initials}`,
    };
}

const getOutlineProps = (size: number) => {
    return { border: `${Math.round(Math.ceil(size / 24))}px solid #fff` };
};

interface AvatarProps {
    src?: string | null;
    size?: keyof typeof SIZES;
    stringAvatar?: string;
    outline?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = '32', stringAvatar, outline }) => {
    const theme = useTheme();
    const imgSrc = src || undefined;
    const avatarSize = SIZES[size] || SIZES.sm;
    const stringAvatarProps: any = stringAvatar ? getStringAvatarProps(stringAvatar) : {};
    const outlineProps: any = outline ? getOutlineProps(avatarSize) : {};

    return (
        <MuiAvatar
            {...stringAvatarProps}
            src={imgSrc}
            sx={{
                ...stringAvatarProps.sx,
                ...outlineProps,
                width: avatarSize,
                height: avatarSize,
                fontSize: avatarSize / 2,
                color: theme.palette.mode === 'dark' ? 'background.default' : '#fafafa',
            }}
        />
    );
};

export default Avatar;
