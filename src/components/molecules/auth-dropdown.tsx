import { useLocation } from 'react-router-dom';
import {
  RiLogoutBoxLine,
  RiArrowDownSLine
} from 'react-icons/ri';
import { Avatar, Button, Dropdown } from 'rizzui';

import { Box } from '@/components/atoms/layout';
import { useAuthStore } from '@/lib/store/main.store';

export function AuthDropdown() {
  const pathname = useLocation().pathname;
  const { user, logOut } = useAuthStore() as { user: any, logOut: () => void };

  const userImage = user?.image ? user?.image : '/assets/avatars/avatar7.webp';

  return (
    <Box className='flex items-center border rounded-lg bg-[#F1F5F9] border-custom-border/30 dark:bg-steel-600/50 dark:border-steel-600 p-2'>
      <Dropdown
        className="!h-8 md:!h-9"
        placement="bottom-end"
        shadow="xl"
        key={pathname}
      >
        <Dropdown.Trigger
          className="h-8 md:h-9"
          role="button"
          aria-label="auth dropdown button"
          as="button"
        >
          <Button as="span" variant="text" className="flex items-center gap-4 h-8 md:h-9 p-0">
            <div className='flex items-center gap-2.5'>
              <Avatar
                name='avatar'
                src={userImage}
                className="ring-1 ring-muted rounded-md md:rounded-lg ring-offset-background flex ring-offset-2 [&_img]:ring-steel-100 !w-8 !h-8 md:!w-9 md:!h-9"
              />
              <span
                className='max-w-[15ch] truncate overflow-x-hidden'
              >
                {user?.name}
              </span>
            </div>
            <RiArrowDownSLine
              size={20}
              className='ml-2 -mr-1 text-steel-400 group-hover:text-steel-900 dark:text-white dark:group-hover:text-white/80'
            />
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Menu className="space-y-1 mt-1.5 ml-2 border dark:border-steel-600/60 w-52 dark:bg-steel-700 dark:text-steel-300 border-steel-200/60">
          <Dropdown.Item
            activeClassName="text-steel-900 dark:text-white"
            onClick={logOut}
          >
            <RiLogoutBoxLine className="w-[18px] me-2 text-steel-400 h-auto" />
            <span className="truncate">Sign Out 🏃‍♂️</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Box>
  );
}
