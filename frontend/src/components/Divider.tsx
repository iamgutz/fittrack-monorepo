import clsx from 'clsx';
import { ReactNode } from 'react';

interface DividerProps {
  children?: ReactNode;
  className?: string;
}

const before =
  'before:content-[" "] before:border-b before:border-slate-200 before:w-full before:block before:m-auto before:height-0 dark:before:border-gray-600';
const after =
  'after:content-[" "] after:border-b after:border-slate-200 after:w-full after:block after:m-auto after:height-0 dark:after:border-gray-600';

export default function Divider({ children, className }: DividerProps) {
  return (
    <div className={clsx(['relative flex', before, after, className])}>
      {children && <div className="px-2">{children}</div>}
    </div>
  );
}
