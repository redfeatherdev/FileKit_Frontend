import React, { ReactNode } from 'react';
import { Text } from 'rizzui';

import Header from "@/components/organisms/landing/header";
import { Box } from '@/components/atoms/layout';
import { TBBgPattern } from '@/components/atoms/vectors/tb-bg-pattern';
import { TruebeepNewsletter } from '@/components/organisms/landing/truebeep-newsletter';
import Footer from '@/components/organisms/landing/footer';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <main className="flex flex-col h-[100dvh]">
        <Header />
        <Box className="grow">{children}</Box>
        <Box className="relative">
          <Text
            as="span"
            className="absolute inset-0 top-0 left-0 inline-block z-[1] h-full w-full [background:_radial-gradient(44.93%_44.91%_at_51.9%_17.51%,_rgba(64,_193,_123,_0.18)_0%,_rgba(255,_255,_255,_0.00)_100%),_#010609;]"
          />
          <TBBgPattern className="absolute -translate-x-1/2 pointer-events-none -translate-y-1/2 top-1/2 left-1/2 w-1/2 h-auto z-[2]" />
          <Box className="relative z-20 overflow-x-hidden">
            <TruebeepNewsletter />
            <Footer variant="landing" />
          </Box>
        </Box>
      </main>
    </>
  )
}

export default DefaultLayout;