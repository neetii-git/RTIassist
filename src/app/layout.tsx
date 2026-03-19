import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTIAssist | AI-Powered RTI Generator",
  description: "AI that identifies the correct government authority and generates legally compliant RTI applications.",
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-primary/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <LanguageProvider>
              <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <Navbar />
                <main>{children}</main>
                <Footer />
              </div>
            </LanguageProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
