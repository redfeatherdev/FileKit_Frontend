import { ActionIcon } from 'rizzui';
import { Link } from 'react-router-dom';

import { Box, Flex } from '@/components/atoms/layout';
import NavItems from '@/components/molecules/landing/nav-items';

type Props = {
  onClose: () => void;
};
export function MobileMenu({
  onClose,
}: Props) {
  return (
    <Flex
      direction="col"
      justify="start"
      align="start"
      className="h-full font-geist"
    >
      <Flex className="border-b bg-white px-4 py-3 sticky top-0">
        <Link
          aria-label="Filekit Logo"
          to="/"
          className="relative inline-flex max-h-full text-3xl font-semibold shrink-0 outline-none focus-visible:opacity-90"
        >
          <span className='dark:text-steel-100 text-[#141D25]'>
            FileKit
          </span>
        </Link >
        <ActionIcon onClick={onClose} variant="text" className="-mr-2">
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
          >
            <path d="m25 512a25 25 0 0 1 -17.68-42.68l462-462a25 25 0 0 1 35.36 35.36l-462 462a24.93 24.93 0 0 1 -17.68 7.32z" />
            <path d="m487 512a24.93 24.93 0 0 1 -17.68-7.32l-462-462a25 25 0 0 1 35.36-35.36l462 462a25 25 0 0 1 -17.68 42.68z" />
          </svg>
        </ActionIcon>
      </Flex>
      <Box className="grow px-4 w-full">
        <NavItems
          onClose={onClose}
          className="[&_ul]:flex-col [&_ul]:gap-5 [&_ul]:w-full [&_ul]:items-start w-full"
          linkClassName="text-base text-[#141D25] text-left"
        />
      </Box>
      <Box className="py-5 px-4 w-full sticky bottom-0 bg-white space-y-3">
      </Box>
    </Flex>
  );
}
