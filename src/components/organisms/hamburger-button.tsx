import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { ActionIcon, Drawer } from 'rizzui';

import { useDrawerState } from '@/lib/store/drawer.store';
import { cn } from '@/lib/utils/cn';

export function HamburgerButton({
  children,
  className,
}: React.PropsWithChildren<{ className?: string; drawerCloseDeps?: any[] }>) {
  const pathname = useLocation().pathname;
  const { open, openDrawer, closeDrawer } = useDrawerState();
  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  return (
    <>
      <ActionIcon
        variant="text"
        onClick={() => openDrawer()}
        className={cn('-ms-2 p-0.5', className)}
      >
        <RiMenu2Line size={21} />
      </ActionIcon>
      <Drawer
        isOpen={open}
        placement="left"
        customSize={300}
        onClose={() => closeDrawer()}
        containerClassName="min-w-[300px]"
      >
        {children}
      </Drawer>
    </>
  );
}
