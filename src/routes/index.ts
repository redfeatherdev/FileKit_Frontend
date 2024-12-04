import Pricing from "@/pages/pricing"
import ContactUsView from "@/pages/contact-us";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";

import Dashboard from "@/pages/dashboard";
// import UserProfileSettings from "@/pages/user-profile-settings";
// import UserBillingSettings from "@/pages/user-billing-settings";

import UserManagement from "@/pages/dashboard/admin/user-management";
import TemplateMangement from '@/pages/dashboard/admin/template-management';
import ScannedFileHistory from "@/pages/dashboard/admin/scanned-file-history";

const coreRoutes = [
  {
    path: '/pricing',
    component: Pricing
  },
  {
    path: '/contact-us',
    component: ContactUsView
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: '/terms',
    component: TermsConditions
  }
]

const dashboardRoutes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/admin/users',
    component: UserManagement
  },
  {
    path: '/admin/files',
    component: ScannedFileHistory
  },
  {
    path: '/admin/templates',
    component: TemplateMangement
  },
  // {
  //   path: '/settings/profile',
  //   component: UserProfileSettings
  // },
  // {
  //   path: '/settings/billing',
  //   component: UserBillingSettings
  // }
]

const landingRoutes = [...coreRoutes];
const dashRoutes = [...dashboardRoutes]
export { landingRoutes, dashRoutes };