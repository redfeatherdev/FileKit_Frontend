import React from "react";
import { ThemeProvider } from "@/components/molecules/theme-provider";
import { RightDrawer } from "./right-drawer";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light">
      {children}
      <RightDrawer />
    </ThemeProvider>
  );
}
