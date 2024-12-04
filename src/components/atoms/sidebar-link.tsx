import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils/cn';

interface SidebarLinkProps extends LinkProps {
  icon?: any;
  className?: string;
}

export function SidebarLink({
  icon,
  className,
  children,
  ...props
}: React.PropsWithChildren<SidebarLinkProps>) {
  const location = useLocation();
  const isActive = location.pathname === props.to;

  return (
    <Link
      className={cn(
        'flex items-center transition-colors gap-2 py-2 rounded-md border px-3 group outline-none focus-visible:border-steel-600',
        isActive
          ? 'bg-steel-100/70 text-steel-700 border-steel-100 font-medium dark:bg-steel-600/50 dark:border-steel-600/50 dark:text-white'
          : 'text-steel-700 hover:text-steel-900 border-transparent dark:text-white dark:hover:text-white/70',
        className
      ) || ''}
      {...props}
    >
      {/* {icon && <span className="icon">{icon}</span>} */}
      {children}
    </Link>
  );
}

export default SidebarLink;
