import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils/cn';
import { Flex } from '@/components/atoms/layout';
import SimpleBar from '@/components/atoms/simplebar';
import { SidebarMenu } from '@/components/organisms/sidebar-menu';
import { useResizableLayout } from '@/components/atoms/resizable-layout/resizable-layout.utils';

import { DrawerCloseButton } from './drawer-close-button';

export function Sidebar({
  className,
  isDrawer,
  defaultCollapsed = false,
}: {
  className?: string;
  isDrawer?: boolean;
  defaultCollapsed?: boolean;
}) {
  const { isCollapsed } = useResizableLayout(defaultCollapsed);

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        'z-30 h-full shrink-0 start-0 top-0 fixed w-[300px] py-1.5 pl-1.5',
        className
      )}
    >
      <Flex
        direction="col"
        className="border h-full rounded-md bg-steel-50/70 border-steel-100/50 dark:bg-steel-700 dark:border-steel-500/20"
      >
        <Flex
          justify="between"
          className="sticky gap-0 left-0 top-0 h-14 w-full pt-2 items-center justify-start px-6 bg-steel-50/70 dark:bg-steel-700 [&_.dark-mode-logo]:!opacity-0 dark:[&_.dark-mode-logo]:!opacity-100 dark:[&_.light-mode-logo]:!opacity-0 [&_.light-mode-logo]:!opacity-100 pl-[26px]"
        >
          <Link
            aria-label="Filekit Logo"
            to="/"
            className="relative inline-flex max-h-full text-3xl font-semibold shrink-0 outline-none focus-visible:opacity-90"
          >
            <span className={`dark:text-steel-100 dark:text-white text-[#141D25]`}>
              {isCollapsed ? 'F' : 'FileKit'}
            </span>
          </Link>
          {!!isDrawer && <DrawerCloseButton />}
        </Flex>

        <nav className="flex flex-col self-start flex-1 w-full h-full pt-4 overflow-x-hidden shrink-0 grow">
          <SimpleBar className="h-full w-full">
            <SidebarMenu
              defaultCollapsed={defaultCollapsed}
            />
          </SimpleBar>
        </nav>
      </Flex>
    </aside>
  );
}
