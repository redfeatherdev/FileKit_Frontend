import { useLocation, Link, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils/cn';

interface NextLinkProps extends LinkProps {
  className?: string;
  onClick?: () => void;
  href: string
}

export function LineMenuLink({
  children,
  onClick,
  className,
  ...props
}: React.PropsWithChildren<NextLinkProps>) {
  const pathname = useLocation().pathname;

  const isActive = pathname == props.to;

  return (
    <Link
      className={cn(
        'group relative md:pb-2 xl:pb-4',
        className,
        isActive &&
        'active-menu-link after:absolute after:left-0 after:bottom-0 after:h-[3px] after:translate-x-3 after:translate-y-[1px] after:w-[calc(100%-24px)] after:bg-steel-700 dark:after:bg-steel-100'
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex text-sm leading-6 transition-colors bg-transparent group-hover:text-steel-900 dark:group-hover:text-steel-100 relative px-3 py-2 rounded-md',
          isActive
            ? 'text-steel-700 dark:text-steel-100 font-medium'
            : 'text-steel-500 dark:text-steel-300'
        )}
      >
        {children}
      </span>
    </Link>
  );
}
