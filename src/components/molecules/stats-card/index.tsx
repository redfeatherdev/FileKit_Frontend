import { Progressbar, Text } from 'rizzui';

import { Card } from '@/components/atoms/card';
import { Box, Flex } from '@/components/atoms/layout';

import { calculatePercentage } from '@/lib/utils/formatFileSize';

import { DocumentIcon } from './icons/document';
import { ImageIcon } from './icons/image';
import { MusicIcon } from './icons/music';
import { VideoIcon } from './icons/video';

const ICONS = {
  image: ImageIcon,
  video: VideoIcon,
  audio: MusicIcon,
  document: DocumentIcon,
};

type IconType = keyof typeof ICONS;

export type Stats = {
  type: string;
  count: number;
}

type Props = {
  cardData: Stats;
  totalCount: number;
}

export function StatsCard(props: Props) {
  const { cardData, totalCount } = props;
  const Icon = ICONS[cardData.type as IconType];

  return (
    <Card className="flex min-w-[200px] items-center p-4 lg:p-5 xl:p-6 3xl:p-7 rounded-xl bg-transparent dark:bg-transparent">
      <Box className="w-full">
        <Icon className="w-10 lg:w-12 3xl:w-[52px] h-auto mb-5 3xl:mb-7" />
        <Text className="font-semibold text-sm lg:text-base 3xl:text-lg capitalize text-custom-black dark:text-gray-400 mb-4 3xl:mb-5">
          {cardData.type}
        </Text>
        <Flex direction="col" className="gap-4" align="start">
          <Progressbar
            aria-label={`${cardData.type} usage progress`}
            className="h-1.5"
            barClassName="rounded-full"
            value={calculatePercentage(cardData.count, totalCount)}
          />
          <Text className="text-sm lg:text-base">
            <Text
              as="span"
              className="text-custom-black dark:text-gray-400 font-medium"
            >
              {cardData.count} items
            </Text>{' '}
            <Text as="span" className="text-[#475569]">
              of {totalCount}
            </Text>
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}