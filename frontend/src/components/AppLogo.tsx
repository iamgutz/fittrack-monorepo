import clsx from 'clsx';
import { IoFitnessSharp } from 'react-icons/io5';

export default function AppLogo({
  className,
  iconClassName,
  textClassName,
}: {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={clsx(['h6 flex gap-2 items-center px-2', className])}>
      <IoFitnessSharp
        size={26}
        className={clsx(['text-blue-500', iconClassName])}
      />
      <span className={textClassName}>Fittrack</span>
    </span>
  );
}
