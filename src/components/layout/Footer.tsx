"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full border-t border-border bg-muted/50 py-12 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col text-center md:text-left">
          <span className="font-bold text-lg text-foreground">
            RTI<span className="text-primary">assist</span>
          </span>
          <p className="text-muted-foreground text-sm mt-1 max-w-sm">
            {t('footer.tagline')}
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/authorities" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
              {t('nav.authorities')}
            </Link>
          </div>
        </div>
        <div className="text-muted-foreground text-sm font-medium">
          &copy; {new Date().getFullYear()} RTIassist. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
