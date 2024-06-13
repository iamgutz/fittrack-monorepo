import clsx from 'clsx';
import { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  className?: string;
}

interface SidebarItemProps extends BaseProps {
  active?: boolean;
}

const SidebarItem = ({ children, className, active }: SidebarItemProps) => (
  <li
    className={clsx([
      'flex items-center gap-3 rounded-lg p-2 text-base font-normal',
      'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
      active && 'bg-blue-200 hover:bg-blue-300 !text-blue-800 font-semibold',
      className,
    ])}
  >
    {children}
  </li>
);

const SidebarItems = ({ children, className }: BaseProps) => (
  <ul
    className={clsx([
      'mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700',
      className,
    ])}
  >
    {children}
  </ul>
);

const Sidebar = ({ children, className }: BaseProps) => (
  <div className={clsx(['h-full overflow-y-auto overflow-x-hidden px-3 py-4', className])}>
    {children}
  </div>
);

Sidebar.Items = SidebarItems;
Sidebar.Item = SidebarItem;
export default Sidebar;
