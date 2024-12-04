import Cookies from 'js-cookie';

import { Box, Flex } from '@/components/atoms/layout';
import { ResizablePanel } from '@/components/atoms/resizable-layout/resizable-layout';
import { Providers } from "@/components/organisms/provider";
import { Sidebar } from "@/components/organisms/sidebar";
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/landing/footer';

export default function DashboardLayout({ children }: {
  children: React.ReactNode
}) {

  const defaultSizeCookies = Cookies.get('layout-resizable-panels:default-size');
  const defaultCollapsedCookies = Cookies.get('layout-resizable-panels:default-collapsed');

  const defaultSize = defaultSizeCookies
    ? JSON.parse(defaultSizeCookies)
    : undefined;
  const defaultCollapsed = defaultCollapsedCookies
    ? JSON.parse(defaultCollapsedCookies)
    : undefined;

  return (
    <Providers>
      <main className="grid flex-grow grid-cols-1">
        <ResizablePanel
          defaultSize={defaultSize}
          defaultCollapsed={defaultCollapsed}
          sidebar={
            <Sidebar
              defaultCollapsed={defaultCollapsed}
              className="w-full h-full shrink-[unset] relative"
            />
          }
          childrenWrapperClassName="!min-h-screen"
        >
          <div className="flex flex-col h-full bg-background relative">
            <Flex
              direction="col"
              justify="start"
              className="p-5 pt-0 3xl:p-10 3xl:pt-0 grow"
            >
              <Header />
              <Box className="relative mt-4 w-full">{children}</Box>
            </Flex>
            <Footer variant="dashboard" />
          </div>
        </ResizablePanel>
      </main>
    </Providers>
  )
}