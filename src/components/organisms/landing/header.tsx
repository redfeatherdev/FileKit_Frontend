import { useState } from 'react';
import { ActionIcon, Drawer } from 'rizzui';
import { RiMenuLine } from 'react-icons/ri';

import { cn } from '@/lib/utils/cn';
import { useWindowScroll } from "@/hooks/useWindowScroll";
import { Box } from '@/components/atoms/layout';
import { Container, Flex } from '@/components/atoms/layout';
import Logo from '@/components/molecules/landing/logo';
import NavItems from '@/components/molecules/landing/nav-items';
import { AuthButton } from '@/components/molecules/landing/auth-button';
import { MobileMenu } from '@/components/molecules/landing/mobile-menu';

const Header = () => {
  const [drawerState, setDrawerState] = useState(false);
  const windowScroll = useWindowScroll();
  const isScrolled = windowScroll > 10;

  return (
    <>
      <header
        className={cn(
          'py-3 transition-all w-full transform translate-x-0 translate-z-0 fixed  inset-x-0 top-0 z-[998] translate-y-0 font-geist pt-5',
          isScrolled &&
          'py-3 pt-3 backdrop-blur-none bg-white shadow-md shadow-[#141D25]/[.05]'
        )}
      >
        <Container className='max-w-[120rem] px-4 md:px-8 3xl:px-40'>
          <Flex className="relative 3xl:py-2">
            <Logo />
            <NavItems
              className="gap-8 hidden lg:flex"
              linkClassName={cn(
                isScrolled
                  ? 'text-black [&.active]:text-black'
                  : 'text-white [&.active]:text-white'
              )}
            />
            <ActionIcon
              aria-label="Hamburger Menu Button"
              className="lg:hidden translate-x-1.5 md:translate-x-2"
              variant="text"
              onClick={() => setDrawerState(true)}
            >
              <RiMenuLine
                className={cn(
                  'lg:hidden w-7 h-7 text-white',
                  isScrolled && 'text-[#141D25]'
                )}
              />
            </ActionIcon>
            <Box className="gap-7 hidden lg:flex items-center">
              <AuthButton
                className={cn(
                  isScrolled && 'text-[#141D25] hover:text-[#141D25]/80'
                )}
              />
            </Box>
          </Flex>
        </Container>
      </header>
      <Drawer
        placement="left"
        isOpen={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <MobileMenu onClose={() => setDrawerState(false)} />
      </Drawer>
    </>
  )
}

export default Header;