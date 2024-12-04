import LineNavigationMenu from '@/components/organisms/line-navigation-menu';
import { UsersBillingSettings } from '@/components/organisms/users-billing-settings';
import { UserSettingsPageMenus } from '@/config/menus';

const UserBillingSettings = () => {
  return (
    <>
      <LineNavigationMenu menus={UserSettingsPageMenus} />
      <UsersBillingSettings />
    </>
  )
}

export default UserBillingSettings;