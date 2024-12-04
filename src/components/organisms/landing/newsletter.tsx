import { forwardRef, useState } from 'react';
import { Text, Title } from 'rizzui';

import { cn } from '@/lib/utils/cn';
import Facebook from '@/components/atoms/icons/socials/facebook';
import Linkedin from '@/components/atoms/icons/socials/linkedin';
import Twitter from '@/components/atoms/icons/socials/twitter';
import { Box, Container, Flex, Section } from '@/components/atoms/layout';

function Newsletter() {
  const [email, setEmail] = useState('');

  return (
    <Section
      id="newsletter"
      className="pt-12 lg:pb-2 lg:pt-16 xl:pt-24 xl:pb-12 3xl:pt-28 font-geist"
    >
      <Container className="max-w-[120rem] md:px-8 3xl:px-40 px-4">
        <Flex align="stretch" direction="col" className="gap-12 md:flex-row">
          <Box>
            <Title
              as="h2"
              className="mb-2 lg:mb-4 lg:text-[32px] lg:leading-[1.4] text-center mx-auto lg:mx-[unset] lg:text-left text-xl md:text-2xl max-w-[20ch] md:text-left leading-[1.4] font-bold text-[#F8FAFC] "
            >
              Subscribe to our newsletter to get our updates
            </Title>
            <Text
              as="p"
              className="mb-4 md:mb-8 text-sm lg:mx-[unset] lg:text-left md:text-left lg:text-lg md:text-base text-[#CBD5E1] max-w-[40ch] text-center mx-auto"
            >
              We have more than thousand of creative entrepreneurs and stat
              joining our business
            </Text>
            <Socials />
          </Box>
          <Box className="md:min-w-[380px] xl:min-w-[480px]">
            <form
              className="grid grid-cols-3 md:grid-cols-3 gap-2"
            >
              <input
                autoComplete="off"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email address"
                className="[--text-color:white] rounded lg:rounded-lg bg-[#CBD5E1]/[.15] placeholder:text-white/70 duration-200 outline-none ring-1 !ring-[#CBD5E1]/[.15] focus:!ring-white/40 [@media(min-width:500px)]:col-span-2 focus:!border-white/50 text-white px-6 py-3 col-span-full text-sm md:text-base"
              />
              <button className="rounded lg:rounded-lg duration-200 hover:bg-white/80 bg-white px-6 py-3  text-custom-black font-medium col-span-full [@media(min-width:500px)]:col-span-1 text-sm md:text-base">
                Notify Me
              </button>
            </form>
          </Box>
        </Flex>
      </Container>
    </Section>
  );
}

export default forwardRef(Newsletter);

export function Socials({ className }: { className?: string }) {
  return (
    <Flex
      justify="center"
      align="center"
      className={cn('md:justify-start gap-4', className)}
    >
      <a
        aria-label="Facebook Link"
        href=""
        rel="noreferrer"
      >
        <Facebook className="w-6 h-auto text-white duration-200 hover:text-white/80" />
      </a>
      <a
        aria-label="Twitter Link"
        href=""
        rel="noopener noreferrer"
      >
        <Twitter className="w-5 h-auto text-white duration-200 hover:text-white/80" />
      </a>
      <a
        aria-label="Linkedin Link"
        href=""
        rel="noreferrer"
      >
        <Linkedin className="w-[25px] -mt-px h-auto text-white duration-200 hover:text-white/80" />
      </a>
    </Flex>
  );
}
