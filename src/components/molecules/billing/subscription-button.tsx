import { ArrowRight } from 'lucide-react';
import { Button } from 'rizzui';

import { cn } from '@/lib/utils/cn';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const SubscriptionButton = ({
  className,
  planId,
}: {
  className?: string;
  planId: string;
  teamId?: string | null;
}) => {
  const is3xl = useMediaQuery('(min-width:1780px)');

  return (
    <Button
      className={cn('px-10 group', className)}
      disabled={!planId}
      variant="outline"
      size={is3xl ? 'lg' : 'md'}
    >
      Select Plan
      <ArrowRight
        size={17}
        className="ml-2 transition-all duration-300 group-hover:translate-x-1 group-disabled:translate-x-0"
      />
    </Button>
  );
};
