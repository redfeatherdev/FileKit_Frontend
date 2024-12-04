import LineNavigationMenu from '@/components/organisms/line-navigation-menu';
import { UserSettingsPageMenus } from '@/config/menus';
import { UpdateProfileForm } from '@/components/organisms/update-profile-form';

const UserProfileSettings = () => {
  return (
    <>
      <LineNavigationMenu menus={UserSettingsPageMenus} />
      <UpdateProfileForm />
    </>
  )
}

export default UserProfileSettings;