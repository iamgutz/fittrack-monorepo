import clsx from 'clsx';
import { ReactNode, forwardRef } from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
  notified?: boolean;
}

type Ref = HTMLButtonElement;

const IconButton = forwardRef<Ref, IconButtonProps>(
  ({ children, className, notified, ...rest }: IconButtonProps, ref) => (
    <button
      ref={ref}
      className={clsx([
        'relative h-10 w-10 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200',
        className,
      ])}
      {...rest}
    >
      {notified && (
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 absolute top-1/4 right-1/4" />
      )}
      {children}
    </button>
  ),
);

export default IconButton;
