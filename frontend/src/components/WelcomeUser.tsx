import clsx from 'clsx';

export default function WelcomeUser({
  profileName,
  username,
  className,
}: {
  profileName?: string;
  username?: string;
  className?: string;
}) {
  return (
    <span className={clsx(['flex flex-col items-start', className])}>
      {username && <span className="caption">Welcome, {profileName}</span>}
      {profileName && <span className="caption">{`@${username}`}</span>}
    </span>
  );
}
