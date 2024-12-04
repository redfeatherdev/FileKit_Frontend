import { Link } from 'react-router-dom';
import { Box, Flex } from '@/components/atoms/layout';
import { AuthDropdown } from '@/components/molecules/auth-dropdown';
import PageName from '@/components/molecules/page-name';
import { TopBarPanel } from '@/components/molecules/topbar-panel';
import { HamburgerButton } from '@/components/organisms/hamburger-button';

import { Sidebar } from './sidebar';

export default function Header() {
  return (
    <Box className="sticky top-0 px-0 right-0 z-50 w-full bg-white dark:bg-steel-900 h-16 min-h-16 lg:h-[76px] lg:min-h-[76px]">
      <Flex
        justify="between"
        className="w-full h-full gap-0 border-b border-steel-100 dark:border-steel-600/60"
      >
        <HamburgerButton
          className="inline-block xl:hidden"
        >
          <Box className="h-[100dvh]">
            <Sidebar
              isDrawer
              className="pr-0 pl-0 py-0 h-full [&>.flex]:h-[100dvh]"
            />
          </Box>
        </HamburgerButton>
        <Link
          aria-label="Filekit Logo"
          to="/"
          className="relative inline-flex max-h-full text-2xl font-semibold shrink-0 outline-none focus-visible:opacity-90 xl:hidden"
        >
          <span className={`dark:text-steel-100 dark:text-white text-[#141D25]`}>
            FileKit
          </span>
        </Link >
        <Flex justify="between" className="flex items-center w-full gap-6">
          <PageName />
          <Flex justify="end" className="items-center gap-3 lg:gap-5">
            <TopBarPanel notificationCount={'0'} />
            <div className="flex items-center justify-center gap-1.5">
              <AuthDropdown />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
