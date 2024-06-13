import { ReactNode } from 'react';
import clsx from 'clsx';

interface NavBarProps {
  children: ReactNode;
  className?: string;
}

const NavBar = ({ children, className }: NavBarProps) => {
  return (
    <nav
      className={clsx([
        'bg-white px-2 py-2 dark:border-gray-700 dark:bg-gray-800 sm:px-4 rounded-2xl h-16',
        className,
      ])}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between h-full gap-3">
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
