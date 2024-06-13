import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface Props {
    shouldBeUp: boolean;
    fontSize?: 'small' | 'medium' | 'large';
}

const ArrowUpDownIcon: React.FC<Props> = ({ shouldBeUp, fontSize, ...rest }) => {
    const Icon = shouldBeUp ? ArrowUpwardIcon : ArrowDownwardIcon;
    return (
        <Icon
            fontSize={fontSize}
            {...rest}
        />
    );
};

export default ArrowUpDownIcon;
