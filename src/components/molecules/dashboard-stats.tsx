import { Grid } from '@/components/atoms/layout';
import SimpleBar from '@/components/atoms/simplebar';
import { StatsCard } from '@/components/molecules/stats-card';

import { Stats } from './stats-card';

export default function DashboardStats() {
  const stats: Stats[] = [
    {
      type: 'image',
      count: 0
    },
    {
      type: 'video',
      count: 0
    },
    {
      type: 'audio',
      count: 0
    },
    {
      type: 'document',
      count: 2
    },
  ]

  return (
    <SimpleBar>
      <Grid columns="4" className="gap-5 xl:gap-7 min-w-[1100px] 3xl:gap-8">
        {stats?.map((item: Stats) => (
          <StatsCard
            key={item.type}
            cardData={item}
            totalCount={2}
          />
        ))}
      </Grid>
    </SimpleBar>
  )
}