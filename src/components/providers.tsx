"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { AnimatePresence } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
