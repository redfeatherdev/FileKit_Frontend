import { USER_PRICING } from '@/config/billing/plans';
import { Box } from '@/components/atoms/layout';
import { PricingCardHorizontal } from '@/components/molecules/pricing-card/horizontal';

export function UserPricing() {

  return (
    <Box className="text-center max-w-[1000px] mx-auto flex flex-col gap-8">
      {USER_PRICING.map((pricingPlan, index) => (
        <PricingCardHorizontal
          plan={pricingPlan}
          key={index}
        />
      ))}
    </Box>
  );
}
