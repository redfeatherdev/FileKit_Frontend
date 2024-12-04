import { Box, Flex } from '@/components/atoms/layout';
import { PageHeader } from '@/components/atoms/page-header';

// import { BillingStatus } from '../molecules/billing/billing-status';
import { ManageBilling } from '../molecules/billing/manage-billing';
import { UserPricing } from '../organisms/user-pricing';

export const UsersBillingSettings = () => {
  return (
    <Box>
      <PageHeader
        title="Pricing Plan"
        description="Manage your plan"
        titleClassName="text-lg xl:text-xl"
        childrenClassName="flex [@media(min-width:375px)]:inline-flex"
        className="items-center"
        headingWrapperClassName="[@media(min-width:375px)]:w-auto"
      >
        <Flex justify="end" className="w-full">
          <ManageBilling />
        </Flex>
      </PageHeader>
      <UserPricing />

      {/* {searchParams?.success || searchParams?.cancel ? (
        <BillingStatus searchParams={searchParams} />
      ) : (
      )} */}
    </Box>
  );
};
