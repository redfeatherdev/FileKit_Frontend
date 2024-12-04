import { Tooltip } from 'rizzui';

import { cn } from '@/lib/utils/cn';
import { Menu, AdminSidebarMenus, SidebarMenus } from '@/config/menus';
import { useResizableLayout } from '@/components/atoms/resizable-layout/resizable-layout.utils';
import { SidebarLink } from '@/components/atoms/sidebar-link';
import { useAuthStore } from '@/lib/store/main.store';

export function SidebarMenu({
  defaultCollapsed = false,
}: {
  defaultCollapsed?: boolean;
}) {
  const { user } = useAuthStore() as { user: any }
  const { isCollapsed } = useResizableLayout(defaultCollapsed);

  const IS_COLLAPSED = isCollapsed ?? defaultCollapsed;

  return (
    <ul
      className={cn('duration-300 space-y-2', IS_COLLAPSED ? 'px-3' : 'px-5')}
    >
      {user?.role === 'admin' ? (
        <>
          {
            AdminSidebarMenus.map((menu: Menu) => {
              return (
                <Tooltip
                  key={menu.href}
                  placement="right"
                  content={menu?.name}
                  className={cn(!IS_COLLAPSED && 'opacity-0')}
                >
                  <li>
                    <SidebarLink
                      className={cn(
                        'whitespace-nowrap',
                        IS_COLLAPSED && 'px-1 gap-0 justify-center'
                      )}
                      to={menu.href}
                      {...menu}
                    >
                      {menu.icon && (
                        <menu.icon className="flex-shrink-0 w-5 h-auto text-custom-gray/90" />
                      )}
                      {!IS_COLLAPSED && menu?.name}
                    </SidebarLink>
                  </li>
                </Tooltip>
              );
            })}
        </>
      ) : (<>
        {SidebarMenus.map((menu: Menu) => {
          return (
            <Tooltip
              key={menu.href}
              placement="right"
              content={menu?.name}
              className={cn(!IS_COLLAPSED && 'opacity-0')}
            >
              <li>
                <SidebarLink
                  className={cn(
                    'whitespace-nowrap',
                    IS_COLLAPSED && 'px-1 gap-0 justify-center'
                  )}
                  to={menu.href}
                  {...menu}
                >
                  {menu.icon && (
                    <menu.icon className="flex-shrink-0 w-5 h-auto text-custom-gray/90" />
                  )}
                  {!IS_COLLAPSED && menu?.name}
                </SidebarLink>
              </li>
            </Tooltip>
          );
        })}
      </>)}
    </ul>
  );
}
