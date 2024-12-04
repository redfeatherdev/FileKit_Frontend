import { DashboardIcon } from '@/components/atoms/icons/dashboard/dashboard';
import { FaUser } from "react-icons/fa6";
import { FilesIcon } from '@/components/atoms/icons/dashboard/files';

export type Menu = {
  name: string;
  href: any;
  icon?: any;
};

export const AdminSidebarMenus: Menu[] = [
  {
    name: 'User Management',
    href: '/admin/users',
    icon: FaUser,
  },
  {
    name: 'Scanned File History',
    href: '/admin/files',
    icon: FilesIcon,
  },
];

export const SidebarMenus: Menu[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: DashboardIcon,
  },
  // {
  //   name: 'File Scan',
  //   href: '/scan',
  //   icon: FilesIcon,
  // }
];

export const UserSettingsPageMenus: Menu[] = [
  {
    name: 'Profile',
    href: '/settings/profile',
  },
  // {
  //   name: 'Teams',
  //   href: '/settings/teams',
  // },
  {
    name: 'Billing',
    href: '/settings/billing',
  }
];