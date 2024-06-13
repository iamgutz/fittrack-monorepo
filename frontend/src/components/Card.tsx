import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx([
        'flex flex-col rounded-2xl shadow-xs border border-gray-100 dark:border-gray-700',
        'bg-white dark:bg-gray-800',
        className,
      ])}
    >
      {children}
    </div>
  );
}
