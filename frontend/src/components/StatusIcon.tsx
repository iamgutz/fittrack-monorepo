import clsx from 'clsx';
import {
  MdCheckCircleOutline,
  MdOutlineErrorOutline,
  MdWarningAmber,
  MdInfoOutline,
} from 'react-icons/md';

const VARIANTS = {
  success: {
    icon: MdCheckCircleOutline,
    colorClass: 'text-green-500',
  },
  failure: {
    icon: MdOutlineErrorOutline,
    colorClass: 'text-red-500',
  },
  warning: {
    icon: MdWarningAmber,
    colorClass: 'text-amber-500',
  },
  info: {
    icon: MdInfoOutline,
    colorClass: 'text-sky-500',
  },
};

export type StatusIconVariant = 'success' | 'failure' | 'warning' | 'info';

interface StatusIconProps {
  variant: StatusIconVariant;
  className?: string;
}

export default function StatusIcon({ variant, className, ...rest }: StatusIconProps) {
  const variantOption = VARIANTS[variant] || VARIANTS.info;
  const Icon = variantOption.icon;
  return (
    <Icon
      className={clsx([variantOption.colorClass, className])}
      size={16}
      {...rest}
    />
  );
}
